import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/petition")({
  component: Petition,
});

function Petition() {
  return <div className="p-2">Hello from petition!</div>;
}
