'use client';
import css from './page.module.css';
import TeachersCard from '@/components/TeacherCard/TeacherCard';
import { fetchTeachers } from '@/lib/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function TeachersClient() {
  const [limit, setLimit] = useState(4);

  const { data, isLoading, error } = useQuery({
    queryKey: ['teachers', limit],
    queryFn: () => fetchTeachers({ limit }),
    placeholderData: keepPreviousData,
  });

  // додати лоадер і помилку

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (error) {
    return <p>Error ...</p>;
  }

  // console.log(data);

  return (
    <section className={css.section}>
      {!data ? (
        <p>Not found</p>
      ) : (
        <>
          <ul className={css.list}>
            {data.map((teacher) => (
              <li key={teacher.id}>
                <TeachersCard teacher={teacher} />
              </li>
            ))}
          </ul>
          <button className={css.button} onClick={() => setLimit(limit + 4)}>
            Load more
          </button>
        </>
      )}
    </section>
  );
}
