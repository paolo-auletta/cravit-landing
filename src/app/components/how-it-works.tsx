"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type HowItWorksStep = {
  id: string;
  label: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    id: "create-cravy",
    label: "Create your Cravy",
    title: "Create your Cravy and set your criteria",
    description:
      "A Cravy is your personal food mission — like finding the best ramen, pastries, or burgers in town. Set the criteria that matter to you, from crunchiness to vibe to value, and define how you’ll judge every spot you try.",
    image: {
      src: "/features/Create-Cravy.png",
      alt: "Create your Cravy and set your criteria",
      width: 400,
      height: 772,
    },
  },
  {
    id: "add-spots",
    label: "Add spots",
    title: "Add spots using maps or our suggestions",
    description:
      "Search and add places directly through Google Maps, or pick from Cravy’s smart recommendations. Your mission fills up with spots waiting to be explored.",
    image: {
      src: "/features/Add-Spot.png",
      alt: "Add spots using maps or our suggestions",
      width: 384,
      height: 640,
    },
  },
  {
    id: "invite-friends",
    label: "Invite your friends easily",
    title: "Invite your friends easily",
    description:
      "Cravies become way more fun with company. Share your mission with friends in just a tap and explore together as a Crew.",
    image: {
      src: "/features/Friends.png",
      alt: "Invite your friends easily",
      width: 384,
      height: 640,
    },
  },
  {
    id: "review",
    label: "Add reviews",
    title: "Start craving and leave reviews",
    description:
      "Visit the spots in your Cravy, taste freely, and rate each place using the criteria you defined. Add notes and photos to capture the moment while it’s fresh.",
    image: {
      src: "/features/Review.png",
      alt: "Add reviews",
      width: 400,
      height: 400,
    },
  },
  {
    id: "leaderboard",
    label: "Check the leaderboard",
    title: "Check the leaderboard to see which spot is winning",
    description:
      "Cravit ranks all the spots in your Cravy based on yours and your friends' reviews. See which place rises to the top and becomes the true champion of your Cravy.",
    image: {
      src: "/features/Leaderboard.png",
      alt: "Check the leaderboard to see which spot is winning",
      width: 400,
      height: 400,
    },
  },
];

export function HowItWorksSection() {
  const [activeId, setActiveId] = useState(
    HOW_IT_WORKS_STEPS[0]?.id ?? "set-mission",
  );
  const stepRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof IntersectionObserver === "undefined"
    ) {
      return;
    }

    // Only enable scroll-spy behavior on desktop (lg and up).
    if (window.innerWidth < 1024) {
      return;
    }

    const refs = stepRefs.current.slice();

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        const index = refs.findIndex((el) => el === visible.target);

        if (index === -1) return;

        const step = HOW_IT_WORKS_STEPS[index];
        if (step) {
          setActiveId(step.id);
        }
      },
      {
        threshold: [0.25, 0.5, 0.75],
        rootMargin: "-10% 0px -55% 0px",
      },
    );

    refs.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      refs.forEach((el) => {
        if (el) observer.unobserve(el);
      });
      observer.disconnect();
    };
  }, []);

  const handleNavClick = useCallback((stepId: string, index: number) => {
    const target = stepRefs.current[index];

    if (target && typeof target.scrollIntoView === "function") {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    setActiveId(stepId);
  }, []);

  return (
    <section className="relative mx-auto w-full bg-[var(--color-white)] px-5 py-24 sm:px-10 lg:px-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
        <div className="flex flex-col gap-8 self-start lg:sticky lg:top-24">
          <div className="flex flex-col gap-3">
            <span className="inline-flex w-fit items-center rounded-full border border-[rgba(18,17,17,0.08)] bg-white/70 px-3 py-1 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-[rgba(18,17,17,0.65)]">
              How it works
            </span>
            <h2 className="heading-2">
              How Cravit turns
              <br />
              <span className="text-[var(--color-accent)]">
                cravings into stories
              </span>
              .
            </h2>
            <p className="body-m max-w-md">
              Every Cravy begins with an idea — a food you love, a mission you want to explore, and a few friends to share it with.
            </p>
          </div>

          <nav aria-label="How it works steps" className="mt-4">
            <ul className="space-y-1 border-l border-[rgba(18,17,17,0.08)] pl-4">
              {HOW_IT_WORKS_STEPS.map((step, index) => {
                const isActive = step.id === activeId;

                return (
                  <li key={step.id}>
                    <button
                      type="button"
                      onClick={() => handleNavClick(step.id, index)}
                      className={cn(
                        "group flex w-full items-center gap-3 py-3 text-left transition-colors",
                        isActive
                          ? "text-[var(--color-accent)]"
                          : "text-[color-mix(in_srgb,var(--color-dark-1)_70%,transparent)]",
                      )}
                    >
                      <span
                        className={cn(
                          "h-[1px] w-6 rounded-full bg-[rgba(18,17,17,0.18)] transition-colors group-hover:bg-[var(--color-accent)]",
                          isActive && "bg-[var(--color-accent)]",
                        )}
                      />
                      <span className="body-l">{step.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-16">
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <motion.article
              key={step.id}
              ref={(el) => {
                stepRefs.current[index] = el;
              }}
              id={`how-it-works-${step.id}`}
              className={cn(
                "scroll-mt-32 flex flex-col gap-5",
                index > 0 && "border-t border-[rgba(18,17,17,0.08)] pt-12",
              )}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
              viewport={{ once: true, amount: 0.4 }}
            >
              <div className="flex flex-col gap-2">
                <h3 className="heading-3">{step.title}</h3>
                <p className="body-l max-w-xl">{step.description}</p>
              </div>

              <div className="relative overflow-hidden">
                <Image
                  src={step.image.src}
                  alt={step.image.alt}
                  width={step.image.width}
                  height={step.image.height}
                  className="h-full w-[100%] object-cover border border-[rgba(18,17,17,0.08)] rounded-[18px] border-dashed"
                  sizes="(max-width: 768px) 100vw, 560px"
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
