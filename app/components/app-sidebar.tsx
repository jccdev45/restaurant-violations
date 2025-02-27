import { ModeToggle } from "@/components/mode-toggle";
import { NavMain } from "@/components/nav-main";
import { NavQuickAccess } from "@/components/nav-quick-access";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu,
  SidebarMenuButton, SidebarMenuItem, SidebarRail,
} from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle, BarChart, BookOpen, ChefHat, Home, Map, Table, TrendingDown,
  TrendingUp, Utensils,
} from "lucide-react";
import * as React from "react";

// Updated Data Structure
const data = {
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: Home,
      isActive: true,
    },
    {
      title: "Restaurants",
      url: "/restaurants",
      icon: ChefHat,
      items: [
        {
          title: "Table",
          url: "/restaurants",
          icon: Table,
        },
        {
          title: "Map",
          url: "/restaurants/map",
          icon: Map,
        },
        {
          title: "Chart",
          url: "/restaurants/chart",
          icon: BarChart,
        },
      ],
    },
  ],
  quickAccess: [
    // Renamed "projects" to "quickAccess"
    {
      name: "Critical Violations",
      url: "/restaurants?critical_flag=Critical",
      icon: AlertTriangle,
    },
    {
      name: "Worst Performers",
      url: "/restaurants?$where=score%20%3E%2027", // URL-encoded >
      icon: TrendingDown,
    },
    {
      name: "Best Performers",
      url: "/restaurants?$where=score%20%3C%2014", // URL-encoded <
      icon: TrendingUp,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/" className="font-semibold text-xl tracking-wide">
                <Utensils className="mr-2" />
                <span>Cleanplate</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavQuickAccess quickAccess={data.quickAccess} />
      </SidebarContent>
      <SidebarFooter className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          <BookOpen className="h-3 w-3 inline mr-1" />
          v1.0.0
        </span>
        <ModeToggle />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
