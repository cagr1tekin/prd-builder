"use client";

import { useState } from "react";

type Screen = "Dashboard" | "Tasks" | "Projects" | "Notifications" | "Auth";

const NAV_ITEMS: Screen[] = ["Dashboard", "Tasks", "Projects", "Notifications"];

// ─── Primitive building blocks ───────────────────────────────────────────────

function Wire({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`border border-gray-300 rounded bg-gray-100 flex items-center px-2 py-1.5 ${className}`}
    >
      <span className="text-[10px] text-gray-400 leading-none truncate">{label}</span>
    </div>
  );
}

function WireBtn({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      className={`border border-gray-400 rounded bg-gray-200 flex items-center justify-center px-3 py-1.5 ${className}`}
    >
      <span className="text-[10px] text-gray-600 font-medium leading-none truncate">{label}</span>
    </div>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────

function Sidebar({
  active,
  onNav,
}: {
  active: Screen;
  onNav: (s: Screen) => void;
}) {
  return (
    <aside className="w-48 flex-shrink-0 border-r border-gray-300 bg-white flex flex-col">
      {/* Logo */}
      <div className="h-14 border-b border-gray-300 flex items-center px-3">
        <Wire label="logo · TaskFlow" className="w-full h-8" />
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-1 p-3 flex-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={item}
            onClick={() => onNav(item)}
            className={`w-full text-left rounded px-2 py-1.5 flex items-center gap-2 ${
              active === item
                ? "bg-gray-200 border border-gray-300"
                : "hover:bg-gray-50"
            }`}
          >
            <div className="w-3 h-3 rounded-sm border border-gray-400 bg-gray-200 flex-shrink-0" />
            <span className="text-[11px] text-gray-600 truncate">{item}</span>
          </button>
        ))}
        <div className="mt-2 border-t border-gray-200 pt-2">
          <button className="w-full text-left rounded px-2 py-1.5 flex items-center gap-2 hover:bg-gray-50">
            <div className="w-3 h-3 rounded-sm border border-gray-400 bg-gray-200 flex-shrink-0" />
            <span className="text-[11px] text-gray-500">Ayarlar</span>
          </button>
        </div>
      </nav>

      {/* User profile */}
      <div className="border-t border-gray-300 p-3">
        <div className="flex items-center gap-2 px-1">
          <div className="w-6 h-6 rounded-full border border-gray-400 bg-gray-200 flex-shrink-0" />
          <div className="flex flex-col gap-0.5 min-w-0">
            <div className="h-1.5 w-16 rounded bg-gray-300" />
            <div className="h-1.5 w-10 rounded bg-gray-200" />
          </div>
        </div>
      </div>
    </aside>
  );
}

// ─── Header ──────────────────────────────────────────────────────────────────

function Header({ title }: { title: string }) {
  return (
    <header className="h-14 flex-shrink-0 border-b border-gray-300 bg-white flex items-center px-5 gap-4">
      <span className="text-xs font-semibold text-gray-700 flex-shrink-0">{title}</span>
      <div className="flex-1" />
      <Wire label="ara..." className="w-40 h-7" />
      <Wire label="bildirim" className="w-16 h-7" />
      <div className="w-7 h-7 rounded-full border border-gray-400 bg-gray-200 flex-shrink-0" />
    </header>
  );
}

// ─── Screen contents ─────────────────────────────────────────────────────────

function DashboardContent() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-4 gap-3">
        <Wire label="stat · Toplam Görev" className="h-16 flex-col items-start" />
        <Wire label="stat · Tamamlanan" className="h-16 flex-col items-start" />
        <Wire label="stat · Aktif Proje" className="h-16 flex-col items-start" />
        <Wire label="stat · Ekip Üyesi" className="h-16 flex-col items-start" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2 border border-gray-300 rounded bg-gray-100 p-3 flex flex-col gap-2">
          <span className="text-[10px] text-gray-400">panel · Son Aktiviteler</span>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-2 border border-gray-200 rounded bg-white px-2 py-1.5">
              <div className="w-4 h-4 rounded-full border border-gray-300 bg-gray-200 flex-shrink-0" />
              <div className="h-1.5 rounded bg-gray-300 flex-1" />
              <div className="h-1.5 w-10 rounded bg-gray-200" />
            </div>
          ))}
        </div>
        <div className="border border-gray-300 rounded bg-gray-100 p-3 flex flex-col gap-2">
          <span className="text-[10px] text-gray-400">panel · Deadline'lar</span>
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-gray-200 rounded bg-white px-2 py-1.5 flex flex-col gap-1">
              <div className="h-1.5 w-full rounded bg-gray-300" />
              <div className="h-1.5 w-14 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TasksContent() {
  const [innerTab, setInnerTab] = useState<"Board" | "Liste" | "Takvim">("Board");
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-0 border border-gray-300 rounded overflow-hidden">
          {(["Board", "Liste", "Takvim"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setInnerTab(t)}
              className={`px-3 py-1 text-[11px] border-r border-gray-300 last:border-r-0 ${
                innerTab === t ? "bg-gray-200 text-gray-800 font-medium" : "bg-white text-gray-500"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <WireBtn label="+ Yeni Görev" className="h-7" />
      </div>
      <div className="grid grid-cols-4 gap-3">
        {(["TODO", "IN PROGRESS", "REVIEW", "DONE"] as const).map((col, ci) => (
          <div key={col} className="flex flex-col gap-2 border border-gray-300 rounded bg-gray-50 p-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-semibold text-gray-500 uppercase">{col}</span>
              <div className="w-4 h-3 rounded bg-gray-200" />
            </div>
            {[1, 2, ci < 3 ? 3 : 0].filter(Boolean).map((k) => (
              <div key={k} className="border border-gray-300 rounded bg-white p-2 flex flex-col gap-1.5">
                <div className="h-1.5 w-full rounded bg-gray-300" />
                <div className="h-1.5 w-2/3 rounded bg-gray-200" />
                <div className="flex gap-1 mt-1">
                  <div className="w-3 h-3 rounded-full border border-gray-300 bg-gray-200" />
                  <div className="h-1.5 w-8 rounded bg-gray-200 my-auto" />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsContent() {
  const [innerTab, setInnerTab] = useState<"Tüm Projeler" | "Arşiv">("Tüm Projeler");
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-0 border border-gray-300 rounded overflow-hidden">
          {(["Tüm Projeler", "Arşiv"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setInnerTab(t)}
              className={`px-3 py-1 text-[11px] border-r border-gray-300 last:border-r-0 ${
                innerTab === t ? "bg-gray-200 text-gray-800 font-medium" : "bg-white text-gray-500"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <WireBtn label="+ Yeni Proje" className="h-7" />
      </div>
      {/* Table */}
      <div className="border border-gray-300 rounded overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-12 gap-0 bg-gray-200 border-b border-gray-300 px-3 py-2">
          {["Proje Adı", "Durum", "Üyeler", "İlerleme", "Tarih"].map((h) => (
            <div key={h} className={`${h === "Proje Adı" ? "col-span-4" : "col-span-2"} text-[10px] text-gray-500 font-medium`}>
              {h}
            </div>
          ))}
        </div>
        {/* Rows */}
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="grid grid-cols-12 gap-0 border-b border-gray-200 last:border-b-0 bg-white px-3 py-2.5 items-center hover:bg-gray-50">
            <div className="col-span-4 flex items-center gap-2">
              <div className="w-5 h-5 rounded border border-gray-300 bg-gray-100 flex-shrink-0" />
              <div className="h-1.5 w-24 rounded bg-gray-300" />
            </div>
            <div className="col-span-2">
              <div className="h-4 w-14 rounded-full border border-gray-300 bg-gray-100" />
            </div>
            <div className="col-span-2 flex gap-0.5">
              {[1, 2, 3].map((k) => (
                <div key={k} className="w-4 h-4 rounded-full border border-gray-300 bg-gray-200 -ml-1 first:ml-0" />
              ))}
            </div>
            <div className="col-span-2">
              <div className="h-1.5 w-full rounded-full bg-gray-200">
                <div className={`h-1.5 rounded-full bg-gray-400 w-${["1/3", "2/3", "1/2", "3/4"][i - 1]}`} />
              </div>
            </div>
            <div className="col-span-2">
              <div className="h-1.5 w-14 rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NotificationsContent() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-0 border border-gray-300 rounded overflow-hidden">
          {["Tümü", "Okunmamış", "Bahsedenler"].map((t, i) => (
            <button
              key={t}
              className={`px-3 py-1 text-[11px] border-r border-gray-300 last:border-r-0 ${
                i === 0 ? "bg-gray-200 text-gray-800 font-medium" : "bg-white text-gray-500"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <WireBtn label="Tümünü Okundu İşaretle" className="h-7" />
      </div>
      <div className="border border-gray-300 rounded overflow-hidden flex flex-col">
        {[
          { unread: true, label: "bildirim satırı · okunmamış · görev atandı" },
          { unread: true, label: "bildirim satırı · okunmamış · yorum eklendi" },
          { unread: true, label: "bildirim satırı · okunmamış · deadline yaklaşıyor" },
          { unread: false, label: "bildirim satırı · proje güncellendi" },
          { unread: false, label: "bildirim satırı · rapor hazır" },
        ].map((n, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 px-4 py-3 border-b border-gray-200 last:border-b-0 ${
              n.unread ? "bg-gray-50 border-l-4 border-l-gray-500" : "bg-white"
            }`}
          >
            <div className="w-7 h-7 rounded-full border border-gray-300 bg-gray-200 flex-shrink-0" />
            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <div className="h-1.5 w-48 rounded bg-gray-300" />
              <div className="h-1.5 w-24 rounded bg-gray-200" />
            </div>
            <div className="h-1.5 w-10 rounded bg-gray-200 flex-shrink-0" />
            {n.unread && <div className="w-2 h-2 rounded-full bg-gray-500 flex-shrink-0" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function AuthContent() {
  return (
    <div className="flex items-center justify-center h-full bg-gray-100">
      <div className="flex flex-col gap-3 border border-gray-300 rounded-lg bg-white p-7 w-72 shadow-sm">
        <div className="flex justify-center mb-1">
          <div className="w-10 h-10 rounded-lg border border-gray-300 bg-gray-200" />
        </div>
        <Wire label="başlık · Hesabına giriş yap" className="h-8 justify-center" />
        <Wire label="input · E-posta adresi" className="h-9" />
        <Wire label="input · Şifre" className="h-9" />
        <WireBtn label="Giriş Yap" className="h-9" />
        <div className="flex items-center gap-2 my-1">
          <div className="flex-1 border-t border-gray-300" />
          <span className="text-[10px] text-gray-400">veya</span>
          <div className="flex-1 border-t border-gray-300" />
        </div>
        <Wire label="buton · Google ile Giriş" className="h-9 justify-center" />
        <div className="flex justify-center mt-1">
          <div className="h-1.5 w-32 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

// ─── App Shell ────────────────────────────────────────────────────────────────

const SCREEN_TITLES: Record<Screen, string> = {
  Dashboard: "Dashboard",
  Tasks: "Görevler",
  Projects: "Projeler",
  Notifications: "Bildirimler",
  Auth: "Giriş",
};

function AppShell({
  active,
  onNav,
  children,
}: {
  active: Screen;
  onNav: (s: Screen) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex aspect-video w-full border border-gray-300 rounded-lg overflow-hidden bg-white">
      <Sidebar active={active} onNav={onNav} />
      <div className="flex flex-col flex-1 min-w-0">
        <Header title={SCREEN_TITLES[active]} />
        <main className="flex-1 overflow-y-auto p-5 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}

function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="aspect-video w-full border border-gray-300 rounded-lg overflow-hidden bg-gray-100">
      {children}
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

const TABS: Screen[] = ["Dashboard", "Tasks", "Projects", "Notifications", "Auth"];

export function WireframeSection() {
  const [active, setActive] = useState<Screen>("Dashboard");

  const viewport =
    active === "Auth" ? (
      <AuthShell>
        <AuthContent />
      </AuthShell>
    ) : (
      <AppShell active={active} onNav={setActive}>
        {active === "Dashboard" && <DashboardContent />}
        {active === "Tasks" && <TasksContent />}
        {active === "Projects" && <ProjectsContent />}
        {active === "Notifications" && <NotificationsContent />}
      </AppShell>
    );

  return (
    <section className="mt-12 border-t border-gray-200 pt-8">
      <h2 className="mb-1 text-base font-semibold text-zinc-800">Wireframe</h2>
      <p className="mb-5 text-xs text-gray-500">TaskFlow · Ekran Layout Taslakları</p>

      {/* Tab bar */}
      <div className="flex gap-1 mb-5">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-4 py-1.5 text-xs rounded-md transition-colors ${
              active === tab
                ? "bg-zinc-800 text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Viewport */}
      {viewport}
    </section>
  );
}
