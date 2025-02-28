// app/routes/__root.tsx

import { AppSidebar } from "@/components/app-sidebar";
import {
  DefaultCatchBoundary,
} from "@/components/error/default-catch-boundary";
import { NotFound } from "@/components/not-found";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import appCss from "@/styles/app.css?url";
import { seo } from "@/utils/seo";
import type { QueryClient } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createRootRouteWithContext, HeadContent, Outlet, Scripts,
} from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import type { ReactNode } from "react";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title: "CleanPlate",
        description: `CleanPlate is a place to search for and view the public inspection results of restaurants all across New York City.`,
      }),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <ThemeProvider defaultTheme="dark" storageKey="tanstack-ui-theme">
        <SidebarProvider>
          <AppSidebar />
          <div className="flex flex-col h-full container mx-auto">
            <div className="flex items-center gap-2 py-2">
              <SidebarTrigger size="lg" />
            </div>
            <Outlet />
          </div>
        </SidebarProvider>
      </ThemeProvider>
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="h-svh">
        {children}
        {/* <TanStackRouterDevtools initialIsOpen={false} position="bottom-right" />
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-left"
        /> */}
        <Scripts />
      </body>
    </html>
  );
}
