import React from "react";
import Image from "next/image";

export function OutlierIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="32" height="32" rx="7" fill="#0A0D14" />
      {/* Outlier 3D Isometric Cube / Prism */}
      <path d="M16 4.5L26 10.3V21.7L16 27.5L6 21.7V10.3L16 4.5Z" fill="#FF5A36" />
      <path d="M16 4.5L26 10.3L16 16.1L6 10.3L16 4.5Z" fill="#FF7A59" />
      <path d="M16 16.1L26 10.3V21.7L16 27.5V16.1Z" fill="#D63A16" />
      <path d="M6 10.3L16 16.1V27.5L6 21.7V10.3Z" fill="#E84922" />
      {/* Inner modern core */}
      <circle cx="16" cy="16" r="3.2" fill="#FFFFFF" />
    </svg>
  );
}

export function AlignerrIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="32" height="32" rx="7" fill="#180B2E" />
      {/* Alignerr modern alignment glyph */}
      <path
        d="M9 11.5L16 6.5L23 11.5L16 16.5L9 11.5Z"
        fill="#818CF8"
      />
      <path
        d="M9 20.5L16 15.5L23 20.5L16 25.5L9 20.5Z"
        fill="#C084FC"
      />
      <circle cx="16" cy="16" r="2.5" fill="#FFFFFF" />
    </svg>
  );
}

export function DiscoveryAcademyIcon({ className = "w-5 h-5", variant = "round" }: { className?: string; variant?: "round" | "purple" }) {
  const src = variant === "purple" 
    ? "/images/journey/discovery-academy-purple.png" 
    : "/images/journey/discovery-academy.jpg";

  return (
    <div className={`relative inline-block overflow-hidden rounded-full border border-orange-200/60 dark:border-slate-700 bg-white shadow-sm shrink-0 ${className}`}>
      <Image
        src={src}
        alt="Discovery Academy"
        fill
        className="object-cover"
      />
    </div>
  );
}

