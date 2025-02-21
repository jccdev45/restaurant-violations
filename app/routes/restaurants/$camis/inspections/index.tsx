import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/restaurants/$camis/inspections/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/restaurants/$camis/inspections/"!</div>
}
