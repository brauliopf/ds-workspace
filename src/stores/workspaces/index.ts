"use client";

import { create } from "zustand";
import type { WorkspaceState } from "./types";

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  workspaces: [{ id: "default", name: "Default" }],
}));
