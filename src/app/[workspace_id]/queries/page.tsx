export default function WorkspaceQueriesPage({
  params,
}: {
  params: { workspace_id: string };
}) {
  const { workspace_id } = params;

  return (
    <div>
      <h1>Workspace Queries</h1>
      <h2>{`${workspace_id} - Queries`}</h2>
      <p>A list of queries for the workspace.</p>
    </div>
  );
}
