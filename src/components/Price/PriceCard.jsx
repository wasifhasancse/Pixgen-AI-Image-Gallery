import { Button } from "@heroui/react";
import Link from "next/link";
import { HiCheckCircle } from "react-icons/hi2";

const PriceCard = ({
  name,
  description,
  price,
  period,
  ctaLabel,
  features = [],
  badge,
  isFeatured = false,
}) => {
  return (
    <article
      className={`group relative overflow-hidden rounded-3xl border p-6 transition duration-300 hover:-translate-y-1 md:p-7 ${
        isFeatured
          ? "border-cyan-300 bg-linear-to-b from-cyan-50 via-white to-sky-50 shadow-[0_24px_70px_-35px_rgba(14,116,144,0.55)]"
          : "border-slate-200 bg-white shadow-[0_20px_55px_-40px_rgba(15,23,42,0.45)]"
      }`}
    >
      <div className="pointer-events-none absolute -right-14 -top-16 h-40 w-40 rounded-full bg-cyan-200/40 blur-3xl" />

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-slate-900">{name}</h3>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              {description}
            </p>
          </div>
          {badge ? (
            <span className="rounded-full border border-cyan-200 bg-white/80 px-3 py-1 text-xs font-semibold tracking-wide text-cyan-700 uppercase">
              {badge}
            </span>
          ) : null}
        </div>

        <div className="mt-6 flex items-end gap-2">
          <span className="text-4xl font-black text-slate-900 md:text-5xl">
            ${price}
          </span>
          <span className="pb-1 text-sm font-medium text-slate-500">
            /{period}
          </span>
        </div>

        <form action={'/api/payment'} method="POST">
          <Button
            type="submit"
          className={`mt-6 inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition ${
            isFeatured
              ? "bg-slate-900 text-white hover:bg-slate-800"
              : "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
          }`}
        >
          {ctaLabel}
        </Button>
        </form>

        <ul className="mt-6 space-y-3">
          {features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2.5 text-sm text-slate-700"
            >
              <HiCheckCircle className="mt-0.5 shrink-0 text-lg text-cyan-600" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default PriceCard;
