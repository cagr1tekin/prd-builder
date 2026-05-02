export type Stack = "nextjs" | "vite" | "t3";
export type Architecture = "layer" | "feature" | "domain";
export type StateLib = "zustand" | "redux" | "jotai";
export type FetchLib = "tanstack" | "swr" | "axios";
export type Styling = "tailwind" | "shadcn" | "cssmodules";
export type Module = "auth" | "projects" | "tasks" | "notifications" | "reports";

export interface BuilderSelections {
  stack?: Stack;
  architecture?: Architecture;
  stateLib?: StateLib;
  fetchLib?: FetchLib;
  styling?: Styling;
  modules?: Module[];
}
