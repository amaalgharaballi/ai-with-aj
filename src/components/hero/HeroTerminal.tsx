"use client";

import { useEffect, useMemo, useState } from "react";
import { SITE } from "@/lib/site";

type Phase = "typing" | "generating" | "output";

const PROMPT = {
  cmd: SITE.copy.heroTerminal.command,
  tool: SITE.copy.heroTerminal.tool,
  arg: SITE.copy.heroTerminal.arg,
};

const DURATIONS: Record<Phase, number> = {
  typing: 1800,
  generating: 1400,
  output: 4200,
};

const SPINNER = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

export default function HeroTerminal() {
  const [phase, setPhase] = useState<Phase>("typing");
  const [typed, setTyped] = useState("");
  const [spin, setSpin] = useState(0);
  const [reduced, setReduced] = useState(false);

  const fullLine = useMemo(
    () => `${PROMPT.cmd} --with ${PROMPT.tool} ${PROMPT.arg}`,
    []
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const listener = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    if (reduced) {
      setPhase("output");
      setTyped(fullLine);
      return;
    }

    let raf: number | undefined;
    let timer: number | undefined;

    if (phase === "typing") {
      setTyped("");
      const start = performance.now();
      const step = () => {
        const elapsed = performance.now() - start;
        const chars = Math.min(
          fullLine.length,
          Math.round((elapsed / DURATIONS.typing) * fullLine.length)
        );
        setTyped(fullLine.slice(0, chars));
        if (chars < fullLine.length) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
      timer = window.setTimeout(() => setPhase("generating"), DURATIONS.typing);
    }

    if (phase === "generating") {
      setTyped(fullLine);
      timer = window.setTimeout(() => setPhase("output"), DURATIONS.generating);
    }

    if (phase === "output") {
      timer = window.setTimeout(() => setPhase("typing"), DURATIONS.output);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (timer) clearTimeout(timer);
    };
  }, [phase, fullLine, reduced]);

  useEffect(() => {
    if (phase !== "generating" || reduced) return;
    const id = window.setInterval(() => {
      setSpin((s) => (s + 1) % SPINNER.length);
    }, 80);
    return () => window.clearInterval(id);
  }, [phase, reduced]);

  return (
    <div
      className="relative w-full max-w-[460px] border backdrop-blur-sm"
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in oklab, var(--bg-elevated) 78%, transparent)",
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center justify-between border-b px-4 py-2 font-mono text-[10px] tracking-[0.22em] uppercase"
        style={{
          borderColor: "var(--border)",
          color: "var(--fg-muted)",
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--accent)" }}
          />
          <span dir="ltr">{SITE.copy.heroTerminal.sessionLabel}</span>
        </div>
        <span dir="ltr" className="opacity-60">
          {SITE.copy.heroTerminal.pathLabel}
        </span>
      </div>

      {/* Body */}
      <div className="px-4 py-4 font-mono text-[12px] leading-relaxed" dir="ltr">
        {/* Prompt line */}
        <div className="flex gap-2" style={{ color: "var(--fg)" }}>
          <span style={{ color: "var(--accent)" }}>$</span>
          <span className="break-words">
            {typed}
            {phase === "typing" && (
              <span
                className="inline-block align-[-2px] ml-[1px] w-[7px] h-[14px]"
                style={{
                  background: "var(--accent)",
                  animation: "blink 0.9s steps(2, start) infinite",
                }}
              />
            )}
          </span>
        </div>

        {/* Status row — single line, no progress bar */}
        <div
          className="mt-2 flex items-center gap-2 text-[11px] transition-opacity"
          style={{
            color: "var(--fg-muted)",
            opacity: phase === "typing" ? 0 : 1,
          }}
        >
          <span style={{ color: "var(--accent)", width: 12 }}>
            {phase === "generating" ? SPINNER[spin] : "✓"}
          </span>
          <span className="uppercase tracking-wider">
            {phase === "generating"
              ? SITE.copy.heroTerminal.statusGeneratingAr
              : SITE.copy.heroTerminal.statusReadyAr}
          </span>
        </div>

        {/* Output frame — course poster */}
        <div
          className="mt-3 relative aspect-video w-full overflow-hidden border"
          style={{
            borderColor: "var(--border)",
            background: "var(--bg)",
          }}
        >
          {/* The image itself */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-poster.jpg"
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover object-center transition-all duration-700"
            style={{
              opacity: phase === "output" ? 1 : 0.2,
              transform: phase === "output" ? "scale(1)" : "scale(1.08)",
              filter: phase === "output" ? "none" : "blur(10px)",
            }}
          />

          {/* Scanlines */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "repeating-linear-gradient(0deg, rgba(255,255,255,0.028) 0px, rgba(255,255,255,0.028) 1px, transparent 1px, transparent 3px)",
            }}
          />

          {/* Bracket marks */}
          <span
            className="absolute top-1.5 left-1.5 font-mono text-[9px] tracking-widest"
            style={{ color: "var(--fg-muted)" }}
          >
            {SITE.copy.heroTerminal.outputLabel}
          </span>
          <span
            className="absolute bottom-1.5 right-1.5 font-mono text-[9px] tracking-widest"
            style={{ color: "var(--fg-muted)" }}
          >
            {PROMPT.tool}
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
