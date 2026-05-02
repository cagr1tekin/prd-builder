"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface OutputSectionProps {
  markdown: string;
}

export function OutputSection({ markdown }: OutputSectionProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-700 uppercase tracking-wide">
          Oluşturulan PRD Dosyası
        </h3>
        <Button
          size="sm"
          variant={copied ? "secondary" : "outline"}
          onClick={handleCopy}
          className="w-28"
        >
          {copied ? "Kopyalandı" : "Kopyala"}
        </Button>
      </div>
      <pre className="h-96 overflow-y-auto rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-xs text-zinc-800 whitespace-pre-wrap font-mono">
        {markdown || "Seçimleriniz burada görünecek…"}
      </pre>
    </div>
  );
}
