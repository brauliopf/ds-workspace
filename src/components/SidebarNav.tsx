"use client";

import { useUser } from "@clerk/nextjs";
import {
  User,
  FileText,
  BellRing,
  ChevronRight,
  ChevronDown,
  Database,
  MessagesSquare,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { useWorkspaceStore } from "@/stores/workspaces";
import { createWorkspace } from "@/app/actions/workspaces/createWorkspace";
import { useState } from "react";

export function SidebarNav() {
  const { user } = useUser();

  const { workspaces } = useWorkspaceStore();

  const userId = user?.id || "";

  const [loading, setLoading] = useState(false);

  const handleCreateWorkspace = async (formData: FormData) => {
    setLoading(true);
    try {
      // Call the server action
      const newWorkspace = await createWorkspace(userId, formData);
      // Update the state with the actual workspace data from the server
      // Assuming you're using a state management library like useState
      // If not, you might want to use a state management library to update the workspaces state
      // For example, if you're using a state management library like Redux, you can dispatch an action
      // to update the workspaces state
    } catch (error) {
      console.error("Error creating workspace:", error);
    } finally {
      setLoading(false);
    }
  };

  // Define the type for openGroups
  const [openGroups, setOpenGroups] = React.useState<Record<string, boolean>>(
    {}
  );

  React.useEffect(() => {
    // Check if window is defined to ensure we're in the browser
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("sidebarGroupsOpen");
      setOpenGroups(savedState ? JSON.parse(savedState) : {});
    }
  }, []);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebarGroupsOpen", JSON.stringify(openGroups));
    }
  }, [openGroups]);

  // Update state
  const toggleGroupOpen = (groupId: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  return (
    <Sidebar variant="inset" collapsible="none">
      <SidebarHeader className="flex flex-col gap-2 px-2">
        <div>
          <h1 className="text-2xl font-bold">DS Workspace</h1>
          <p className="text-sm opacity-75">Vibe Business Intelligence</p>
        </div>
      </SidebarHeader>
      <SidebarSeparator />

      <SidebarContent>
        <div className="flex flex-row gap-4 items-center px-2 py-4">
          <h2 className="text-xl font-bold">Workspaces</h2>
          <Dialog>
            <DialogTrigger>
              <Plus className="h-6 w-6 cursor-pointer border border-gray-400 rounded-md text-gray-600" />
            </DialogTrigger>
            <DialogContent>
              <SignedIn>
                <DialogHeader>
                  <DialogTitle>Add new workspace</DialogTitle>
                  <DialogDescription>
                    Begin a new exploration with a new data source.
                  </DialogDescription>
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      const formData = new FormData(event.currentTarget);
                      handleCreateWorkspace(formData);
                    }}
                  >
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name">Workspace name</label>
                      <input
                        type="text"
                        name="name"
                        className="border border-gray-400 rounded-md p-2"
                        placeholder="Workspace name"
                      />
                      <label htmlFor="dataset_id">Dataset ID</label>
                      <input
                        type="text"
                        name="dataset_id"
                        className="border border-gray-400 rounded-md p-2"
                        placeholder="Dataset ID"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white rounded-md justify-center items-center w-full p-2 my-4"
                    >
                      Create
                    </button>
                    {loading && <p>Loading...</p>}
                  </form>
                </DialogHeader>
              </SignedIn>
              <SignedOut>
                <DialogHeader>
                  <DialogTitle>Login to create a workspace</DialogTitle>
                </DialogHeader>
              </SignedOut>
            </DialogContent>
          </Dialog>
        </div>
        {workspaces.map((workspace) => (
          <SidebarGroup key={workspace.id}>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className=""
                    onClick={() => {
                      toggleGroupOpen(workspace.id);
                    }}
                  >
                    <span className="flex-grow font-bold text-lg uppercase">
                      {workspace.name}
                    </span>
                    {openGroups[workspace.id] ? (
                      <ChevronDown className="" />
                    ) : (
                      <ChevronRight className="" />
                    )}
                  </SidebarMenuButton>
                  {openGroups[workspace.id] && (
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href={`/${workspace.id}/data_sources`}>
                            <Database />
                            <span>Data Sources</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href={`/${workspace.id}/queries`}>
                            <FileText />
                            <span>Queries</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href={`/${workspace.id}/chats`}>
                            <MessagesSquare />
                            <span>Chats</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="px-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/feedback">
                <BellRing />
                <span>Feedback</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarSeparator />
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SidebarMenu>
            <SidebarMenuItem>
              <SignInButton mode="modal">
                <SidebarMenuButton>
                  <User />
                  <span>Sign in</span>
                </SidebarMenuButton>
              </SignInButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SignedOut>
      </SidebarFooter>
    </Sidebar>
  );
}
