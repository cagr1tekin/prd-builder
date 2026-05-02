import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TAGS = ["Auth", "Projects", "Tasks", "Notifications", "Reports"];

export function CaseSection() {
  return (
    <Card className="border-zinc-200 bg-zinc-50">
      <CardContent className="pt-5 pb-4 flex flex-col gap-3">
        <div>
          <h2 className="text-base font-semibold text-zinc-900">
            TaskFlow — Ekip Görev Yönetim Uygulaması
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            3 frontend geliştirici · Next.js App Router zorunlu · 6 ay · Ölçeklenebilir
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {TAGS.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
