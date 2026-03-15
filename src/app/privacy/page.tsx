import type { Metadata } from "next";
import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

import { SiteShell } from "../components/site-shell";

const sectionGroups = [
  {
    title: "1. Information We Collect",
    body: [
      "Cravit collects information you provide directly, information created through your activity in the app, and limited technical information needed to run the service.",
    ],
    bullets: [
      "Account & profile details such as your name, email address, authentication identifiers, and optional profile image.",
      "Cravy activity such as the groups you create or join, spots you add, invitations, ratings, notes, visit dates, and leaderboard activity.",
      "Optional uploaded content such as review photos and profile photos.",
      "Location data, only when you grant permission, to help find nearby spots and generate suggestions.",
      "Device-level preferences stored on your device, such as onboarding state and appearance settings.",
    ],
  },
  {
    title: "2. How We Collect It",
    body: [
      "We collect data when you sign up, edit your profile, join or create a Cravy, add a spot, write a review, upload photos, or grant app permissions.",
      "We also receive data from service providers that power essential app features, including authentication, storage, and maps.",
    ],
  },
  {
    title: "3. How We Use Information",
    bullets: [
      "To create and manage your account.",
      "To authenticate you securely and keep your session active.",
      "To let you create private food groups, add spots, leave reviews, and compare rankings with friends.",
      "To power nearby place search and spot suggestions when location access is enabled.",
      "To store and display your profile, reviews, notes, photos, and shared Cravy activity.",
      "To improve app security, reliability, and performance.",
    ],
  },
  {
    title: "4. Permissions",
    body: [
      "Cravit may request access to your location and photo library. These permissions are optional and only unlock the related features.",
    ],
    bullets: [
      "Location helps you search for nearby spots and generate suggestions.",
      "Photo library access lets you upload review photos and update your profile picture.",
    ],
  },
  {
    title: "5. How Information Is Shared",
    body: [
      "We do not sell your personal information. Information is shared only when it is needed to operate Cravit or when it is visible by design inside your shared Cravies.",
    ],
    bullets: [
      "Other members of a shared Cravy may see your profile, review activity, ratings, notes, and photos inside that private group.",
      "Service providers may process data on our behalf to power authentication, storage, and place-search features.",
      "We may disclose information when required by law or when necessary to protect users, rights, and the integrity of the service.",
    ],
  },
  {
    title: "6. Third-Party Services",
    body: [
      "Cravit currently relies on third-party providers for essential product functionality.",
    ],
    bullets: [
      "Clerk for authentication and session management.",
      "Supabase for database, storage, and backend data services.",
      "Google Maps Platform and Google Places for place search, details, and nearby suggestions.",
    ],
  },
  {
    title: "7. Data Retention",
    body: [
      "We keep information for as long as needed to operate the app, support shared Cravy features, comply with legal obligations, and protect the service.",
      "If you delete your account, we will attempt to remove or de-identify associated personal data, subject to technical, legal, and backup limitations.",
    ],
  },
  {
    title: "8. Your Choices",
    bullets: [
      "Update your profile in the app.",
      "Manage photo and location permissions in your device settings.",
      "Delete your account in the app from Account > Delete Account.",
      "Stop using Cravit at any time.",
    ],
  },
  {
    title: "9. Security",
    body: [
      "We use reasonable technical and organizational safeguards designed to protect your information. No storage or transmission method is perfectly secure, so absolute security cannot be guaranteed.",
    ],
  },
  {
    title: "10. Children's Privacy",
    body: [
      "Cravit is not directed to children under 13, and we do not knowingly collect personal information from children under 13.",
    ],
  },
  {
    title: "11. International Use",
    body: [
      "If you use Cravit from outside the country where our providers operate, your information may be processed and stored in other jurisdictions.",
    ],
  },
  {
    title: "12. Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time. If we make material changes, we will update the effective date and may provide additional notice where appropriate.",
    ],
  },
  {
    title: "13. Contact & Support",
    body: [
      "For privacy questions or support, visit our support page.",
    ],
  },
];

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read how Cravit handles account data, reviews, photos, location access, and private group activity.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Cravit Privacy Policy",
    description:
      "Read how Cravit handles account data, reviews, photos, location access, and private group activity.",
    url: "/privacy",
  },
  twitter: {
    title: "Cravit Privacy Policy",
    description:
      "Read how Cravit handles account data, reviews, photos, location access, and private group activity.",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Privacy Policy", url: "/privacy" },
        ]}
      />

      <SiteShell>
        <section className="relative overflow-hidden px-5 pb-12 pt-10 sm:px-10 lg:px-24">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(circle_at_top,rgba(255,214,182,0.72)_0%,rgba(255,250,245,0)_72%)]" />

          <div className="mx-auto max-w-4xl">
            <div className="inline-flex items-center rounded-full border border-[rgba(18,17,17,0.08)] bg-white/85 px-3 py-1 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-[rgba(18,17,17,0.62)]">
              Privacy Policy
            </div>

            <div className="mt-6 max-w-3xl">
              <h1 className="heading-1 text-balance">How Cravit Handles Your Data</h1>
              <p className="body-xl mt-5 max-w-2xl text-pretty">
                Cravit is a private, invite-based app for friends who track food spots together.
                This page explains what information we collect, how it is used, and what choices
                you have.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[24px] border border-[rgba(18,17,17,0.08)] bg-white/90 p-5 shadow-[0_20px_60px_rgba(18,17,17,0.06)]">
                <p className="text-sm font-semibold text-[var(--color-dark-1)]">Effective Date</p>
                <p className="body-m mt-2 text-[rgba(18,17,17,0.72)]">March 15, 2026</p>
              </div>
              <div className="rounded-[24px] border border-[rgba(18,17,17,0.08)] bg-white/90 p-5 shadow-[0_20px_60px_rgba(18,17,17,0.06)]">
                <p className="text-sm font-semibold text-[var(--color-dark-1)]">Private by Design</p>
                <p className="body-m mt-2 text-[rgba(18,17,17,0.72)]">
                  Your reviews and activity are centered around the Cravies you share with friends.
                </p>
              </div>
              <div className="rounded-[24px] border border-[rgba(18,17,17,0.08)] bg-white/90 p-5 shadow-[0_20px_60px_rgba(18,17,17,0.06)]">
                <p className="text-sm font-semibold text-[var(--color-dark-1)]">Need Help?</p>
                <p className="body-m mt-2 text-[rgba(18,17,17,0.72)]">
                  Visit the <Link href="/support" className="font-semibold text-[var(--color-accent)] hover:underline">support page</Link> for assistance.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 pb-24 sm:px-10 lg:px-24">
          <article className="mx-auto max-w-4xl rounded-[32px] border border-[rgba(18,17,17,0.08)] bg-white px-6 py-8 shadow-[0_24px_80px_rgba(18,17,17,0.06)] sm:px-10 sm:py-10">
            <div className="space-y-10">
              {sectionGroups.map((section) => (
                <section key={section.title} className="scroll-mt-32">
                  <h2 className="heading-4 text-balance">{section.title}</h2>

                  {section.body ? (
                    <div className="mt-4 space-y-4">
                      {section.body.map((paragraph) => (
                        <p key={paragraph} className="body-m text-[rgba(18,17,17,0.78)]">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ) : null}

                  {section.bullets ? (
                    <ul className="mt-4 space-y-3">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3">
                          <span
                            aria-hidden="true"
                            className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--color-accent)]"
                          />
                          <p className="body-m text-[rgba(18,17,17,0.78)]">{bullet}</p>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </article>
        </section>
      </SiteShell>
    </>
  );
}
