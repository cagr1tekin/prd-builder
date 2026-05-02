const technicalDecisions = [
  {
    label: "Tech Stack",
    value: "Next.js",
    reason:
      "SSR ve file-based routing ile SEO ve ilk yükleme performansı kritik projeler için idealdir.",
  },
  {
    label: "Mimari",
    value: "Özellik Bazlı (Feature)",
    reason:
      "Her özellik kendi bağımsız modülünde yaşadığından büyük ekiplerde paralel geliştirme sürtüşmesi azalır.",
  },
  {
    label: "State",
    value: "Zustand",
    reason:
      "Boilerplate olmadan global store yönetir; React dışında da çağrılabildiği için test kolaylığı sağlar.",
  },
  {
    label: "Data Fetching",
    value: "Axios",
    reason:
      "Interceptor'lar ile merkezi hata yönetimi ve token yenileme akışları kolayca kurgulanır.",
  },
  {
    label: "Styling",
    value: "Tailwind CSS",
    reason:
      "Utility-first yaklaşım ile tasarım sistemini doğrudan markup üzerinde tutar; bundle'a kullanılmayan stil girmez.",
  },
] as const;

const modules = [
  {
    name: "Auth",
    items: [
      "User stories yazıldı",
      "Kabul kriterleri belirlendi",
      "Bileşen listesi çıkarıldı",
      "API endpoint'leri listelendi",
    ],
  },
  {
    name: "Projects",
    items: [
      "User stories yazıldı",
      "Kabul kriterleri belirlendi",
      "Bileşen listesi çıkarıldı",
      "API endpoint'leri listelendi",
    ],
  },
  {
    name: "Tasks",
    items: [
      "User stories yazıldı",
      "Kabul kriterleri belirlendi",
      "Bileşen listesi çıkarıldı",
      "API endpoint'leri listelendi",
    ],
  },
  {
    name: "Reports",
    items: [
      "User stories yazıldı",
      "Kabul kriterleri belirlendi",
      "Bileşen listesi çıkarıldı",
      "API endpoint'leri listelendi",
    ],
  },
  {
    name: "Notifications",
    items: [
      "User stories yazıldı",
      "Kabul kriterleri belirlendi",
      "Bileşen listesi çıkarıldı",
      "API endpoint'leri listelendi",
    ],
  },
] as const;

const folderTree = `src/
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
├── shared/
│   ├── components/
│   ├── hooks/
│   └── utils/
└── app/
`;

const openDecisions = [
  "Kimlik doğrulama akışı first-party mi yoksa harici SSO ile mi çözülecek?",
  "Bildirimler için websocket mi yoksa polling mi kullanılacak?",
  "Raporlar CSV dışında PDF export da üretecek mi?",
] as const;

export default function Page() {
  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand-card">
          <div className="brand-mark" />
          <div>
            <p className="eyebrow">Project 1</p>
            <h1>TaskFlow</h1>
          </div>
        </div>

        <nav className="side-nav" aria-label="Uygulama navigasyonu">
          <a className="nav-item active" href="#overview">
            Dashboard
          </a>
          <a className="nav-item" href="#modules">
            Tasks
          </a>
          <a className="nav-item" href="#decisions">
            Projects
          </a>
          <a className="nav-item" href="#open-decisions">
            Notifications
          </a>
          <a className="nav-item" href="#structure">
            Ayarlar
          </a>
        </nav>

        <div className="sidebar-footer">
          <div className="avatar">TF</div>
          <div>
            <p className="footer-title">Product workspace</p>
            <p className="footer-subtitle">PRD draft iskeleti</p>
          </div>
        </div>
      </aside>

      <section className="content">
        <header className="topbar" id="overview">
          <div>
            <p className="eyebrow">Dahili araç</p>
            <h2>PRD — Project 1</h2>
          </div>

          <div className="toolbar">
            <div className="search">ara...</div>
            <button type="button" className="ghost-button">
              bildirim
            </button>
            <div className="profile-dot" aria-hidden="true" />
          </div>
        </header>

        <section className="hero-card">
          <div className="hero-copy">
            <span className="badge">Internal product • task management</span>
            <h3>Bir yazılım ekibinin proje yönetim sürecini dijitalleştiren standart PRD.</h3>
            <p>
              Ekipler proje oluşturabilir, görevleri takip edebilir ve bildirim alabilir.
              Bu sayfa, kararları tek yerde toplayan başlangıç dokümanı olarak tasarlandı.
            </p>
          </div>

          <div className="hero-stats">
            <div className="stat-card">
              <span className="stat-label">Modüller</span>
              <strong>5</strong>
            </div>
            <div className="stat-card">
              <span className="stat-label">Açık karar</span>
              <strong>3</strong>
            </div>
            <div className="stat-card">
              <span className="stat-label">Durum</span>
              <strong>Draft</strong>
            </div>
          </div>
        </section>

        <section className="panel-grid" id="decisions">
          <article className="panel wide-panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Teknik kararlar</p>
                <h4>Stack ve mimari özeti</h4>
              </div>
            </div>

            <div className="decision-table" role="table" aria-label="Teknik kararlar">
              {technicalDecisions.map((decision) => (
                <div className="decision-row" role="row" key={decision.label}>
                  <div className="decision-label" role="cell">
                    {decision.label}
                  </div>
                  <div className="decision-value" role="cell">
                    {decision.value}
                  </div>
                  <div className="decision-reason" role="cell">
                    {decision.reason}
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="panel side-panel" id="open-decisions">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Açık kararlar</p>
                <h4>Netleşmesi gereken noktalar</h4>
              </div>
            </div>

            <ul className="list-stack">
              {openDecisions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="panel-grid modules-grid" id="modules">
          <article className="panel wide-panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Modüller</p>
                <h4>Kapsam kontrol listesi</h4>
              </div>
              <span className="panel-chip">PRD readiness</span>
            </div>

            <div className="module-grid">
              {modules.map((module) => (
                <div className="module-card" key={module.name}>
                  <div className="module-head">
                    <h5>{module.name}</h5>
                    <span className="module-dot" aria-hidden="true" />
                  </div>
                  <ul className="checklist">
                    {module.items.map((item) => (
                      <li key={item}>
                        <span className="checkbox" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>

          <article className="panel side-panel" id="structure">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Klasör yapısı</p>
                <h4>Feature bazlı iskelet</h4>
              </div>
            </div>

            <pre className="code-block">{folderTree}</pre>
          </article>
        </section>
      </section>
    </main>
  );
}