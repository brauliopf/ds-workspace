export default function WorkspaceInstructionsPage({
  params,
}: {
  params: { workspace_id: string };
}) {
  const { workspace_id } = params;

  return (
    <div>
      <h1>Workspace Instructions</h1>
      <h2>{`${workspace_id} - System Instructions`}</h2>
      <p>
        A mark-down file with instructions to the AI agents workng on the
        analysis.
      </p>
    </div>
  );
}
