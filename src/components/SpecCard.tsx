"use client";

import React, { useEffect, useRef, useState } from 'react';

interface SpecCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  unit: string;
  description: string;
  variant?: 'default' | 'highlighted';
}

interface SpecCardsGridProps {
  specs: SpecCardProps[];
  columns?: 2 | 3 | 4;
  className?: string;
}

// Custom hook for counting animation
function useCountUp(targetValue: number, duration: number = 2000, shouldStart: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) {
      setCount(0);
      return;
    }

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = easeOutQuart * targetValue;

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(targetValue);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [targetValue, duration, shouldStart]);

  return count;
}

// Custom hook for intersection observer
function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Check if element is intersecting and we haven't triggered animation yet
      if (entry.isIntersecting && !hasIntersected) {
        setIsIntersecting(true);
        setHasIntersected(true);
      }
    }, {
      threshold: 0.2, // Trigger when 20% of element is visible
      rootMargin: '0px 0px -50px 0px', // Trigger a bit before element fully enters viewport
      ...options,
    });

    if (ref.current) {
      observer.observe(ref.current);

      // Also check immediately if the element is already in view
      const rect = ref.current.getBoundingClientRect();
      const isCurrentlyVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isCurrentlyVisible && !hasIntersected) {
        setIsIntersecting(true);
        setHasIntersected(true);
      }
    }

    return () => observer.disconnect();
  }, [hasIntersected, options]);

  return [ref, isIntersecting] as const;
}

export function SpecCard({
  icon,
  title,
  value,
  unit,
  description,
  variant = 'default'
}: SpecCardProps) {
  const [ref, isIntersecting] = useIntersectionObserver();
  const [hasStartedAnimation, setHasStartedAnimation] = useState(false);

  // Parse numeric value for animation
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  const isValidNumber = !isNaN(numericValue);

  // Start animation when intersecting with a delay
  useEffect(() => {
    if (isIntersecting && !hasStartedAnimation && isValidNumber) {
      const timer = setTimeout(() => {
        setHasStartedAnimation(true);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isIntersecting, hasStartedAnimation, isValidNumber]);

  // Use counting animation for numeric values
  const animatedValue = useCountUp(
    isValidNumber ? numericValue : 0,
    2000,
    hasStartedAnimation
  );

  // Format the display value
  const displayValue = isValidNumber
    ? (hasStartedAnimation
      ? (numericValue % 1 === 0 ? Math.round(animatedValue).toString() : animatedValue.toFixed(1))
      : "0")
    : value;

  const cardClasses = variant === 'highlighted'
    ? "bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-blue-400/50 shadow-xl hover:shadow-2xl"
    : "bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 shadow-lg hover:shadow-xl";

  return (
    <div ref={ref} className={`${cardClasses} rounded-xl p-6 transition-all duration-300 hover:scale-105 group`}>

      {/* Icon and Title Section */}
      <div className="flex justify-center items-center gap-2 mb-4 text-blue-600 transition-colors">
        {/* Icon */}
        {icon}

        {/* Title */}
        <h3 className="font-semibold text-2xl text-center">
          {title}
        </h3>
      </div>


      {/* Value and Unit */}
      <div className="text-center mb-3">
        <span className="text-3xl font-bold text-blue-600 transition-colors">
          {displayValue}
        </span>
        <span className={`text-blue-600 ${unit === "G" ? "text-3xl font-bold font-bold" : "text-lg ml-1 font-medium"}`} >
          {unit}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm text-center leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export function SpecCardsGrid({
  specs,
  columns = 3,
  className = ""
}: SpecCardsGridProps) {
  const gridClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
  };

  return (
    <div className={`grid ${gridClasses[columns]} gap-6 ${className}`}>
      {specs.map((spec, index) => (
        <SpecCard key={index} {...spec} />
      ))}
    </div>
  );
}

// Export individual icons for reuse
export const SpeedIcon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M20 23.3333L26.6667 16.6666" stroke="#0974F1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5.56665 31.6666C4.10368 29.133 3.33342 26.2589 3.33331 23.3332C3.3332 20.4075 4.10323 17.5333 5.56601 14.9996C7.02879 12.4658 9.13277 10.3618 11.6665 8.89891C14.2002 7.43604 17.0743 6.66589 20 6.66589C22.9257 6.66589 25.7998 7.43604 28.3335 8.89891C30.8672 10.3618 32.9712 12.4658 34.4339 14.9996C35.8967 17.5333 36.6668 20.4075 36.6666 23.3332C36.6665 26.2589 35.8963 29.133 34.4333 31.6666" stroke="#0974F1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const BatteryIcon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="41" height="25" viewBox="0 0 41 25" fill="none">
    <path d="M27.3348 3.13678H5.82546C3.84558 3.13678 2.24057 4.74179 2.24057 6.72167V17.4763C2.24057 19.4562 3.84558 21.0612 5.82546 21.0612H27.3348C29.3147 21.0612 30.9197 19.4562 30.9197 17.4763V6.72167C30.9197 4.74179 29.3147 3.13678 27.3348 3.13678Z" stroke="#0974F1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M38.0894 10.3066V13.8915" stroke="#0974F1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const PropulsionIcon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M6.66667 23.3333C6.35128 23.3344 6.04206 23.246 5.77493 23.0783C5.5078 22.9106 5.29373 22.6706 5.15759 22.3861C5.02145 22.1016 4.96883 21.7843 5.00584 21.4711C5.04285 21.1579 5.16797 20.8616 5.36667 20.6167L21.8667 3.61665C21.9904 3.47379 22.1591 3.37725 22.345 3.34287C22.5308 3.3085 22.7229 3.33834 22.8896 3.42749C23.0562 3.51665 23.1876 3.65981 23.2622 3.8335C23.3368 4.00719 23.3501 4.20107 23.3 4.38332L20.1 14.4167C20.0056 14.6692 19.974 14.9409 20.0077 15.2083C20.0414 15.4758 20.1394 15.7311 20.2935 15.9524C20.4475 16.1736 20.653 16.3542 20.8921 16.4786C21.1313 16.603 21.3971 16.6675 21.6667 16.6667H33.3333C33.6487 16.6656 33.958 16.754 34.2251 16.9217C34.4922 17.0894 34.7063 17.3294 34.8424 17.6139C34.9786 17.8984 35.0312 18.2157 34.9942 18.5289C34.9572 18.8421 34.832 19.1384 34.6333 19.3833L18.1333 36.3833C18.0096 36.5262 17.8409 36.6227 17.655 36.6571C17.4692 36.6915 17.2771 36.6616 17.1105 36.5725C16.9438 36.4833 16.8124 36.3402 16.7378 36.1665C16.6632 35.9928 16.6499 35.7989 16.7 35.6166L19.9 25.5833C19.9944 25.3308 20.0261 25.0591 19.9924 24.7916C19.9587 24.5242 19.8606 24.2688 19.7065 24.0476C19.5525 23.8264 19.3471 23.6458 19.1079 23.5214C18.8687 23.397 18.6029 23.3324 18.3333 23.3333H6.66667Z" stroke="#0974F1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const WeightIcon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
  </svg>
);

export const RangeIcon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const DepthIcon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
  </svg>
);

export const SolarPanelIcon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
    <g clipPath="url(#clip0_350_636)">
      <path d="M21 28.4667C25.1237 28.4667 28.4667 25.1237 28.4667 21C28.4667 16.8763 25.1237 13.5333 21 13.5333C16.8763 13.5333 13.5333 16.8763 13.5333 21C13.5333 25.1237 16.8763 28.4667 21 28.4667Z" stroke="#FACC15" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 2.33331V6.06665" stroke="#FACC15" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 35.9333V39.6667" stroke="#FACC15" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.80266 7.80267L10.4347 10.4347" stroke="#FACC15" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M31.5653 31.5654L34.1973 34.1974" stroke="#FACC15" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.33333 21H6.06666" stroke="#FACC15" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M35.9333 21H39.6667" stroke="#FACC15" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.4347 31.5654L7.80266 34.1974" stroke="#FACC15" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M34.1973 7.80267L31.5653 10.4347" stroke="#FACC15" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <clipPath id="clip0_350_636">
        <rect width="42" height="42" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const VesselParametersIcon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M20.3667 3.33337H19.6333C18.7493 3.33337 17.9014 3.68456 17.2763 4.30968C16.6512 4.93481 16.3 5.78265 16.3 6.66671V6.96671C16.2994 7.55125 16.1451 8.12536 15.8526 8.63144C15.56 9.13752 15.1396 9.55777 14.6333 9.85004L13.9167 10.2667C13.4099 10.5593 12.8351 10.7133 12.25 10.7133C11.6649 10.7133 11.0901 10.5593 10.5833 10.2667L10.3333 10.1334C9.56844 9.69215 8.65973 9.57245 7.80667 9.80055C6.95361 10.0287 6.22592 10.5859 5.78333 11.35L5.41667 11.9834C4.97544 12.7483 4.85574 13.657 5.08385 14.51C5.31195 15.3631 5.86923 16.0908 6.63333 16.5334L6.88333 16.7C7.38713 16.9909 7.80603 17.4085 8.09842 17.9114C8.3908 18.4143 8.54649 18.985 8.55 19.5667V20.4167C8.55233 21.0041 8.39942 21.5816 8.10674 22.0909C7.81406 22.6001 7.39201 23.023 6.88333 23.3167L6.63333 23.4667C5.86923 23.9093 5.31195 24.637 5.08385 25.49C4.85574 26.3431 4.97544 27.2518 5.41667 28.0167L5.78333 28.65C6.22592 29.4141 6.95361 29.9714 7.80667 30.1995C8.65973 30.4276 9.56844 30.3079 10.3333 29.8667L10.5833 29.7334C11.0901 29.4408 11.6649 29.2868 12.25 29.2868C12.8351 29.2868 13.4099 29.4408 13.9167 29.7334L14.6333 30.15C15.1396 30.4423 15.56 30.8626 15.8526 31.3686C16.1451 31.8747 16.2994 32.4488 16.3 33.0334V33.3334C16.3 34.2174 16.6512 35.0653 17.2763 35.6904C17.9014 36.3155 18.7493 36.6667 19.6333 36.6667H20.3667C21.2507 36.6667 22.0986 36.3155 22.7237 35.6904C23.3488 35.0653 23.7 34.2174 23.7 33.3334V33.0334C23.7006 32.4488 23.8549 31.8747 24.1474 31.3686C24.44 30.8626 24.8604 30.4423 25.3667 30.15L26.0833 29.7334C26.5901 29.4408 27.1649 29.2868 27.75 29.2868C28.3351 29.2868 28.9099 29.4408 29.4167 29.7334L29.6667 29.8667C30.4316 30.3079 31.3403 30.4276 32.1933 30.1995C33.0464 29.9714 33.7741 29.4141 34.2167 28.65L34.5833 28C35.0246 27.2351 35.1443 26.3264 34.9162 25.4734C34.688 24.6203 34.1308 23.8926 33.3667 23.45L33.1167 23.3167C32.608 23.023 32.1859 22.6001 31.8933 22.0909C31.6006 21.5816 31.4477 21.0041 31.45 20.4167V19.5834C31.4477 18.996 31.6006 18.4185 31.8933 17.9092C32.1859 17.3999 32.608 16.9771 33.1167 16.6834L33.3667 16.5334C34.1308 16.0908 34.688 15.3631 34.9162 14.51C35.1443 13.657 35.0246 12.7483 34.5833 11.9834L34.2167 11.35C33.7741 10.5859 33.0464 10.0287 32.1933 9.80055C31.3403 9.57245 30.4316 9.69215 29.6667 10.1334L29.4167 10.2667C28.9099 10.5593 28.3351 10.7133 27.75 10.7133C27.1649 10.7133 26.5901 10.5593 26.0833 10.2667L25.3667 9.85004C24.8604 9.55777 24.44 9.13752 24.1474 8.63144C23.8549 8.12536 23.7006 7.55125 23.7 6.96671V6.66671C23.7 5.78265 23.3488 4.93481 22.7237 4.30968C22.0986 3.68456 21.2507 3.33337 20.3667 3.33337Z" stroke="#0974F1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 25C22.7614 25 25 22.7614 25 20C25 17.2386 22.7614 15 20 15C17.2386 15 15 17.2386 15 20C15 22.7614 17.2386 25 20 25Z" stroke="#0974F1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const AutonomyIcon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M20 3.33334C29.2048 3.33334 36.6667 10.7952 36.6667 20C36.6667 29.2048 29.2048 36.6667 20 36.6667C10.7952 36.6667 3.33334 29.2048 3.33334 20C3.33334 10.7952 10.7952 3.33334 20 3.33334Z" stroke="#0974F1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 8.33334V20L28.3333 24.1667" stroke="#0974F1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 3.33334H25" stroke="#0974F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const TelemetryIcon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="28" viewBox="0 0 40 28" fill="none">
    <path d="M8.21497 17.9812C7.68781 17.4562 7.43887 16.8292 7.46816 16.1C7.49744 15.3708 7.79031 14.8021 8.34676 14.3938C9.95754 13.1688 11.7517 12.2132 13.7291 11.5272C15.7054 10.8424 17.7918 10.5 19.9883 10.5C22.2141 10.5 24.3157 10.85 26.2932 11.55C28.2695 12.25 30.063 13.2271 31.6738 14.4812C32.2302 14.8896 32.5161 15.4513 32.5313 16.1665C32.5454 16.8805 32.2888 17.5 31.7616 18.025C31.2638 18.5208 30.6563 18.7763 29.9394 18.7915C29.2213 18.8055 28.5547 18.6083 27.9397 18.2C26.7975 17.4125 25.5604 16.8076 24.2285 16.3852C22.8953 15.9617 21.4819 15.75 19.9883 15.75C18.4947 15.75 17.0819 15.9688 15.7499 16.4062C14.4168 16.8438 13.1937 17.4417 12.0808 18.2C11.4365 18.6375 10.7559 18.8347 10.039 18.7915C9.32085 18.7472 8.71285 18.4771 8.21497 17.9812ZM0.746816 10.5875C0.248939 10.0917 0 9.48617 0 8.771C0 8.057 0.263582 7.46667 0.790746 7C3.39728 4.8125 6.32597 3.09867 9.57681 1.8585C12.8277 0.6195 16.2982 0 19.9883 0C23.6785 0 27.1489 0.6195 30.3998 1.8585C33.6506 3.09867 36.5793 4.8125 39.1859 7C39.713 7.46667 39.9842 8.05 39.9995 8.75C40.0135 9.45 39.757 10.0625 39.2298 10.5875C38.7319 11.0833 38.1245 11.3458 37.4076 11.375C36.6894 11.4042 36.0375 11.1854 35.4518 10.7188C33.3138 8.99792 30.9346 7.65625 28.314 6.69375C25.6922 5.73125 22.917 5.25 19.9883 5.25C17.0596 5.25 14.285 5.73125 11.6644 6.69375C9.04262 7.65625 6.66277 8.99792 4.52483 10.7188C3.93909 11.1854 3.28775 11.4042 2.5708 11.375C1.85269 11.3458 1.24469 11.0833 0.746816 10.5875ZM19.9883 28C18.9926 28 18.1579 27.6646 17.4843 26.9937C16.8107 26.3229 16.4739 25.4917 16.4739 24.5C16.4739 23.5083 16.8107 22.6771 17.4843 22.0063C18.1579 21.3354 18.9926 21 19.9883 21C20.9841 21 21.8187 21.3354 22.4923 22.0063C23.1659 22.6771 23.5027 23.5083 23.5027 24.5C23.5027 25.4917 23.1659 26.3229 22.4923 26.9937C21.8187 27.6646 20.9841 28 19.9883 28Z" fill="#0974F1" />
  </svg>
);
