import type {
  BuilderSelections,
  Stack,
  Architecture,
  StateLib,
  FetchLib,
  Styling,
  Module,
} from "./types";

const NONE = "—";

const CASE_DESCRIPTION =
  "Bir yazılım ekibinin proje yönetim sürecini dijitalleştirmek ve standart hale getirmek için kullanacağı dahili bir araç. Ekipler proje oluşturabilir, görevleri takip edebilir ve bildirim alabilir.";

const stackLabels: Record<Stack, string> = {
  nextjs: "Next.js",
  vite: "Vite + React",
  t3: "T3 Stack",
};

const stackReasons: Record<Stack, string> = {
  nextjs: "SSR ve file-based routing ile SEO ve ilk yükleme performansı kritik projeler için idealdir.",
  vite: "Saf SPA gereksinimleri için minimal bundle ve anlık HMR ile geliştirici deneyimini maksimize eder.",
  t3: "tRPC + Prisma entegrasyonu ile tip güvenli full-stack geliştirme sürecini tek çatı altında toplar.",
};

const archLabels: Record<Architecture, string> = {
  layer: "Katmanlı (Layer)",
  feature: "Özellik Bazlı (Feature)",
  domain: "Domain Driven",
};

const archReasons: Record<Architecture, string> = {
  layer: "Küçük-orta ekiplerde sorumluluk ayrımı nettir; components/hooks/services katmanları yeterli soyutlamayı sağlar.",
  feature: "Her özellik kendi bağımsız modülünde yaşadığından büyük ekiplerde paralel geliştirme sürtüşmesi azalır.",
  domain: "İş mantığı sınırları kodda doğrudan yansıtılır; servis ayrışması veya mikro-frontend geçişi kolaylaşır.",
};

const stateLabels: Record<StateLib, string> = {
  zustand: "Zustand",
  redux: "Redux Toolkit",
  jotai: "Jotai",
};

const stateReasons: Record<StateLib, string> = {
  zustand: "Boilerplate olmadan global store yönetir; React dışında da çağrılabildiği için test kolaylığı sağlar.",
  redux: "DevTools ve middleware ekosistemi geniş; büyük ekiplerde öngörülebilir state değişimleri için standarttır.",
  jotai: "Atom bazlı granüler reaktivite sunar; gereksiz re-render'ı minimize ederek performansı artırır.",
};

const fetchLabels: Record<FetchLib, string> = {
  tanstack: "TanStack Query",
  swr: "SWR",
  axios: "Axios",
};

const fetchReasons: Record<FetchLib, string> = {
  tanstack: "Cache, background refetch, pagination ve optimistic update için kapsamlı bir altyapı sunar.",
  swr: "Stale-while-revalidate stratejisi ile hafif ve sezgisel bir veri senkronizasyonu sağlar.",
  axios: "Interceptor'lar ile merkezi hata yönetimi ve token yenileme akışları kolayca kurgulanır.",
};

const stylingLabels: Record<Styling, string> = {
  tailwind: "Tailwind CSS",
  shadcn: "shadcn/ui",
  cssmodules: "CSS Modules",
};

const stylingReasons: Record<Styling, string> = {
  tailwind: "Utility-first yaklaşım ile tasarım sistemini doğrudan markup üzerinde tutar; bundle'a kullanılmayan stil girmez.",
  shadcn: "Erişilebilir Radix UI temelli bileşenler kaynak koda kopyalanır; tam özelleştirme kontrolü eldedir.",
  cssmodules: "Yerel kapsam garantisi ile stil çakışması olmadan her bileşen izole stillere sahip olur.",
};

const moduleLabels: Record<Module, string> = {
  auth: "Auth",
  projects: "Projects",
  tasks: "Tasks",
  notifications: "Notifications",
  reports: "Reports",
};

const folderTrees: Record<Architecture, string> = {
  layer: `\`\`\`
src/
├── components/        # Tüm UI bileşenleri
│   ├── ui/            # Atomik / genel bileşenler
│   └── shared/        # Özellikler arası paylaşılan bileşenler
├── hooks/             # Custom React hooks
├── services/          # API çağrıları ve iş mantığı
├── store/             # Global state (slice'lar)
├── types/             # Tip tanımları
├── utils/             # Yardımcı fonksiyonlar
└── pages/ (veya app/) # Rota giriş noktaları
\`\`\``,

  feature: `\`\`\`
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api.ts
│   │   └── types.ts
│   ├── projects/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api.ts
│   │   └── types.ts
│   └── tasks/
│       ├── components/
│       ├── hooks/
│       ├── api.ts
│       └── types.ts
├── shared/            # Özellikler arası paylaşılan kod
│   ├── components/
│   ├── hooks/
│   └── utils/
└── app/               # Rota ve layout giriş noktaları
\`\`\``,

  domain: `\`\`\`
src/
├── domains/
│   ├── auth/
│   │   ├── application/   # Use case'ler
│   │   ├── domain/        # Entity, value object, repo interface
│   │   └── infrastructure/ # API adaptörleri, store
│   ├── project/
│   │   ├── application/
│   │   ├── domain/
│   │   └── infrastructure/
│   └── task/
│       ├── application/
│       ├── domain/
│       └── infrastructure/
├── shared/
│   ├── ui/                # Paylaşılan UI bileşenleri
│   └── lib/               # Altyapı yardımcıları
└── app/                   # Rota giriş noktaları
\`\`\``,
};

function moduleSection(mod: Module): string {
  const label = moduleLabels[mod];
  return [
    `### ${label}`,
    "- [ ] User stories yazıldı",
    "- [ ] Kabul kriterleri belirlendi",
    "- [ ] Bileşen listesi çıkarıldı",
    "- [ ] API endpoint'leri listelendi",
  ].join("\n");
}

export function generateMarkdown(selections: BuilderSelections): string {
  const { stack, architecture, stateLib, fetchLib, styling, modules } = selections;

  const stackLabel = stack ? stackLabels[stack] : NONE;
  const stackReason = stack ? stackReasons[stack] : NONE;

  const archLabel = architecture ? archLabels[architecture] : NONE;
  const archReason = architecture ? archReasons[architecture] : NONE;

  const stateLabel = stateLib ? stateLabels[stateLib] : NONE;
  const stateReason = stateLib ? stateReasons[stateLib] : NONE;

  const fetchLabel = fetchLib ? fetchLabels[fetchLib] : NONE;
  const fetchReason = fetchLib ? fetchReasons[fetchLib] : NONE;

  const stylingLabel = styling ? stylingLabels[styling] : NONE;
  const stylingReason = styling ? stylingReasons[styling] : NONE;

  const folderTree = architecture ? folderTrees[architecture] : NONE;

  const moduleBlocks =
    modules && modules.length > 0
      ? modules.map(moduleSection).join("\n\n")
      : "_Henüz modül seçilmedi._";

  return `# PRD — [PROJE ADI]

## Case
${CASE_DESCRIPTION}

## Teknik Kararlar

| Karar | Seçim | Neden |
|---|---|---|
| Tech Stack | ${stackLabel} | ${stackReason} |
| Mimari | ${archLabel} | ${archReason} |
| State | ${stateLabel} | ${stateReason} |
| Data Fetching | ${fetchLabel} | ${fetchReason} |
| Styling | ${stylingLabel} | ${stylingReason} |

## Klasör Yapısı

${folderTree}

## Modüller

${moduleBlocks}

## Açık Kararlar
- [ ] ...
- [ ] ...
`;
}
