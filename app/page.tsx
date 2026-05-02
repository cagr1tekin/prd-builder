"use client";

import { useState, useMemo } from "react";
import { CaseSection } from "@/components/CaseSection";
import { WireframeSection } from "@/components/WireframeSection";
import { UIKitSection } from "@/components/UIKitSection";
import { SelectSection } from "@/components/SelectSection";
import { MultiSection } from "@/components/MultiSection";
import { OutputSection } from "@/components/OutputSection";
import { generateMarkdown } from "@/lib/generate";
import type {
  BuilderSelections,
  Stack,
  Architecture,
  StateLib,
  FetchLib,
  Styling,
  Module,
} from "@/lib/types";

const STACK_OPTIONS: { value: Stack; label: string; sub: string }[] = [
  { value: "nextjs", label: "Next.js", sub: "App Router · SSR · Vercel" },
  { value: "vite", label: "Vite + React", sub: "SPA · Hızlı HMR · Minimal" },
  { value: "t3", label: "T3 Stack", sub: "tRPC · Prisma · Full-stack" },
];

const ARCH_OPTIONS: { value: Architecture; label: string; sub: string }[] = [
  { value: "layer", label: "Katmanlı", sub: "components / hooks / services" },
  { value: "feature", label: "Özellik Bazlı", sub: "Her özellik kendi modülünde" },
  { value: "domain", label: "Domain Driven", sub: "application / domain / infra" },
];

const STATE_OPTIONS: { value: StateLib; label: string; sub: string }[] = [
  { value: "zustand", label: "Zustand", sub: "Basit · Boilerplate yok" },
  { value: "redux", label: "Redux Toolkit", sub: "DevTools · Büyük ekip" },
  { value: "jotai", label: "Jotai", sub: "Atom bazlı · Granüler" },
];

const FETCH_OPTIONS: { value: FetchLib; label: string; sub: string }[] = [
  { value: "tanstack", label: "TanStack Query", sub: "Cache · Optimistic update" },
  { value: "swr", label: "SWR", sub: "Stale-while-revalidate · Hafif" },
  { value: "axios", label: "Axios", sub: "Interceptor · Token yenileme" },
];

const STYLING_OPTIONS: { value: Styling; label: string; sub: string }[] = [
  { value: "tailwind", label: "Tailwind CSS", sub: "Utility-first · Tree-shake" },
  { value: "shadcn", label: "shadcn/ui", sub: "Radix · Erişilebilir · Özelleştirilebilir" },
  { value: "cssmodules", label: "CSS Modules", sub: "Yerel kapsam · Çakışma yok" },
];

const MODULE_OPTIONS: { value: Module; label: string; sub: string }[] = [
  { value: "auth", label: "Auth", sub: "Giriş · Kayıt · Oturum" },
  { value: "projects", label: "Projects", sub: "Proje CRUD · Üye yönetimi" },
  { value: "tasks", label: "Tasks", sub: "Görev takibi · Durum akışı" },
  { value: "notifications", label: "Notifications", sub: "Bildirim merkezi · Push" },
  { value: "reports", label: "Reports", sub: "Grafik · CSV export" },
];

const STEPS = [
  { label: "Proje", key: null },
  { label: "Stack", key: "stack" },
  { label: "Mimari", key: "architecture" },
  { label: "State", key: "stateLib" },
  { label: "Fetching", key: "fetchLib" },
  { label: "Styling", key: "styling" },
  { label: "Modüller", key: "modules" },
] as const;

function StepNav({ selections }: { selections: BuilderSelections }) {
  return (
    <nav className="flex flex-col items-center gap-1.5 pt-1">
      {STEPS.map((step, i) => {
        const done =
          step.key === null
            ? true
            : step.key === "modules"
            ? (selections.modules ?? []).length > 0
            : !!selections[step.key as keyof BuilderSelections];
        return (
          <div
            key={step.label}
            title={step.label}
            className={[
              "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors cursor-default",
              done
                ? "bg-violet-600 text-white"
                : "bg-zinc-100 text-zinc-400 border border-zinc-200",
            ].join(" ")}
          >
            {done ? "✓" : i + 1}
          </div>
        );
      })}
    </nav>
  );
}

const EMPTY: BuilderSelections = {};

function isEmpty(s: BuilderSelections): boolean {
  return (
    !s.stack &&
    !s.architecture &&
    !s.stateLib &&
    !s.fetchLib &&
    !s.styling &&
    (!s.modules || s.modules.length === 0)
  );
}

export default function Home() {
  const [selections, setSelections] = useState<BuilderSelections>(EMPTY);

  function set<K extends keyof BuilderSelections>(key: K, value: BuilderSelections[K]) {
    setSelections((prev) => ({ ...prev, [key]: value }));
  }

  function toggleModule(val: Module) {
    setSelections((prev) => {
      const current = prev.modules ?? [];
      const next = current.includes(val)
        ? current.filter((m) => m !== val)
        : [...current, val];
      return { ...prev, modules: next };
    });
  }

  const output = useMemo(
    () => (isEmpty(selections) ? "" : generateMarkdown(selections)),
    [selections],
  );

  return (
    <div className="min-h-screen bg-[#f7f7f5]">

      {/* ── Navbar — full bleed, content aligns to 1-10-1 ── */}
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto grid grid-cols-12 h-14">
          <div className="col-span-1" />
          <div className="col-span-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm font-extrabold tracking-tight text-zinc-900">PRD Builder</span>
              <span className="hidden sm:inline-flex items-center rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-semibold text-violet-700 uppercase tracking-wider">
                TaskFlow
              </span>
            </div>
            <span className="text-xs text-zinc-400">v1.0</span>
          </div>
          <div className="col-span-1" />
        </div>
      </header>

      {/* ── Tek grid — hero + content hepsi aynı 12-kolon omurgasında ── */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-x-6">

        {/* ── Hero satırı: 1 | 10 | 1 ── */}
        <div className="col-span-1" />
        <div className="col-span-10 pt-12 pb-10">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
            <span className="text-[11px] font-semibold text-violet-600 uppercase tracking-widest">
              Proje Dökümanı Oluşturucu
            </span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 leading-tight">
            TaskFlow PRD&apos;ini<br />
            <span className="text-violet-600">saniyeler içinde</span> oluştur
          </h1>
          <p className="mt-3 text-sm text-zinc-500 max-w-sm leading-relaxed">
            Stack seç, mimariyi belirle, modülleri işaretle — hazır PRD belgeni kopyala.
          </p>
        </div>
        <div className="col-span-1" />

        {/* ── İçerik satırı: 1 (step nav) | 10 (main) | 1 (gutter) ── */}
        <aside className="col-span-1 sticky top-14 self-start pb-24">
          <StepNav selections={selections} />
        </aside>

        <div className="col-span-10 flex flex-col gap-10 pb-24">

          {/* Builder: Form + Output */}
          <div className="flex gap-6 items-start">
            <div className="flex flex-col gap-6 flex-1 min-w-0">
              <CaseSection />
              <SelectSection
                title="Tech Stack"
                options={STACK_OPTIONS}
                selected={selections.stack ?? null}
                onSelect={(val) => set("stack", val as Stack)}
              />
              <SelectSection
                title="Mimari Pattern"
                options={ARCH_OPTIONS}
                selected={selections.architecture ?? null}
                onSelect={(val) => set("architecture", val as Architecture)}
              />
              <SelectSection
                title="State Management"
                options={STATE_OPTIONS}
                selected={selections.stateLib ?? null}
                onSelect={(val) => set("stateLib", val as StateLib)}
              />
              <SelectSection
                title="Data Fetching"
                options={FETCH_OPTIONS}
                selected={selections.fetchLib ?? null}
                onSelect={(val) => set("fetchLib", val as FetchLib)}
              />
              <SelectSection
                title="Styling"
                options={STYLING_OPTIONS}
                selected={selections.styling ?? null}
                onSelect={(val) => set("styling", val as Styling)}
              />
              <MultiSection
                title="Modüller"
                options={MODULE_OPTIONS}
                selected={selections.modules ?? []}
                onToggle={(val) => toggleModule(val as Module)}
              />
            </div>

            {/* Output — sticky */}
            <div className="sticky top-14 self-start w-72 flex-shrink-0">
              <OutputSection
                markdown={output || "Seçimlerini yap, PRD oluşturulsun."}
              />
            </div>
          </div>

          {/* Wireframe — aspect-video korur 16:9 oranını */}
          <WireframeSection />

          {/* UI Kit */}
          <UIKitSection />
        </div>

        <div className="col-span-1" />
      </div>
    </div>
  );
}
