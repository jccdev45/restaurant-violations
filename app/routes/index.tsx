// app/routes/index.tsx

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Hero } from "@/components/ui/hero";
import { Typography } from "@/components/ui/typography";
import type { Restaurant, Violation } from "@/types/restaurant-types";
import { HERO_IMAGES, RESTAURANT_DATA } from "@/utils/mock-data";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  Building2,
  Calendar,
  MapPin,
  Phone,
  Shield,
  Utensils,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
});

function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <Card className="mt-8" key={restaurant.camis}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">
              <Link
                to="/restaurants/$camis"
                params={{ camis: restaurant.camis }}
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
            <div
              className={`text-4xl font-bold ${
                restaurant.inspections[0].grade === "A"
                  ? "text-green-600"
                  : restaurant.inspections[0].grade === "B"
                    ? "text-yellow-600"
                    : "text-red-600"
              }`}
            >
              {restaurant.inspections[0]?.grade ?? "N/A"}
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
                {restaurant.building} {restaurant.street}, {restaurant.boro}{" "}
                {restaurant.zipcode}
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
                {restaurant.inspections[0]?.inspection_date
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
              {restaurant.inspections[0]?.violations.map((violation, index) => (
                <ViolationList key={index} violation={violation} />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ViolationList({ violation }: { violation: Violation }) {
  return (
    <div className="rounded-lg border p-3">
      <div className="flex items-start gap-2">
        {violation.critical_flag === "Critical" && (
          <AlertTriangle className="h-4 w-4 flex-shrink-0 text-destructive" />
        )}
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              Code:{" "}
              {violation.violation_code.length
                ? violation.violation_code
                : "--"}
            </Badge>
            {violation.critical_flag === "Critical" && (
              <Badge variant="destructive">Critical</Badge>
            )}
          </div>
          <div className="mt-1 text-sm">
            {violation.violation_description.length
              ? violation.violation_description
              : "No violation description."}
          </div>
        </div>
      </div>
    </div>
  );
}

function GradingScale() {
  return (
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
            <span className="font-bold text-green-600">Grade A:</span> 0-13
            points
          </div>
          <div className="text-sm">
            <span className="font-bold text-yellow-600">Grade B:</span> 14-27
            points
          </div>
          <div className="text-sm">
            <span className="font-bold text-red-600">Grade C:</span> 28+ points
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ViolationTypes() {
  return (
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
            <Badge variant="destructive">Critical</Badge> violations pose an
            immediate health hazard
          </div>
          <div className="text-sm">
            <Badge variant="secondary">General</Badge> violations are less
            severe
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Resources() {
  return (
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
  );
}

function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col gap-2 py-6 px-4 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Cleanplate
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
  );
}

function Home() {
  return (
    <div className="container mx-auto">
      <Hero
        type="image"
        title="CLEANPLATE"
        subtitle="Search for and view the public inspection results of restaurants all across New York City."
        subtext="SPOILER: You might end up reconsidering your favorite spots."
        ctaLink="/restaurants"
        ctaText="View the restaurants table"
        images={HERO_IMAGES}
      />
      <main className="px-4 py-6 md:py-12">
        <section className="mx-auto max-w-4xl space-y-6">
          {/* <div className="flex w-full max-w-sm items-center space-x-2 mx-auto">
            <Input type="search" placeholder="Search restaurants..." />
            <Button type="submit" size="icon">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div> */}

          <Alert>
            <AlertTitle>
              <Typography variant="h3">Featured Restaurants</Typography>
            </AlertTitle>
            <AlertDescription>
              <Typography variant="lead">
                Check out some of the restaurants with perfect scores!
              </Typography>
            </AlertDescription>
          </Alert>

          {RESTAURANT_DATA.map((restaurant) => (
            <RestaurantCard key={restaurant.camis} restaurant={restaurant} />
          ))}

          <section className="mt-12 grid gap-6 md:grid-cols-3">
            <GradingScale />
            <ViolationTypes />
            <Resources />
          </section>
        </section>
      </main>

      <Footer />
    </div>
  );
}
