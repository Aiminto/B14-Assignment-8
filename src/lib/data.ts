export type Category = {
  slug: string;
  name: string;
  subtitle: string;
  eventsCount: number;
  image: string;
  alt: string;
};

export type EventItem = {
  slug: string;
  title: string;
  category: string;
  image: string;
  alt: string;
  date: string;
  location: string;
  participants: string;
  /** raw price in rupiah */
  price: number;
};

export const categories: Category[] = [
  {
    slug: "music",
    name: "Music",
    subtitle: "Concerts & Festival",
    eventsCount: 42,
    image: "/categories/music.jpg",
    alt: "Crowd with colorful stage lights at an outdoor music festival",
  },
  {
    slug: "technology",
    name: "Technology",
    subtitle: "Summits",
    eventsCount: 36,
    image: "/categories/technology.jpg",
    alt: "Team working on laptops around a shared desk",
  },
  {
    slug: "business",
    name: "Business",
    subtitle: "Networking",
    eventsCount: 28,
    image: "/categories/business.jpg",
    alt: "Professionals in a meeting around a wooden table",
  },
  {
    slug: "art-design",
    name: "Art & Design",
    subtitle: "Galleries & Shows",
    eventsCount: 24,
    image: "/categories/art-design.jpg",
    alt: "Colorful floral painting in a classical style",
  },
  {
    slug: "health",
    name: "Health",
    subtitle: "Wellness & Yoga",
    eventsCount: 19,
    image: "/categories/health.jpg",
    alt: "Person holding a yoga pose at sunset",
  },
  {
    slug: "food-drink",
    name: "Food & Drink",
    subtitle: "Tastings & Fairs",
    eventsCount: 23,
    image: "/categories/food-drink.jpg",
    alt: "Friends toasting with glasses of wine",
  },
  {
    slug: "sports",
    name: "Sports",
    subtitle: "Marathons & Games",
    eventsCount: 17,
    image: "/categories/sports.jpg",
    alt: "Sprinter set on a running track",
  },
  {
    slug: "film-media",
    name: "Film & Media",
    subtitle: "Premieres & Screenings",
    eventsCount: 12,
    image: "/categories/film-media.jpg",
    alt: "Camera operator filming with a professional rig",
  },
];

export const featuredEvents: EventItem[] = [
  {
    slug: "tech-innovation-summit-2026",
    title: "Tech Innovation Summit 2026",
    category: "Technology",
    image: "/events/tech-summit.jpg",
    alt: "Audience seated in a dark auditorium during a tech talk",
    date: "Sat, Feb 12 • 9.00 AM",
    location: "Bandung, Indonesia",
    participants: "1.2k Registered",
    price: 350000,
  },
  {
    slug: "global-food-wine-festival",
    title: "Global Food & Wine Festival",
    category: "Music",
    image: "/events/food-wine-festival.jpg",
    alt: "Evening crowd under warm string lights at an outdoor festival",
    date: "Sat, Feb 13 • 12.00 PM",
    location: "Bali, Indonesia",
    participants: "850 Registered",
    price: 300000,
  },
  {
    slug: "future-of-work-leadership-forum",
    title: "Future of Work Leadership Forum",
    category: "Business",
    image: "/events/leadership-forum.jpg",
    alt: "Delegates listening to a speaker in a large blue-lit auditorium",
    date: "Mon, Feb 14 • 10.00 AM",
    location: "Jakarta, Indonesia",
    participants: "640 Registered",
    price: 550000,
  },
  {
    slug: "global-ai-big-data-expo-2026",
    title: "Global AI & Big Data Expo 2026",
    category: "Technology",
    image: "/events/ai-expo.jpg",
    alt: "Busy expo hall filled with visitors and exhibition booths",
    date: "Sat, Feb 12 • 9.00 AM",
    location: "BSD City, Tangerang",
    participants: "500 Registered",
    price: 500000,
  },
  {
    slug: "neon-nights-music-festival",
    title: "Neon Nights Music Festival",
    category: "Music",
    image: "/events/music-festival.jpg",
    alt: "Concert crowd with hands raised in front of a bright stage",
    date: "Sat, Feb 21 • 6.00 PM",
    location: "Yogyakarta, Indonesia",
    participants: "2.3k Registered",
    price: 275000,
  },
  {
    slug: "creative-design-workshop",
    title: "Creative Design Sprint Workshop",
    category: "Art & Design",
    image: "/events/design-workshop.jpg",
    alt: "Team collaborating with colorful sticky notes on a glass wall",
    date: "Sun, Feb 22 • 1.00 PM",
    location: "Surabaya, Indonesia",
    participants: "180 Registered",
    price: 200000,
  },
  {
    slug: "startup-founders-meetup",
    title: "Startup Founders Meetup",
    category: "Business",
    image: "/events/startup-meetup.jpg",
    alt: "Three founders smiling while working on a laptop together",
    date: "Thu, Feb 26 • 5.00 PM",
    location: "Jakarta, Indonesia",
    participants: "400 Registered",
    price: 150000,
  },
  {
    slug: "full-stack-developer-bootcamp-2026",
    title: "Full Stack Developer Bootcamp 2026",
    category: "Technology",
    image: "/events/coding-bootcamp.jpg",
    alt: "Source code displayed on a laptop screen",
    date: "Wed, Feb 16 • 1.00 PM",
    location: "Surabaya, Indonesia",
    participants: "200 Registered",
    price: 300000,
  },
];

export const upcomingEvents: EventItem[] = [
  {
    slug: "indie-rock-night-at-the-van-buren",
    title: "Indie Rock Night At The Van Buren",
    category: "Music",
    image: "/events/indie-rock.jpg",
    alt: "Band performing on stage in front of a cheering crowd",
    date: "Fri, Feb 18 • 7.00 PM",
    location: "Malang, East Java",
    participants: "500 Participating",
    price: 150000,
  },
  {
    slug: "creative-abstract-painting-workshop",
    title: "Creative Abstract Painting Workshop",
    category: "Art & Design",
    image: "/events/painting-workshop.jpg",
    alt: "Vibrant abstract painting in yellow, red and teal",
    date: "Sat, Feb 19 • 8.00 AM",
    location: "Surabaya, East Java",
    participants: "200 Participating",
    price: 350000,
  },
  {
    slug: "city-charity-marathon-2026",
    title: "City Charity Marathon 2026",
    category: "Sports",
    image: "/events/charity-marathon.jpg",
    alt: "Group of runners silhouetted against the morning sky",
    date: "Sun, Feb 20 • 7.30 AM",
    location: "Semarang, West Java",
    participants: "1.7k Participating",
    price: 250000,
  },
  {
    slug: "founders-funders-networking-night",
    title: "Founders & Funders Networking Night",
    category: "Business",
    image: "/events/startup-meetup.jpg",
    alt: "Three founders smiling while working on a laptop together",
    date: "Mon, Feb 22 • 6.00 PM",
    location: "Jakarta, Indonesia",
    participants: "350 Participating",
    price: 100000,
  },
];

/** 350000 -> "350.000" */
export function formatPrice(price: number): string {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function priceLabel(price: number): string {
  return `Rp ${formatPrice(price)}`;
}
