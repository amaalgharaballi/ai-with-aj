import BrandNavMark from "@/components/BrandNavMark";

export default function HubNav() {
  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md"
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in oklab, var(--bg) 78%, transparent)",
      }}
    >
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-center px-5 sm:px-8">
        <BrandNavMark />
      </nav>
    </header>
  );
}
