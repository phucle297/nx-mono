import { createFileRoute } from '@tanstack/react-router';
import { MainLayout, PendingLayout } from '../layout';

export const Route = createFileRoute('/_layout')({
  component: MainLayout,
  pendingComponent: PendingLayout,
});
