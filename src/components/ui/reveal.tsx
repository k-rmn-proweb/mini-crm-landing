"use client";

import { m, useReducedMotion } from "motion/react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds of stagger, for revealing a list one item after another. */
  delay?: number;
};

/**
 * Fades content up as it scrolls into view, once.
 *
 * Only `opacity` and `transform` animate, so nothing reflows and the page keeps
 * its zero CLS. Above-the-fold content is deliberately left alone — starting
 * the hero at `opacity: 0` would push out the LCP it is measured by.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      // Hook for the no-JavaScript fallback in the root layout: the server
      // renders this element at opacity 0, so without JS it would never appear.
      data-reveal
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      // `once` keeps it from replaying on every scroll past; the negative
      // margin waits until the block is properly on screen.
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
