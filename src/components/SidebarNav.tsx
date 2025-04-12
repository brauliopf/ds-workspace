"use client";

import {
  User,
  FileText,
  BellRing,
  ChevronRight,
  ChevronDown,
  Database,
  MessagesSquare,
  FilePenLine,
} from "lucide-react";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import * as React from "react";

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

export function SidebarNav() {
  const { workspaces } = useWorkspaceStore();

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
          <h1 className="text-xl font-bold">DS Workspace</h1>
          <p className="text-sm opacity-75">Vibe Business Intelligence</p>
        </div>
      </SidebarHeader>
      <SidebarSeparator />

      <SidebarContent>
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
                          <Link href={`/${workspace.id}/instructions`}>
                            <FilePenLine />
                            <span>Instructions</span>
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
