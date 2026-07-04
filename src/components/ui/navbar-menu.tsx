"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
} as const;

export function Menu({
  setActive,
  children,
  className,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className={cn(
        "relative flex items-center gap-4 rounded-full border border-white/15 bg-gray-950/80 px-4 py-2 shadow-lg backdrop-blur-md md:gap-6 md:px-6",
        className
      )}
    >
      {children}
    </nav>
  );
}

export function MenuItem({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) {
  const isActive = active === item;
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className="flex cursor-pointer items-center gap-1.5 text-white transition-colors hover:text-blue-300"
      >
        {item}
        <svg
          width="10"
          height="9"
          viewBox="0 0 9 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Dropdown arrow"
          className={`transition-transform duration-200 ${isActive ? "rotate-180" : ""}`}
        >
          <path d="M4.5 7.5L0.602887 0.749999L8.39711 0.75L4.5 7.5Z" fill="currentColor" />
        </svg>
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {isActive && (
            <div className="absolute left-1/2 top-[calc(100%+1.1rem)] -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active"
                className="overflow-hidden rounded-2xl border border-white/15 bg-gray-950/95 shadow-2xl backdrop-blur-md"
              >
                <motion.div layout className="h-full w-max p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

export function ProductItem({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) {
  return (
    <Link href={href} className="group flex gap-3">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="h-[70px] w-[140px] shrink-0 rounded-md object-cover shadow-2xl"
      />
      <div>
        <h4 className="mb-1 text-lg font-bold text-white transition-colors group-hover:text-blue-300">
          {title}
        </h4>
        <p className="max-w-[12rem] text-sm text-gray-400">{description}</p>
      </div>
    </Link>
  );
}
