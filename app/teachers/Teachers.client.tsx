'use client';
import TeachersCard from '@/components/TeacherCard/TeacherCard';
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

  return (
    <section>
      {!data ? (
        <p>Not found</p>
      ) : (
        <ul>
          {data.map(
            (
              teacher,
              index, // змінити key
            ) => (
              <li key={index}>
                <TeachersCard teacher={teacher} />
              </li>
            ),
          )}
        </ul>
      )}
    </section>
  );
}
