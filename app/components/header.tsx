import { ModeToggle } from "@/components/mode-toggle";
import { Link } from "@tanstack/react-router";
import { Utensils } from "lucide-react";

export function Header() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <nav className="flex gap-6">
          <Link
            to="/"
            activeProps={{
              className: "font-bold",
            }}
            activeOptions={{ exact: true }}
            className="flex items-center gap-2"
          >
            <Utensils className="h-6 w-6" />
            <span className="text-xl font-bold">
              NYC Restaurant Inspections
            </span>
          </Link>{" "}
          <Link
            to="/restaurants"
            activeProps={{
              className: "font-bold",
            }}
            activeOptions={{ exact: true }}
            params={{
              $order: "inspection_date DESC", // added this
            }}
            className="flex items-center gap-2"
          >
            Table
          </Link>
          <Link
            to="/restaurants/map"
            activeProps={{
              className: "font-bold",
            }}
            className="flex items-center gap-2"
          >
            Map
          </Link>
          <Link
            to="/restaurants/chart"
            activeProps={{
              className: "font-bold",
            }}
            className="flex items-center gap-2"
          >
            Chart
          </Link>
        </nav>
        <ModeToggle />
      </div>
    </header>
  );
}
