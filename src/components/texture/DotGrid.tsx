export default function DotGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
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
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" style={{ fill: "var(--grid)" }} />
          </pattern>
          <radialGradient id="dot-mask" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0.2" />
          </radialGradient>
          <mask id="dot-grid-mask">
            <rect width="100%" height="100%" fill="url(#dot-mask)" />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#dot-grid)"
          mask="url(#dot-grid-mask)"
        />
      </svg>
    </div>
  );
}
