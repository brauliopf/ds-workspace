export default function WorkspaceChatsPage({
  params,
}: {
  params: { workspace_id: string };
}) {
  const { workspace_id } = params;

  return (
    <div>
      <h1>Workspace Chats</h1>
      <h2>{`${workspace_id} - Chats`}</h2>
      <p>A list of chats for the workspace.</p>
    </div>
  );
}
