"use client";

export default function DotGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0.04 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="dot-grid"
            x="0"
            y="0"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            {/* fill via CSS var so it inherits the current --accent token */}
            <circle cx="1" cy="1" r="1" style={{ fill: "var(--accent)" }} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid)" />
      </svg>
    </div>
  );
}
