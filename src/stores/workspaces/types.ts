export type Workspace = {
  id: string;
  name: string;
};

// export type SidebarState = {
//   expandedItems: Record<string, boolean>;
//   workspaces: Workspace[];
//   toggleItem: (itemId: string) => void;
//   isExpanded: (itemId: string) => boolean;
// };

export type WorkspaceState = {
  workspaces: Workspace[];
};
