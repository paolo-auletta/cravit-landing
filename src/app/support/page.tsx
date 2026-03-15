import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  LifeBuoy,
  MapPinned,
  MessageSquareHeart,
  ShieldCheck,
} from "lucide-react";

import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";

import { SiteShell } from "../components/site-shell";

const supportCards = [
  {
    title: "Beta Feedback & Bugs",
    description:
      "For the fastest response during beta, use the feedback board to report bugs, request features, and share product feedback.",
    href: "https://cravit.featurebase.app/",
    cta: "Open Feedback Board",
    external: true,
    icon: MessageSquareHeart,
  },
  {
    title: "Account & Privacy",
    description:
      "Need help with account deletion, profile changes, or how Cravit handles your data? Start with the privacy policy.",
    href: "/privacy",
    cta: "Read Privacy Policy",
    external: false,
    icon: ShieldCheck,
  },
  {
    title: "Nearby Search & Places",
    description:
      "Location access is optional. If nearby spot suggestions are not working, check your device permissions first.",
    href: "/privacy",
    cta: "See Permission Details",
    external: false,
    icon: MapPinned,
  },
];

const helpTopics = [
  {
    title: "Sign-In Issues",
    copy: "If Google Sign-In or email verification is not completing, update the app, retry on a stable connection, and confirm you are using the same email across attempts.",
  },
  {
    title: "Invites & Joining a Cravy",
    copy: "Invite links can expire. If a link no longer opens the target Cravy, ask the group owner to generate a new invite code.",
  },
  {
    title: "Photos & Uploads",
    copy: "If review or profile images do not upload, confirm photo-library access is enabled and try again on a reliable connection.",
  },
  {
    title: "Location-Based Search",
    copy: "Nearby suggestions require location permission. You can keep using Cravit without it, but local spot discovery may be limited.",
  },
];

const checklistItems = [
  "Your device model and iOS version.",
  "The Cravit app version you are using.",
  "What you expected to happen.",
  "What actually happened.",
  "Screenshots or screen recordings when available.",
];

export const metadata: Metadata = {
  title: "Support",
  description:
    "Get help with Cravit account access, invites, photo uploads, privacy, and nearby place search.",
  alternates: {
    canonical: "/support",
  },
  openGraph: {
    title: "Cravit Support",
    description:
      "Get help with Cravit account access, invites, photo uploads, privacy, and nearby place search.",
    url: "/support",
  },
  twitter: {
    title: "Cravit Support",
    description:
      "Get help with Cravit account access, invites, photo uploads, privacy, and nearby place search.",
  },
};

export default function SupportPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Support", url: "/support" },
        ]}
      />

      <SiteShell>
        <section className="relative overflow-hidden px-5 pb-12 pt-10 sm:px-10 lg:px-24">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[460px] bg-[radial-gradient(circle_at_top,rgba(255,185,126,0.46)_0%,rgba(255,250,245,0)_72%)]" />

          <div className="mx-auto max-w-5xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(18,17,17,0.08)] bg-white/88 px-3 py-1 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-[rgba(18,17,17,0.62)]">
              <LifeBuoy className="h-3.5 w-3.5" aria-hidden="true" />
              Support
            </div>

            <div className="mt-6 max-w-3xl">
              <h1 className="heading-1 text-balance">
                Support for Your Next Cravy
              </h1>
              <p className="body-xl mt-5 max-w-2xl text-pretty">
                Need help with sign-in, invites, reviews, photos, or nearby spot
                search? This page covers the fastest support paths and the most
                common issues beta testers hit.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button variant="hero" asChild>
                <a
                  href="https://cravit.featurebase.app/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                  Open Feedback Board
                </a>
              </Button>

              <Button variant="outline" asChild>
                <Link href="/privacy">Read Privacy Policy</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="px-5 pb-10 sm:px-10 lg:px-24">
          <div className="mx-auto grid max-w-5xl gap-5 lg:grid-cols-3">
            {supportCards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.title}
                  className="rounded-[28px] border border-[rgba(18,17,17,0.08)] bg-white p-6 shadow-[0_22px_70px_rgba(18,17,17,0.06)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(255,105,0,0.1)] text-[var(--color-accent)]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>

                  <h2 className="mt-5 text-[1.35rem] font-medium tracking-[-0.03em] text-[var(--color-dark-1)] text-balance">
                    {card.title}
                  </h2>
                  <p className="body-m mt-3 text-[rgba(18,17,17,0.72)]">
                    {card.description}
                  </p>

                  <div className="mt-6">
                    <Button variant="outline" asChild>
                      {card.external ? (
                        <a href={card.href} target="_blank" rel="noreferrer">
                          {card.cta}
                        </a>
                      ) : (
                        <Link href={card.href}>{card.cta}</Link>
                      )}
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="px-5 pb-10 sm:px-10 lg:px-24">
          <div className="mx-auto grid max-w-5xl gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
            <article className="rounded-[30px] border border-[rgba(18,17,17,0.08)] bg-white px-6 py-7 shadow-[0_22px_70px_rgba(18,17,17,0.06)] sm:px-8">
              <h2 className="heading-4 text-balance">Common Support Topics</h2>
              <div className="mt-6 grid gap-4">
                {helpTopics.map((topic) => (
                  <section
                    key={topic.title}
                    className="rounded-[22px] border border-[rgba(18,17,17,0.06)] bg-[rgba(255,250,245,0.86)] p-5"
                  >
                    <h3 className="text-lg font-medium tracking-[-0.02em] text-[var(--color-dark-1)]">
                      {topic.title}
                    </h3>
                    <p className="body-m mt-2 text-[rgba(18,17,17,0.72)]">
                      {topic.copy}
                    </p>
                  </section>
                ))}
              </div>
            </article>

            <aside className="rounded-[30px] border border-[rgba(18,17,17,0.08)] bg-[linear-gradient(180deg,rgba(255,248,242,1)_0%,rgba(255,255,255,1)_100%)] px-6 py-7 shadow-[0_22px_70px_rgba(18,17,17,0.06)] sm:px-8">
              <h2 className="heading-4 text-balance">
                What to Include in a Support Request
              </h2>
              <ul className="mt-5 space-y-3">
                {checklistItems.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--color-accent)]"
                    />
                    <p className="body-m text-[rgba(18,17,17,0.74)]">{item}</p>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-[22px] border border-[rgba(18,17,17,0.08)] bg-white p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[rgba(18,17,17,0.55)]">
                  Account Deletion
                </p>
                <p className="body-m mt-3 text-[rgba(18,17,17,0.74)]">
                  You can delete your account directly in the app from Account
                  &gt; Delete Account.
                </p>
              </div>
            </aside>
          </div>
        </section>
      </SiteShell>
    </>
  );
}
