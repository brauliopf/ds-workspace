export default function WorkspaceDataSourcesPage({
  params,
}: {
  params: { workspace_id: string };
}) {
  const { workspace_id } = params;

  return (
    <div>
      <h1>Workspace Data Sources</h1>
      <h2>{`${workspace_id} - Data Sources`}</h2>
      <p>A list of data sources for the workspace.</p>
    </div>
  );
}
