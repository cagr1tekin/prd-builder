export function UIKitSection() {
  return (
    <section>
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-violet-700 to-indigo-800 p-8">
        {/* Decorative blobs */}
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5" />
        <div className="absolute bottom-0 left-1/3 w-64 h-32 rounded-full bg-indigo-500/20 blur-2xl" />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          {/* Left: text */}
          <div className="flex flex-col gap-4 max-w-md">
            <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-300" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-violet-200">
                UI Kit
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-white leading-tight">
                Tema Seç
                <span className="block text-violet-300">tweakcn.com</span>
              </h2>
              <p className="mt-2 text-sm text-violet-200/80 leading-relaxed">
                Projen için bir tema seç, özelleştir ve{" "}
                <code className="rounded bg-white/10 px-1.5 py-0.5 text-violet-200 font-mono text-xs">
                  globals.css
                </code>{" "}
                dosyana yapıştır. Renk, radius, shadow — tek seferde.
              </p>
            </div>

            {/* Steps */}
            <ol className="flex flex-col gap-2.5">
              {[
                "tweakcn.com adresine git",
                "Beğendiğin temayı seç ve özelleştir",
                "'Copy code' butonuna bas → globals.css'e yapıştır",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-[10px] font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-sm text-violet-100 leading-tight pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Right: CTA card */}
          <div className="flex-shrink-0 flex flex-col items-center justify-center rounded-xl border border-white/20 bg-white/10 p-6 gap-3 min-w-[180px]">
            <div className="w-10 h-10 rounded-lg bg-white/20 border border-white/30 flex items-center justify-center">
              <span className="text-white text-lg font-black leading-none">T</span>
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-white">tweakcn.com</p>
              <p className="text-[10px] text-violet-300 mt-0.5">shadcn/ui tema editörü</p>
            </div>
            <div className="w-full rounded-lg border border-white/30 bg-white/20 py-2 text-center">
              <span className="text-xs font-semibold text-white">Siteye Git →</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
