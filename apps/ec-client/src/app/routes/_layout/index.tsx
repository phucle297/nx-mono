import { HomePage } from '@ec-client/pages/home'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/')({
  component: HomePage
})
