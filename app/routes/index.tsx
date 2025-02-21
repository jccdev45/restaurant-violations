// app/routes/index.tsx

import { Badge } from "@/components/ui/badge";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

const greeting = ["Welcome", "to", "the", "homepage!"];

function Home() {
  return (
    <div className="container">
      {greeting.map((item) => (
        <Badge key={item}>{item}</Badge>
      ))}
    </div>
  );
}
