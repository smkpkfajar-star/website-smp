import { ReactNode } from "react";
import Link from "next/link";
import { site } from "@/data/site";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  return (
    <div
      className={`mb-10 ${
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"
      }`}
    >
      {eyebrow && (
        <p
          className={`mb-2 text-sm font-semibold uppercase tracking-widest ${
            light ? "text-accent-300" : "text-accent-600"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display text-3xl font-bold text-balance sm:text-4xl ${
          light ? "text-white" : "text-primary-900"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 text-base leading-relaxed ${
            light ? "text-primary-100" : "text-ink-soft"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function CtaButton({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "accent" | "white";
  className?: string;
}) {
  const styles = {
    primary:
      "bg-primary-700 text-white hover:bg-primary-800 shadow-sm",
    accent:
      "bg-accent-500 text-primary-950 hover:bg-accent-400 shadow-sm",
    outline:
      "border border-primary-700 text-primary-700 hover:bg-primary-700 hover:text-white",
    white:
      "bg-white text-primary-800 hover:bg-earth-100 shadow-sm",
  }[variant];
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all ${styles} ${className}`}
    >
      {children}
    </Link>
  );
}

export function PageHero({
  title,
  subtitle,
  breadcrumb,
}: {
  title: string;
  subtitle?: string;
  breadcrumb?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-primary-900">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, #d6941d 0, transparent 40%), radial-gradient(circle at 80% 70%, #2d754b 0, transparent 45%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center gap-2 text-sm text-primary-200">
            <li>
              <Link href="/" className="hover:text-accent-300">
                Beranda
              </Link>
            </li>
            <li aria-hidden>›</li>
            <li className="text-accent-300">{breadcrumb}</li>
          </ol>
        </nav>
        <h1 className="font-display text-3xl font-bold text-white text-balance sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 max-w-2xl text-base text-primary-100 sm:text-lg">
            {subtitle}
          </p>
        )}
        <div className="mt-6 flex h-1 w-20 rounded-full bg-accent-500" />
      </div>
    </section>
  );
}

// Social proof strip with contact info reused on inner pages
export function ContactStrip() {
  return (
    <section className="border-t border-earth-100 bg-earth-50">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-8 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold text-accent-600">
            Informasi &amp; Pendaftaran
          </p>
          <h3 className="font-display text-xl font-bold text-primary-900">
            {site.name}
          </h3>
          <p className="mt-1 flex items-center gap-2 text-sm text-ink-soft">
            <span aria-hidden>📍</span> {site.address}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={`tel:${site.phoneTel}`}
            className="inline-flex items-center gap-2 rounded-full bg-primary-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-800"
          >
            <span aria-hidden>☎</span> {site.phone}
          </a>
          <a
            href={`https://wa.me/${site.whatsapp.replace("+", "")}`}
            className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-5 py-3 text-sm font-semibold text-primary-950 transition-colors hover:bg-accent-400"
          >
            <span aria-hidden>WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
