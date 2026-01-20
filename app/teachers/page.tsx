import { fetchTeachers } from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import TeachersClient from './Teachers.client';

export default async function TeachersPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['teachers', 4],
    queryFn: () => fetchTeachers({ limit: 4 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TeachersClient />
    </HydrationBoundary>
  );
}
