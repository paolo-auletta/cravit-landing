"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="relative mx-auto w-full bg-[var(--color-white)] px-5 pb-24 sm:px-10 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="relative overflow-hidden rounded-2xl border-2 border-[#F2EFEB] bg-[radial-gradient(circle_at_top_left,rgba(255,233,215,0.9)_0%,rgba(255,250,245,0.98)_40%,rgba(255,250,245,1)_70%,rgba(255,250,245,1)_100%)] px-6 py-10 shadow-[0_26px_80px_rgba(255,105,0,0.1)] sm:px-10 sm:py-14 lg:px-16 lg:py-16"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
            <div className="flex flex-col gap-6">
              <span className="inline-flex w-fit items-center rounded-full border border-[rgba(18,17,17,0.08)] bg-white/80 px-3 py-1 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-[rgba(18,17,17,0.65)]">
                Early access
              </span>

              <h2 className="heading-2">
                Ready to start your
                <br />
                <span className="text-[var(--color-accent)]">next Cravy?</span>
              </h2>

              <p className="body-l max-w-lg">
                Join the waitlist to be among the first to turn your cravings into
                shared food missions with friends.
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-4">
                <Button variant="heroLarge" className="group">
                  <ArrowUpRight className="size-5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  Join the Waitlist
                </Button>
                <span className="body-s">
                  <span className="text-[rgba(18,17,17,0.6)]">
                    No spam, just launch updates and early access invites.
                  </span>
                </span>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end hidden sm:block">
              <div className="pointer-events-none absolute inset-x-[-80px] top-4 h-64 rounded-full bg-[var(--color-accent)] opacity-25 blur-[72px]" />
              <div className="relative flex w-full max-w-[360px] items-center justify-center">
                <motion.div
                  className="relative z-20 w-[200px] overflow-hidden"
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  <Image
                    src="/mockups/Home.png"
                    alt="Cravit home screen mockup"
                    width={400}
                    height={772}
                    className="h-full w-full object-cover"
                    sizes="(max-width: 768px) 220px, 260px"
                  />
                </motion.div>

                <motion.div
                  className="absolute -left-10 top-6 z-10 hidden w-[180px] overflow-hidden sm:block"
                  initial={{ y: 24, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.75, delay: 0.08, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  <Image
                    src="/mockups/Cravy.png"
                    alt="Cravy mission mockup"
                    width={384}
                    height={640}
                    className="h-full w-full object-cover"
                    sizes="(max-width: 768px) 200px, 220px"
                  />
                </motion.div>

                <motion.div
                  className="absolute -right-12 bottom-2 z-10 hidden w-[180px] overflow-hidden sm:block"
                  initial={{ y: 24, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.75, delay: 0.14, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  <Image
                    src="/mockups/Leaderboard.png"
                    alt="Cravit leaderboard mockup"
                    width={400}
                    height={400}
                    className="h-full w-full object-cover"
                    sizes="(max-width: 768px) 200px, 220px"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
