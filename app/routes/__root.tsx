// app/routes/__root.tsx

import { DefaultCatchBoundary } from "@/components/error/default-catch-boundary";
import { ModeToggle } from "@/components/mode-toggle";
import { NotFound } from "@/components/not-found";
import { ThemeProvider } from "@/components/theme-provider";
import appCss from "@/styles/app.css?url";
import { seo } from "@/utils/seo";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createRootRouteWithContext,
  HeadContent,
  Link,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
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
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider defaultTheme="dark" storageKey="tanstack-ui-theme">
          <div className="relative">
            <header className="p-4 flex items-center justify-between">
              <nav className="flex gap-2 text-lg">
                <Link
                  to="/"
                  activeProps={{
                    className: "font-bold",
                  }}
                  activeOptions={{ exact: true }}
                >
                  Home
                </Link>{" "}
                <Link
                  to="/restaurants"
                  activeProps={{
                    className: "font-bold",
                  }}
                >
                  Restaurants
                </Link>
              </nav>
              <ModeToggle />
            </header>
            {children}
          </div>
        </ThemeProvider>
        <TanStackRouterDevtools initialIsOpen={false} position="bottom-right" />
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-left"
        />
        <Scripts />
      </body>
    </html>
  );
}
