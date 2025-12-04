"use client";

import { FeatureCard, type FeatureCardProps } from "./feature-card";
import { motion } from "framer-motion";
import { Ranking } from "@phosphor-icons/react";

const FEATURE_CARDS: FeatureCardProps[] = [
  {
    className: "bg-[var(--color-background)]",
    iconName: "Pizza",
    iconLabel: "Pizza icon",
    title: "Your taste, your mission.",
    description:
      "Turn cravings into missions. Set your category, criteria, and rating style — from burgers to sushi to brunch.",
    visualAlign: "top",
    imageTransform: {
      rotateX: 0,
      rotateY: 0,
      skewX: 0,
      skewY: 8,
      translateX: 0,
      translateY: 0,
    },
    visual: {
      src: "/mockups/Home.png",
      alt: "Cravit mobile app showing notification",
      width: 400,
      height: 772,
    },
  },
  {
    className: "bg-[var(--color-background)]",
    iconName: "Star",
    iconLabel: "Star icon",
    title: "Rate with Purpose",
    description:
      "Cravy lets you rate each spot based on the criteria you defined for that specific mission.",
    visualAlign: "center",
    imageTransform: {
      rotateX: 0,
      rotateY: 0,
      skewX: -6,
      skewY: 8,
      translateX: 0,
      translateY: 0,
    },
    visual: {
      src: "/mockups/Review.png",
      alt: "Review mockup",
      width: 384,
      height: 640,
    },
  },
  {
    className: "bg-[var(--color-background)]",
    iconName: "Users",
    iconLabel: "Users icon",
    title: "Bring Your Crew",
    description:
      "Food is better together. Create or join Crews to share Cravies, compare spot ratings, and explore as a group.",
    visualAlign: "center",
    imageTransform: {
      rotateX: 0,
      rotateY: 0,
      skewX: 6,
      skewY: -8,
      translateX: 0,
      translateY: 0,
    },
    visual: {
      src: "/mockups/Cravy.png",
      alt: "Cravy profile mockup",
      width: 384,
      height: 640,
    },
  },
  {
    className: "bg-[var(--color-background)]",
    iconName: "Ranking",
    iconLabel: "Rank icon",
    title: "Spot Leaderboard",
    description:
      "See how your favorite spots rank against others in your Crew or across the app.",
    visualAlign: "bottom",
    imageTransform: {
      rotateX: 0,
      rotateY: 0,
      skewX: 0,
      skewY: 0,
      translateX: 0,
      translateY: 0,
    },
    visual: {
      src: "/mockups/Leaderboard.png",
      alt: "Leaderboard mockup",
      width: 400,
      height: 400,
    },
  },
];

export function FeaturesSection() {
  return (
    <section className="px-6 py-24 md:px-[48px] md:py-[120px] bg-white mx-auto w-full flex flex-col gap-[80px]">
      <motion.div
        className="flex flex-col gap-6 text-start mx-auto max-w-5xl"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <h2 className="heading-2 md:max-w-[95%]">Discovering new places should feel like an <span className="font-medium text-[var(--color-accent)]">adventure</span> you share with friends, full of moments you’ll talk about long after the meal.</h2>
        <p className="body-l md:max-w-[75%]">Cravy gives you and your friends a playful way to explore, track your discoveries, rate each spot, and shape a shared story filled with new favorites and unexpected gems.</p>
      </motion.div>
      <div className="flex flex-col gap-12 mx-auto max-w-5xl w-full">
        <div className="flex justify-center">
          <motion.div
            className="grid w-full max-w-[1200px] grid-cols-1 gap-[6px] rounded-[44px] border border-[#F2EFEB] bg-[var(--color-background)] p-[6px] shadow-[0px_1px_0px_8px_#F2EFEB] sm:grid-cols-2"
            style={{ gridAutoRows: "minmax(260px, 1fr)" }}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {FEATURE_CARDS.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.6,
                  ease: [0.2, 0.8, 0.2, 1],
                  delay: index * 0.06,
                }}
              >
                <FeatureCard {...card} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

