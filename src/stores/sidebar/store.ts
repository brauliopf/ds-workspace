"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Workspace {
  id: string;
  name: string;
}

type SidebarState = {
  expandedItems: Record<string, boolean>;
  workspaces: Workspace[];
  toggleItem: (itemId: string) => void;
  isExpanded: (itemId: string) => boolean;
};

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set, get) => ({
      expandedItems: {
        playground: false,
      },
      workspaces: [
        { id: "default", name: "Default Workspace" },
        { id: "analytics", name: "Analytics" },
      ],
      toggleItem: (itemId: string) =>
        set((state) => ({
          expandedItems: {
            ...state.expandedItems,
            [itemId]: !state.expandedItems[itemId],
          },
        })),
      isExpanded: (itemId: string) => get().expandedItems[itemId] || false,
    }),
    {
      name: "sidebar-store",
    }
  )
);
