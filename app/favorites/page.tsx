'use client';
import css from './page.module.css';
import TeachersCard from '@/components/TeacherCard/TeacherCard';
import { fetchTeachers } from '@/lib/api';
import { useFavoritesStore } from '@/lib/store/favoritesStore';
import { Teacher } from '@/types/teacher';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Loader from '../loading';

export default function Favorites() {
  const favorites = useFavoritesStore((state) => state.favorites);

  const { data, isLoading } = useQuery({
    queryKey: ['teachers'],
    queryFn: () => fetchTeachers({ limit: 30 }),
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return <Loader />;
  }

  const favoriteTeachers = data?.filter((teacher: Teacher) =>
    favorites.includes(teacher.id),
  );

  return (
    <section className={css.section}>
      {favoriteTeachers?.length === 0 ? (
        <p className={css.message}>Please choose your favorite teachers</p>
      ) : (
        <>
          <ul className={css.list}>
            {favoriteTeachers?.map((teacher) => (
              <li key={teacher.id}>
                <TeachersCard teacher={teacher} />
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
