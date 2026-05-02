import { Header } from "@/shared/components/Header";
import { StatCard } from "@/shared/components/StatCard";

const recentActivities = [
  { id: 1, text: "Ali, Mobil Uygulama Yenileme projesine yorum ekledi", time: "2 saat önce" },
  { id: 2, text: "Dashboard bileşenleri görevi IN PROGRESS'e taşındı", time: "4 saat önce" },
  { id: 3, text: "Ayşe, API Entegrasyonu projesine katıldı", time: "5 saat önce" },
  { id: 4, text: "Veritabanı Optimizasyonu görevi tamamlandı", time: "1 gün önce" },
];

const deadlines = [
  { id: 1, title: "API Entegrasyonu", date: "30 May 2026", daysLeft: 29 },
  { id: 2, title: "Mobil Uygulama Yenileme", date: "15 Haz 2026", daysLeft: 45 },
  { id: 3, title: "Dashboard Tasarımı", date: "1 Tem 2026", daysLeft: 61 },
];

export default function DashboardPage() {
  return (
    <>
      <Header title="Dashboard" />

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-4 gap-4">
          <StatCard label="stat · Toplam Görev" value={10} />
          <StatCard label="stat · Tamamlanan" value={1} />
          <StatCard label="stat · Aktif Proje" value={2} />
          <StatCard label="stat · Ekip Üyesi" value={5} />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 bg-card border border-border rounded-lg p-5">
            <h2 className="text-sm font-semibold text-foreground mb-4">
              panel · Son Aktiviteler
            </h2>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-muted flex-shrink-0 border border-border" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">
                      {activity.text}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground flex-shrink-0">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-5">
            <h2 className="text-sm font-semibold text-foreground mb-4">
              panel · Deadline&apos;lar
            </h2>
            <div className="space-y-4">
              {deadlines.map((deadline) => (
                <div key={deadline.id} className="space-y-1.5">
                  <p className="text-sm text-foreground">{deadline.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {deadline.date}
                  </p>
                  <div className="w-full bg-muted rounded-full h-1">
                    <div
                      className="bg-primary h-1 rounded-full"
                      style={{
                        width: `${Math.max(5, 100 - (deadline.daysLeft / 90) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
