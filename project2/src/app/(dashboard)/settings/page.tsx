import { Header } from "@/shared/components/Header";

export default function SettingsPage() {
  return (
    <>
      <Header title="Ayarlar" />
      <div className="p-6">
        <div className="bg-card border border-border rounded-lg p-8 flex items-center justify-center min-h-64">
          <p className="text-sm text-muted-foreground">
            Ayarlar sayfası yakında
          </p>
        </div>
      </div>
    </>
  );
}
