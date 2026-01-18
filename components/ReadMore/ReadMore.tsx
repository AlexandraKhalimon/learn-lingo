import css from './ReadMore.module.css';
import { Review, Teacher } from '@/types/teacher';
import Image from 'next/image';

interface Props {
  teacher: Teacher;
  reviews: Review[];
}

export default function ReadMore({ teacher, reviews }: Props) {
  return (
    <>
      <p className={css.experience}>{teacher.experience}</p>
      <ul>
        {reviews.map((review, index) => (
          <li key={index} className={css.comment}>
            <div className={css.reviewer}>
              <Image
                src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                alt="User image"
                width={44}
                height={44}
              />
              <div className={css.reviewHeader}>
                <h6>{review.reviewer_name}</h6>
                <div className={css.rating}>
                  <svg width={16} height={16}>
                    <use href="/icons.svg#icon-star"></use>
                  </svg>
                  <p>{review.reviewer_rating}</p>
                </div>
              </div>
            </div>
            <p className={css.comment}>{review.comment}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
