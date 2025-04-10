export type SidebarState = {
  expandedItems: Record<string, boolean>;
  toggleItem: (itemId: string) => void;
  isExpanded: (itemId: string) => boolean;
};
