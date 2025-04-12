"use client";

import { create } from "zustand";
import type { WorkspaceState, Workspace } from "./types";

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  workspaces: [
    {
      id: "default",
      name: "Default",
      dataSources: [],
      queries: [],
      chats: [],
    },
  ],
  setWorkspaces: (workspaces: Workspace[]) => set({ workspaces }),
  addWorkspace: (workspace: Workspace) =>
    set((state) => ({ workspaces: [...state.workspaces, workspace] })),
}));
