import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_rootLayout/restaurants/map')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/restaurants/map/"!</div>
}
