'use client';

import Image from 'next/image';
import css from './TeacherCard.module.css';
import { Teacher } from '@/types/teacher';
import { useState } from 'react';
import ReadMore from '../ReadMore/ReadMore';
import Modal from '../Modal/Modal';
import BookingForm from '../BookingForm/BookingForm';
import { useFavoritesStore } from '@/lib/store/favoritesStore';
import { useAuthStore } from '@/lib/store/authStore';
import toast from 'react-hot-toast';

interface Props {
  teacher: Teacher;
}

export default function TeachersCard({ teacher }: Props) {
  const [isReadMore, setIsReadMore] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const { favorites, setFavorite } = useFavoritesStore();
  const isFavorite = favorites.includes(teacher.id);
  const user = useAuthStore((state) => state.user);

  const handleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const handleFavorite = () => {
    if (!user) {
      toast.error(
        'You need to log in or register to add a teacher to your favorites',
      );
      return;
    }
    setFavorite(teacher.id);
  };

  return (
    <div className={css.card}>
      <div className={css.avatar}>
        <Image
          src={teacher.avatar_url}
          alt="Teacher photo"
          width={96}
          height={96}
          className={css.img}
        />
        <svg width={12} height={12} className={css.icon}>
          <use href="/icons.svg#icon-green-dot"></use>
        </svg>
      </div>
      <div className={css.info}>
        <div className={css.about}>
          <div>
            <div className={css.header}>
              <div className={css.name}>
                <p>Languages</p>
                <h3>
                  {teacher.name} {teacher.surname}
                </h3>
              </div>
              <div className={css.infoBar}>
                <ul className={css.stats}>
                  <li>
                    <svg width={16} height={16} className={css.icon}>
                      <use href="/icons.svg#icon-book"></use>
                    </svg>
                    <p>Lessons online</p>
                  </li>
                  <li>
                    <p>Lessons done: {teacher.lessons_done}</p>
                  </li>
                  <li>
                    <svg width={16} height={16} className={css.icon}>
                      <use href="/icons.svg#icon-star"></use>
                    </svg>
                    <p>Rating: {teacher.rating}</p>
                  </li>
                  <li>
                    <p>
                      Price / 1 hour: <span>{teacher.price_per_hour}$</span>
                    </p>
                  </li>
                </ul>
                <button className={css.favorite} onClick={handleFavorite}>
                  <svg width={26} height={26}>
                    <use
                      href={
                        isFavorite
                          ? '/icons.svg#icon-gold-heart'
                          : '/icons.svg#icon-heart'
                      }
                    ></use>
                  </svg>
                </button>
              </div>
            </div>
            <ul className={css.details}>
              <li>
                <p>
                  <span>Speaks: </span>
                  <span className={css.underlined}>
                    {teacher.languages.join(', ')}
                  </span>
                </p>
              </li>
              <li>
                <p>
                  <span>Lesson Info: </span>
                  {teacher.lesson_info}
                </p>
              </li>
              <li>
                <p>
                  <span>Conditions: </span>
                  {teacher.conditions}{' '}
                </p>
              </li>
            </ul>
          </div>
          {isReadMore ? (
            <ReadMore teacher={teacher} reviews={teacher.reviews} />
          ) : (
            <button className={css.readMore} onClick={handleReadMore}>
              Read more
            </button>
          )}
        </div>
        <ul className={css.levels}>
          {teacher.levels.map((level, index) => (
            <li key={index}>#{level}</li>
          ))}
        </ul>
        {isReadMore && (
          <button
            className={css.booking}
            onClick={() => setIsBookingOpen(true)}
          >
            Book trial lesson
          </button>
        )}
        {isBookingOpen && (
          <Modal onClose={() => setIsBookingOpen(false)}>
            <BookingForm teacher={teacher} onClose={()=>setIsBookingOpen(false)}/>
          </Modal>
        )}
      </div>
    </div>
  );
}
