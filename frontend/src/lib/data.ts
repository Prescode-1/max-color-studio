import fullbody from "@/assets/service-fullbody.jpg";
import caliper from "@/assets/service-caliper.jpg";
import wheels from "@/assets/service-wheels.jpg";

export type Service = {
  slug: string;
  titleKey: string;
  descKey: string;
  image: string;
  priceFrom: number;
  duration: string;
  specs: { label: string; value: string }[];
};

export const services: Service[] = [
  {
    slug: "full-body",
    titleKey: "services.fullbody.title",
    descKey: "services.fullbody.desc",
    image: fullbody,
    priceFrom: 4800,
    duration: "10–14 days",
    specs: [
      { label: "Layers", value: "Primer + 3 base + 2 clear" },
      { label: "Cure", value: "Infrared 80°C" },
      { label: "Warranty", value: "5 years" },
      { label: "Color match", value: "Spectrophotometer ΔE < 0.5" },
    ],
  },
  {
    slug: "caliper",
    titleKey: "services.caliper.title",
    descKey: "services.caliper.desc",
    image: caliper,
    priceFrom: 480,
    duration: "2 days",
    specs: [
      { label: "Heat rating", value: "Up to 700°C" },
      { label: "Layers", value: "Primer + 2 base + ceramic" },
      { label: "Colors", value: "Any RAL or custom" },
      { label: "Warranty", value: "3 years" },
    ],
  },
  {
    slug: "wheels",
    titleKey: "services.wheels.title",
    descKey: "services.wheels.desc",
    image: wheels,
    priceFrom: 720,
    duration: "3–5 days",
    specs: [
      { label: "Process", value: "Powder coat or liquid" },
      { label: "Finish", value: "Matte, satin, gloss, chrome" },
      { label: "Sealant", value: "Brake-dust resistant" },
      { label: "Warranty", value: "3 years" },
    ],
  },
  {
    slug: "ceramic-coating",
    titleKey: "services.ceramic.title",
    descKey: "services.ceramic.desc",
    image: fullbody,
    priceFrom: 1200,
    duration: "2–3 days",
    specs: [
      { label: "Hardness", value: "9H Mohs scale" },
      { label: "Hydrophobic", value: "110° contact angle" },
      { label: "UV stability", value: "Up to 7 years" },
      { label: "Warranty", value: "7 years" },
    ],
  },
  {
    slug: "paint-correction",
    titleKey: "services.correction.title",
    descKey: "services.correction.desc",
    image: caliper,
    priceFrom: 850,
    duration: "2 days",
    specs: [
      { label: "Stages", value: "Up to 3-step compound" },
      { label: "Removes", value: "Swirls, holograms, RIDS" },
      { label: "Gloss meter", value: "Verified 90+ GU" },
      { label: "Finish", value: "Optional ceramic seal" },
    ],
  },
  {
    slug: "ppf",
    titleKey: "services.ppf.title",
    descKey: "services.ppf.desc",
    image: wheels,
    priceFrom: 2400,
    duration: "4–6 days",
    specs: [
      { label: "Film", value: "TPU self-healing 8 mil" },
      { label: "Coverage", value: "Partial / full body" },
      { label: "Edges", value: "Wrapped, no visible seams" },
      { label: "Warranty", value: "10 years" },
    ],
  },
  {
    slug: "interior-detail",
    titleKey: "services.interior.title",
    descKey: "services.interior.desc",
    image: fullbody,
    priceFrom: 320,
    duration: "1 day",
    specs: [
      { label: "Deep clean", value: "Steam + extraction" },
      { label: "Leather", value: "pH-neutral, conditioned" },
      { label: "Odor", value: "Ozone treatment included" },
      { label: "Trim", value: "UV-restored & sealed" },
    ],
  },
];

export const portfolio = [
  // Full Body — 6 works
  { id: 1,  title: "Stealth Black GT",       category: "Full Body", image: fullbody },
  { id: 2,  title: "Pearl White Coupe",      category: "Full Body", image: fullbody },
  { id: 7,  title: "Candy Apple Roadster",   category: "Full Body", image: fullbody },
  { id: 8,  title: "Liquid Silver SUV",      category: "Full Body", image: fullbody },
  { id: 9,  title: "Matte Olive Off-Roader", category: "Full Body", image: fullbody },

  // Caliper — 5 works
  { id: 3,  title: "Track Day Calipers",     category: "Caliper",   image: caliper },
  { id: 6,  title: "Yellow Brembo Set",      category: "Caliper",   image: caliper },
  { id: 10, title: "Crimson AP Racing",      category: "Caliper",   image: caliper },
  { id: 11, title: "Lime Big Brake Kit",     category: "Caliper",   image: caliper },
  { id: 12, title: "Carbon-Black Sport",     category: "Caliper",   image: caliper },

  // Wheels — 5 works
  { id: 4,  title: "Forged Wheel Set",       category: "Wheels",    image: wheels },
  { id: 5,  title: "Bronze Forged 21\"",     category: "Wheels",    image: wheels },
  { id: 13, title: "Satin Black HRE",        category: "Wheels",    image: wheels },
  { id: 14, title: "Gold Multi-Spoke",       category: "Wheels",    image: wheels },
  { id: 15, title: "Chrome Deep Dish",       category: "Wheels",    image: wheels },
];
