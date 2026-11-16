import { Check } from "lucide-react";

const STEPS = ["Selection", "Details & Payment", "Confirmation"];

/**
 * 1 = Selection done, current = Details & Payment (checkout page)
 * all done when `current === 3` (confirmation page)
 */
export default function CheckoutStepper({ current }: { current: 2 | 3 }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-3 gap-y-2" aria-label="Checkout progress">
      {STEPS.map((label, index) => {
        const step = index + 1;
        const done = step < current || current === 3;
        const active = step === current && current !== 3;

        return (
          <li key={label} className="flex items-center gap-3">
            {index > 0 && (
              <span
                aria-hidden
                className={`hidden h-px w-8 sm:block ${done ? "bg-green-200" : "bg-border"}`}
              />
            )}

            <span className="flex items-center gap-2">
              <span
                className={`grid size-7 place-items-center rounded-full text-xs font-bold ${
                  done
                    ? "bg-green-500 text-white"
                    : active
                      ? "bg-blue-500 text-white"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {done ? <Check className="size-4" /> : step}
              </span>
              <span
                className={`text-sm ${
                  done
                    ? "font-semibold text-foreground"
                    : active
                      ? "font-semibold text-blue-500"
                      : "font-medium text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
