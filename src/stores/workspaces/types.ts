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
  instructions: string;
  queries: Query[];
  chats: Chat[];
};

export type WorkspaceState = {
  workspaces: Workspace[];
};
