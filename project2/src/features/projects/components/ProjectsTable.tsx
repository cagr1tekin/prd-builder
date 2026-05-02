"use client";

import { useState } from "react";
import { useProjectsStore } from "../hooks/useProjectsStore";
import { StatusBadge } from "./StatusBadge";
import { NewProjectModal } from "./NewProjectModal";

export function ProjectsTable() {
  const { projects, archiveProject } = useProjectsStore();
  const [tab, setTab] = useState<"all" | "archived">("all");
  const [showModal, setShowModal] = useState(false);

  const filtered = projects.filter((p) =>
    tab === "all" ? !p.archived : p.archived
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-1 bg-muted p-1 rounded-lg">
          {(["all", "archived"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 text-sm rounded-md transition-colors ${
                tab === t
                  ? "bg-background text-foreground font-medium shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "all" ? "Tüm Projeler" : "Arşiv"}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 transition-opacity"
        >
          + Yeni Proje
        </button>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground w-8">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                Proje Adı
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                Durum
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                Üyeler
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                İlerleme
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                Tarih
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-sm text-muted-foreground"
                >
                  Proje bulunamadı.
                </td>
              </tr>
            ) : (
              filtered.map((project) => (
                <tr
                  key={project.id}
                  className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                >
                  <td className="px-4 py-3">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground font-medium">
                    {project.name}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={project.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex -space-x-2">
                      {project.members.slice(0, 3).map((member) => (
                        <div
                          key={member.id}
                          title={member.name}
                          className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center"
                        >
                          <span className="text-xs text-muted-foreground">
                            {member.name[0]}
                          </span>
                        </div>
                      ))}
                      {project.members.length > 3 && (
                        <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">
                            +{project.members.length - 3}
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 max-w-32 bg-muted rounded-full h-1.5">
                        <div
                          className="bg-primary h-1.5 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-8">
                        {project.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-muted-foreground">
                        {project.dueDate}
                      </span>
                      {!project.archived && (
                        <button
                          onClick={() => archiveProject(project.id)}
                          className="text-xs text-muted-foreground hover:text-foreground transition-colors opacity-0 group-hover:opacity-100"
                        >
                          Arşivle
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && <NewProjectModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
