"use client";

import * as React from "react";
import {
  Home,
  Settings,
  User,
  LayoutDashboard,
  FileText,
  PlusCircle,
  Laptop,
  BarChart,
  Plane,
  BellRing,
  MessageCircle,
  MoreHorizontal,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

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
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { useSidebarStore } from "@/stores/sidebar/store";

export function SidebarNav() {
  const pathname = usePathname();
  const { toggleItem, isExpanded, workspaces } = useSidebarStore();
  const playgroundOpen = isExpanded("playground");

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
            <SidebarGroupLabel>{workspace.name}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={pathname === "/"}
                    onClick={() => toggleItem("playground")}
                  >
                    <Home />
                    <span>Playground</span>
                    <ChevronRight
                      className={
                        playgroundOpen
                          ? "ml-auto h-4 w-4 transition-transform rotate-90"
                          : "ml-auto h-4 w-4 transition-transform"
                      }
                    />
                  </SidebarMenuButton>
                  {playgroundOpen && (
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={pathname === "/history"}
                        >
                          <Link href="/history">
                            <span>History</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={pathname === "/starred"}
                        >
                          <Link href="/starred">
                            <span>Starred</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={pathname === "/settings-playground"}
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

        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/design">
                    <LayoutDashboard />
                    <span>Design Engineering</span>
                    <MoreHorizontal className="ml-auto h-4 w-4 text-muted-foreground" />
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/sales">
                    <BarChart />
                    <span>Sales & Marketing</span>
                    <MoreHorizontal className="ml-auto h-4 w-4 text-muted-foreground" />
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/travel">
                    <Plane />
                    <span>Travel</span>
                    <MoreHorizontal className="ml-auto h-4 w-4 text-muted-foreground" />
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/more-projects">
                    <PlusCircle />
                    <span>More</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter className="px-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/support">
                <MessageCircle />
                <span>Support</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
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
