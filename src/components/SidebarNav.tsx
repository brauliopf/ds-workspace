"use client";

import {
  Home,
  Settings,
  User,
  FileText,
  Laptop,
  BellRing,
  ChevronRight,
  ChevronDown,
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

      <SidebarContent>
        {workspaces.map((workspace) => (
          <SidebarGroup key={workspace.id}>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => {
                      toggleGroupOpen(workspace.id);
                    }}
                  >
                    <Home />
                    <span>Playground</span>
                    {openGroups[workspace.id] ? (
                      <ChevronDown className="ml-auto h-4 w-4 transition-transform" />
                    ) : (
                      <ChevronRight className="ml-auto h-4 w-4 transition-transform" />
                    )}
                  </SidebarMenuButton>
                  {openGroups[workspace.id] && (
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          // isActive={pathname === "/history"}
                        >
                          <Link href="/history">
                            <span>History</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          // isActive={pathname === "/starred"}
                        >
                          <Link href="/starred">
                            <span>Starred</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          // isActive={pathname === "/settings-playground"}
                        >
                          <Link href="/settings-playground">
                            <span>Settings</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/models">
                      <Laptop />
                      <span>Models</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/docs">
                      <FileText />
                      <span>Documentation</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/settings">
                      <Settings />
                      <span>Settings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarSeparator />
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
