import PriceCard from "@/components/Price/PriceCard";

const plans = [
  {
    name: "Starter",
    description: "For new creators who want fast generation and clean exports.",
    price: 0,
    period: "month",
    ctaLabel: "Start Free",

    features: [
      "20 AI image generations per month",
      "Standard quality export",
      "Community support",
      "Access to basic templates",
    ],
  },
  {
    name: "Pro",
    description:
      "Best for freelancers and growing teams shipping daily visuals.",
    price: 19,
    period: "month",
    ctaLabel: "Upgrade to Pro",

    badge: "Most Popular",
    isFeatured: true,
    features: [
      "Unlimited AI image generations",
      "HD export with transparent background",
      "Private prompt history",
      "Priority generation queue",
      "Commercial license",
    ],
  },
  {
    name: "Studio",
    description:
      "Advanced controls and collaboration for production workflows.",
    price: 49,
    period: "month",
    ctaLabel: "Choose Studio",

    badge: "Team",
    features: [
      "Everything in Pro",
      "Team workspaces and shared assets",
      "Brand kit and style locking",
      "API access",
      "Dedicated support",
    ],
  },
];

const PricePage = () => {
  return (
    <section className="relative overflow-hidden bg-slate-50 px-4 py-14 md:px-8 md:py-20">
      <div className="pointer-events-none absolute -top-36 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-200/45 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex rounded-full border border-cyan-200 bg-white/80 px-4 py-1 text-xs font-semibold tracking-wide text-cyan-700 uppercase">
            Pricing That Scales
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
            Choose a plan that grows with your creative speed
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
            Pixel-perfect outputs, faster generation, and pro-level controls.
            Start free, upgrade when your workflow needs more power.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <PriceCard key={plan.name} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricePage;
