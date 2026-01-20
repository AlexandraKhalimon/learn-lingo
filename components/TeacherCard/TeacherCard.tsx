'use client';

import Image from 'next/image';
import css from './TeacherCard.module.css';
import { Teacher } from '@/types/teacher';
import { useState } from 'react';
import ReadMore from '../ReadMore/ReadMore';
import Modal from '../Modal/Modal';
import BookingForm from '../BookingForm/BookingForm';

interface Props {
  teacher: Teacher;
}

export default function TeachersCard({ teacher }: Props) {
  const [isReadMore, setIsReadMore] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleReadMore = () => {
    setIsReadMore(!isReadMore);
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
                <button className={css.favorite}>
                  <svg width={26} height={26}>
                    <use href="/icons.svg#icon-heart"></use>
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
            <BookingForm teacher={teacher} />
          </Modal>
        )}
      </div>
    </div>
  );
}
