"use server";

import { db } from "@/db";
import {
  workspacesTable,
  dataSourcesTable,
  dataSourcesWorkspacesTable,
} from "@/db/schema";

export async function createWorkspace(userId: string, formData: FormData) {
  const workplace_name = formData.get("name");
  const dataset_id = formData.get("dataset_id");

  if (typeof workplace_name !== "string" || typeof dataset_id !== "string") {
    throw new Error("Invalid form data");
  }

  const workspace = await db
    .insert(workspacesTable)
    .values({
      user_id: userId,
      name: workplace_name,
    })
    .returning({ id: workspacesTable.id });

  const data_source = await db
    .insert(dataSourcesTable)
    .values({
      dataset_id: dataset_id,
    })
    .returning({ id: dataSourcesTable.id });

  const data_source_workspace = await db
    .insert(dataSourcesWorkspacesTable)
    .values({
      data_source_id: data_source[0].id,
      workspace_id: workspace[0].id,
    });
}
