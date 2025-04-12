import { integer, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  clerk_id: varchar({ length: 255 }).notNull().unique(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const workspacesTable = pgTable("workspaces", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_id: varchar({ length: 255 }).notNull(),
  name: varchar({ length: 255 }).notNull(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});

export const dataSourcesTable = pgTable("data_sources", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  dataset_id: varchar({ length: 255 }).notNull(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});

export const dataSourcesWorkspacesTable = pgTable("data_sources_workspaces", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  data_source_id: integer()
    .notNull()
    .references(() => dataSourcesTable.id),
  workspace_id: integer()
    .notNull()
    .references(() => workspacesTable.id),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});
