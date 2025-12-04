"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

import { Button } from "@/components/ui/button";

type CardLayer = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
  delay: number;
  side: "left" | "right";
  initialY?: number;
};

const cardLayers: CardLayer[] = [
  {
    src: "/hero/Frame 179.png",
    alt: "Street Burger recommendation card",
    width: 329,
    height: 110,
    className:
      "right-[-30%] top-[22%] w-[260px] md:w-[300px] lg:w-[329px] rotate-[2deg]",
    delay: 0.15,
    side: "right",
    initialY: 80,
  },
  {
    src: "/hero/Frame 180.png",
    alt: "Meat Crew recommendation card",
    width: 329,
    height: 110,
    className:
      "right-[-34%] top-[42%] w-[260px] md:w-[300px] lg:w-[329px] rotate-[-6deg]",
    delay: 0.22,
    side: "right",
    initialY: 60,
  },
  {
    src: "/hero/Frame 181.png",
    alt: "Distance rating card",
    width: 329,
    height: 110,
    className:
      "left-[-32%] top-[42%] w-[260px] md:w-[300px] lg:w-[329px] -rotate-[5deg]",
    delay: 0.3,
    side: "left",
    initialY: 70,
  },
  {
    src: "/hero/Criteria Rated.png",
    alt: "Criteria rated badge",
    width: 329,
    height: 110,
    className:
      "right-[-30%] top-[62%] w-[260px] md:w-[300px] lg:w-[329px] rotate-[1deg]",
    delay: 0.38,
    side: "right",
    initialY: 90,
  },
  {
    src: "/hero/Criteria Rated-1.png",
    alt: "Value for money card",
    width: 329,
    height: 110,
    className:
      "left-[-34%] top-[22%] w-[260px] md:w-[300px] lg:w-[329px] -rotate-[2deg]",
    delay: 0.46,
    side: "left",
    initialY: 120,
  },
  {
    src: "/hero/Criteria Rated-2.png",
    alt: "Best burgers card",
    width: 329,
    height: 110,
    className:
      "left-[-30%] top-[62%] w-[260px] md:w-[300px] lg:w-[329px] -rotate-[-2deg]",
    delay: 0.54,
    side: "left",
    initialY: 110,
  },
];

export function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const TITLE_RANGE: [number, number] = [0, 0.2];
  const CARDS_RANGE: [number, number] = [0.02, 0.2];
  const SPRING_SOFT = { stiffness: 140, damping: 26, mass: 0.8 } as const;
  const SPRING_FADE = { stiffness: 120, damping: 24, mass: 0.7 } as const;

  const titleScaleRaw = useTransform(scrollYProgress, TITLE_RANGE, [1, 0.78]);
  const titleTranslateRaw = useTransform(scrollYProgress, TITLE_RANGE, [0, 140]);
  const titleOpacityRaw = useTransform(scrollYProgress, TITLE_RANGE, [1, 0]);

  const cardsOpacityRaw = useTransform(scrollYProgress, CARDS_RANGE, [0, 1]);
  const cardsTranslateYRaw = useTransform(scrollYProgress, CARDS_RANGE, [0, 0]);
  const cardsScaleRaw = useTransform(scrollYProgress, CARDS_RANGE, [1, 1]);
  const cardsOffsetXRaw = useTransform(scrollYProgress, CARDS_RANGE, [-120, 80]);

  const titleScale = useSpring(titleScaleRaw, SPRING_SOFT);
  const titleTranslate = useSpring(titleTranslateRaw, SPRING_SOFT);
  const titleOpacity = useSpring(titleOpacityRaw, SPRING_FADE);

  const cardsOpacity = useSpring(cardsOpacityRaw, SPRING_FADE);
  const cardsTranslateY = useSpring(cardsTranslateYRaw, SPRING_SOFT);
  const cardsScale = useSpring(cardsScaleRaw, SPRING_SOFT);
  const cardsOffsetX = useSpring(cardsOffsetXRaw, SPRING_SOFT);
  const cardsOffsetXLeft = useTransform(cardsOffsetX, (value) => -value);

  return (
    <section
      ref={heroRef}
      className="relative isolate min-h-[120vh] overflow-hidden bg-[var(--color-background)] px-5 pb-32 pt-28 sm:px-10 sm:pt-36 lg:px-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[360px] h-[600px] w-[640px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,206,167,0.65)_0%,rgba(255,165,109,0.25)_55%,rgba(255,250,245,0)_100%)] blur-[120px] opacity-100" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-[22px]">
        <div className="flex flex-col gap-[36px] justify-center items-center text-center">
          <motion.div
            style={{ scale: titleScale, y: titleTranslate, opacity: titleOpacity }}
            className="relative z-0 text-center heading-1 max-w-xl"
          >
            <span>
              Find your Next{" "}
              <span className="text-[var(--color-accent)]">Craving</span>
            </span>
          </motion.div>

          <div className="relative z-20 flex items-center justify-center">
            <div className="relative w-[min(420px,90vw)] sm:w-[460px] lg:w-[520px] xl:w-[560px]">
              <div className="pointer-events-none absolute inset-0 z-0 hidden sm:block">
                {cardLayers.map((card, index) => (
                  <motion.div
                    key={card.src}
                    aria-hidden
                    initial={false}
                    style={{
                      opacity: cardsOpacity,
                      y: cardsTranslateY,
                      scale: cardsScale,
                      x: card.side === "left" ? cardsOffsetXLeft : cardsOffsetX,
                    }}
                    transition={{
                      delay: card.delay + index * 0.02,
                      duration: 0.9,
                      ease: [0.2, 0.8, 0.2, 1],
                    }}
                    className={`absolute z-0 border-1 border-[rgba(33, 33, 33, 0.12)] border-dashed rounded-[12px] ${card.className}`}
                  >
                    <Image
                      src={card.src}
                      alt={card.alt}
                      width={card.width}
                      height={card.height}
                      className="h-auto w-auto"
                      sizes="(max-width: 768px) 260px, 329px"
                      priority
                    />
                  </motion.div>
                ))}
              </div>

              <div className="pointer-events-none absolute inset-[-18%] z-20">
                <div className="absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,249,244,0.92)_0%,rgba(255,233,215,0.85)_38%,rgba(255,206,167,0.5)_60%,rgba(255,165,109,0.18)_78%,rgba(255,250,245,0)_100%)] blur-[90px]" />
              </div>

              <Image
                src="/mockups/Home.png"
                alt="Cravit mobile app mockup"
                width={400}
                height={772}
                priority
                className="relative z-30 mx-auto sm:px-0 px-1"
              />
            </div>
          </div>

          <p className="body-xl max-w-2xl text-balance text-[color-mix(in_srgb,var(--color-dark-1)_80%,transparent)]">
            Discover, rate, and explore food your way
            <br className="hidden sm:block" />
            Let food meet adventure.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 text-center">
          <Button variant="heroLarge" className="group">
            <ArrowUpRight className="size-5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            Join the Waitlist
          </Button>
        </div>
      </div>
    </section>
  );
}
