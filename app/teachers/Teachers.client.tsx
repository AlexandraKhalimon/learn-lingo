'use client';
import { fetchTeachers } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export default function TeachersClient() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['teachers'],
    queryFn: () => fetchTeachers(),
  });

  // додати лоадер і помилку

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (error) {
    return <p>Error ...</p>;
  }
}
