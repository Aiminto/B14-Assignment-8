/**
 * Deterministic pseudo-QR renderer used for the ticket preview.
 * Draws real finder patterns plus a hash-seeded module grid, so the same
 * order always renders the same code (no external QR dependency).
 */
export default function QrCode({
  value,
  size = 160,
  className = "",
}: {
  value: string;
  size?: number;
  className?: string;
}) {
  const modules = 25;
  const grid = buildGrid(value, modules);

  const rects: { x: number; y: number }[] = [];
  for (let y = 0; y < modules; y++) {
    for (let x = 0; x < modules; x++) {
      if (grid[y][x]) rects.push({ x, y });
    }
  }

  return (
    <svg
      role="img"
      aria-label="Ticket QR code"
      viewBox={`0 0 ${modules} ${modules}`}
      width={size}
      height={size}
      shapeRendering="crispEdges"
      className={`shrink-0 rounded-lg bg-white ${className}`}
    >
      <rect width={modules} height={modules} fill="#ffffff" />
      {rects.map((rect) => (
        <rect
          key={`${rect.x}-${rect.y}`}
          x={rect.x}
          y={rect.y}
          width={1}
          height={1}
          fill="#0f172a"
        />
      ))}
    </svg>
  );
}

function buildGrid(value: string, modules: number): boolean[][] {
  const grid: boolean[][] = Array.from({ length: modules }, () =>
    Array.from({ length: modules }, () => false)
  );

  const random = mulberry32(hashString(value));

  // Data area (leave room for the finder patterns + separators).
  for (let y = 0; y < modules; y++) {
    for (let x = 0; x < modules; x++) {
      if (inFinderZone(x, y, modules)) continue;
      grid[y][x] = random() > 0.52;
    }
  }

  // Finder patterns: 7x7 square with a hollow ring and a 3x3 core.
  const drawFinder = (originX: number, originY: number) => {
    for (let y = 0; y < 7; y++) {
      for (let x = 0; x < 7; x++) {
        const ring = x === 0 || x === 6 || y === 0 || y === 6;
        const core = x >= 2 && x <= 4 && y >= 2 && y <= 4;
        grid[originY + y][originX + x] = ring || core;
      }
    }
  };

  drawFinder(0, 0);
  drawFinder(modules - 7, 0);
  drawFinder(0, modules - 7);

  // Timing lines, like a real QR code.
  for (let i = 8; i < modules - 8; i++) {
    grid[6][i] = i % 2 === 0;
    grid[i][6] = i % 2 === 0;
  }

  return grid;
}

function inFinderZone(x: number, y: number, modules: number): boolean {
  const inTopLeft = x < 8 && y < 8;
  const inTopRight = x >= modules - 8 && y < 8;
  const inBottomLeft = x < 8 && y >= modules - 8;
  return inTopLeft || inTopRight || inBottomLeft;
}

function hashString(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
