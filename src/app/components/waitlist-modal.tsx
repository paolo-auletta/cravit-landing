"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Waitlist } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

type WaitlistModalProps = {
  open: boolean;
  onClose: () => void;
};

export function WaitlistModal({ open, onClose }: WaitlistModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/45 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.24, ease: [0.18, 0.89, 0.32, 1] }}
        className="relative mx-4 w-full max-w-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className="absolute -inset-[1px] rounded-[26px] bg-[radial-gradient(circle_at_top_left,rgba(255,180,120,0.75)_0%,rgba(255,241,229,0.9)_32%,rgba(255,250,245,0.95)_70%,rgba(255,250,245,1)_100%)] opacity-90 blur-[0.5px]"
          aria-hidden="true"
        />

        <div className="relative overflow-hidden rounded-[24px] border border-white/70 bg-white/95 shadow-[0_28px_80px_rgba(12,10,9,0.35)]">
          <div className="flex items-start justify-between gap-6 border-b border-[#F2EFEB] px-6 pb-4 pt-5">
            <div className="flex flex-col gap-2">
              <span className="inline-flex mb-2 w-fit items-center rounded-full border border-[rgba(18,17,17,0.06)] bg-white/80 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[rgba(18,17,17,0.55)]">
                Cravy early access
              </span>
              <h3 className="heading-3">
                Join the Cravy waitlist
              </h3>
              <p className="body-m">
                Enter your email and we&apos;ll let you know as soon as Cravy is ready in your city.
              </p>
            </div>
            <Button
              variant="outline"
              aria-label="Close waitlist"
              className="size-8 rounded-full bg-white"
              onClick={onClose}
            >
              <X className="size-4" />
            </Button>
          </div>

          <div className="bg-[linear-gradient(to_bottom,rgba(255,255,255,0.96),rgba(255,249,242,0.96))] px-4 pb-5 pt-4 sm:px-6 flex justify-center items-center">
            <Waitlist />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
