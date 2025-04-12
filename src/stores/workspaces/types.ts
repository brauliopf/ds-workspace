export type DataSource = {
  id: string;
  name: string;
  type: string;
};

export type Query = {
  id: string;
  name: string;
};

export type Chat = {
  id: string;
  name: string;
};

export type Workspace = {
  id: string;
  name: string;
  dataSources: DataSource[];
  queries: Query[];
  chats: Chat[];
};

export type WorkspaceState = {
  workspaces: Workspace[];
  setWorkspaces: (workspaces: Workspace[]) => void;
  addWorkspace: (workspace: Workspace) => void;
};
