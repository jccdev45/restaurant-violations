// app/routes/index.tsx

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { restaurantData } from "@/utils/mock-data";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  Building2,
  Calendar,
  MapPin,
  Phone,
  Search,
  Shield,
  Utensils,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
});

// const latestInspection = restaurantData.inspections[0];

function Home() {
  return (
    <div className="min-h-screen">
      <main className="container px-4 py-6 md:py-12">
        <section className="mx-auto max-w-4xl space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Restaurant Inspection Results
            </h1>
            <div className="mx-auto max-w-[700px] text-muted-foreground">
              Search and view health inspection results for restaurants across
              New York City.
            </div>
          </div>

          <div className="flex w-full max-w-sm items-center space-x-2 mx-auto">
            <Input type="search" placeholder="Search restaurants..." />
            <Button type="submit" size="icon">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div>

          {restaurantData.map((restaurant) => (
            <Card className="mt-8" key={restaurant.camis}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">
                      <Link
                        to="/restaurants/$camis"
                        params={{
                          camis: restaurant.camis,
                        }}
                      >
                        {restaurant.dba}
                      </Link>
                    </CardTitle>
                    <CardDescription>
                      <span className="flex items-center gap-2">
                        <Utensils className="h-4 w-4" />
                        {restaurant.cuisine_description}
                      </span>
                    </CardDescription>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600">
                      {restaurant.inspections[0].grade}
                    </div>
                    <div className="text-sm text-muted-foreground">Grade</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {restaurant.building} {restaurant.street},{" "}
                        {restaurant.boro} {restaurant.zipcode}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {restaurant.phone
                          ? restaurant.phone.replace(
                              /(\d{3})(\d{3})(\d{4})/,
                              "($1) $2-$3"
                            )
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        Last Inspected:{" "}
                        {restaurant.inspections
                          ? new Date(
                              restaurant.inspections[0].inspection_date
                            ).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold">Recent Violations</h3>
                    <div className="space-y-2">
                      {restaurant.inspections[0].violations.map(
                        (violation, index) => (
                          <div key={index} className="rounded-lg border p-3">
                            <div className="flex items-start gap-2">
                              {violation.critical_flag === "Critical" && (
                                <AlertTriangle className="h-4 w-4 flex-shrink-0 text-destructive" />
                              )}
                              <div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline">
                                    Code: {violation.violation_code ?? "N/A"}
                                  </Badge>
                                  {violation.critical_flag === "Critical" && (
                                    <Badge variant="destructive">
                                      Critical
                                    </Badge>
                                  )}
                                </div>
                                <div className="mt-1 text-sm">
                                  {violation.violation_description ??
                                    "No violation description."}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <section className="mt-12 grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Grading Scale
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-bold text-green-600">Grade A</span>:
                    0-13 points
                  </div>
                  <div className="text-sm">
                    <span className="font-bold text-yellow-600">Grade B</span>:
                    14-27 points
                  </div>
                  <div className="text-sm">
                    <span className="font-bold text-red-600">Grade C</span>: 28+
                    points
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Violation Types
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">
                    <Badge variant="destructive">Critical</Badge> violations
                    pose an immediate health hazard
                  </div>
                  <div className="text-sm">
                    <Badge variant="secondary">General</Badge> violations are
                    less severe
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link to="/" className="text-sm hover:underline">
                    Restaurant Inspection Guide
                  </Link>
                  <Link to="/" className="block text-sm hover:underline">
                    Report a Violation
                  </Link>
                  <Link to="/" className="block text-sm hover:underline">
                    Food Safety Tips
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>
        </section>
      </main>

      <footer className="border-t">
        <div className="container flex flex-col gap-2 py-6 px-4 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} NYC Department of Health and Mental
            Hygiene
          </div>
          <nav className="flex gap-4">
            <Link
              className="text-sm text-muted-foreground hover:underline"
              to="/"
            >
              Privacy Policy
            </Link>
            <Link
              className="text-sm text-muted-foreground hover:underline"
              to="/"
            >
              Terms of Service
            </Link>
            <Link
              className="text-sm text-muted-foreground hover:underline"
              to="/"
            >
              Accessibility
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
