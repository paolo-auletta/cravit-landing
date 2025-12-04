"use client";

import { forwardRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion, type MotionStyle } from "framer-motion";
import * as PhosphorIcons from "@phosphor-icons/react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";

const VISUAL_ALIGN_MAP = {
  top: "flex-start",
  center: "center",
  bottom: "flex-end",
} as const;

const IMAGE_FOCUS_MAP = {
  top: "center 0%",
  center: "center 50%",
  bottom: "center 100%",
} as const satisfies Record<VisualAlign, string>;

const DEFAULT_IMAGE_TRANSFORM: MotionStyle = {
  transformPerspective: 1200,
  rotateX: -12,
  rotateY: -4,
  skewY: 6,
  translateY: 8,
};

type VisualAlign = keyof typeof VISUAL_ALIGN_MAP;

type FeatureCardVisual = {
  src: string | StaticImageData;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  priority?: boolean;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  className?: string;
};

type ImageTransform = Partial<
  Pick<
    MotionStyle,
    | "rotateX"
    | "rotateY"
    | "rotateZ"
    | "skewX"
    | "skewY"
    | "scale"
    | "scaleX"
    | "scaleY"
    | "translateX"
    | "translateY"
    | "transformPerspective"
  >
>;

export type FeatureCardProps = {
  className?: string;
  iconName: keyof typeof PhosphorIcons;
  iconLabel?: string;
  title: string;
  description: string;
  visual: FeatureCardVisual;
  visualAlign?: VisualAlign;
  imageTransform?: ImageTransform;
};

export const FeatureCard = forwardRef<HTMLElement, FeatureCardProps>(
  function FeatureCard(
    {
      className,
      iconName,
      iconLabel,
      title,
      description,
      visual,
      visualAlign = "top",
      imageTransform,
    }: FeatureCardProps,
    ref,
  ) {
  const IconComponent =
    (PhosphorIcons[iconName] as PhosphorIcon | undefined) ??
    PhosphorIcons.Pizza;

  const { className: visualClassName, alt, ...visualProps } = visual;

  const mergedImageTransform: MotionStyle = {
    ...DEFAULT_IMAGE_TRANSFORM,
    ...imageTransform,
  };

  return (
    <article
      ref={ref}
      className={cn(
        "flex flex-col gap-6 rounded-[40px] border border-[#F2EFEB] bg-[var(--color-background)] p-9 shadow-[0_0px_55px_rgba(18,17,17,0.02)]",
        className,
      )}
    >
      <motion.div
        className="relative flex min-h-[260px] flex-col items-start"
        style={{ justifyContent: VISUAL_ALIGN_MAP[visualAlign] }}
      >
        <div
          className={cn(
            "relative h-[280px] w-full max-w-[324px] overflow-hidden p-4 sm:h-[320px]",
            visualClassName,
          )}
        >
          <motion.div
            className="relative h-[420px] w-full"
            style={mergedImageTransform}
          >
            <Image
              {...visualProps}
              alt={alt}
              className="h-full w-full max-w-none object-cover"
              style={{ objectPosition: IMAGE_FOCUS_MAP[visualAlign] }}
              sizes={visualProps.sizes ?? "(max-width: 768px) 90vw, 360px"}
            />
          </motion.div>

          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[rgba(255,248,242,0.95)] via-[rgba(255,250,245,0.65)] to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[rgba(255,248,242,0.98)] via-[rgba(255,250,245,0.7)] to-transparent" />
        </div>
      </motion.div>

      <div className="flex flex-col items-start gap-3 text-left">
        <span className="flex items-center justify-center text-[var(--color-accent)]">
          <IconComponent className="size-[28px]" aria-hidden />
          <span className="sr-only">{iconLabel ?? `${title} icon`}</span>
        </span>
        <h3 className="heading-4 text-[var(--color-dark-1)] max-w-[360px]">{title}</h3>
        <p className="body-l max-w-[360px]">{description}</p>
      </div>
    </article>
  );
});