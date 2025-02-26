import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/restaurants/map')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/restaurants/map/"!</div>
}
