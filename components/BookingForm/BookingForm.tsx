'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import css from './BookingForm.module.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Teacher } from '@/types/teacher';
import Image from 'next/image';

const bookingSchema = yup.object({
  reason: yup.string().required('Please select a reason'),
  fullName: yup.string().required('Name is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  phoneNumber: yup
    .number()
    .typeError('Phone number must include number')
    .required('Phone number is required'),
});

interface BookingFormValues {
  reason: string;
  fullName: string;
  email: string;
  phoneNumber: number;
}

interface BookingFormProps {
  teacher: Teacher;
}

export default function BookingForm({ teacher }: BookingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: yupResolver(bookingSchema),
  });
  return (
    <>
      <div>
        <h3 className={css.title}>Book trial lesson</h3>
        <p className={css.text}>
          Our experienced tutor will assess your current language level, discuss
          your learning goals, and tailor the lesson to your specific needs.
        </p>
      </div>
      <div className={css.teacher}>
        <Image
          src={teacher.avatar_url}
          alt="Teacher photo"
          width={44}
          height={44}
          className={css.img}
        />
        <div className={css.name}>
          <p>Your teacher</p>
          <h6>
            {teacher.name} {teacher.surname}
          </h6>
        </div>
      </div>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <h4 className={css.question}>
          What is your main reason for learning English?
        </h4>
        <div className={css.radioButtons}>
          <label className={css.radio}>
            <input
              {...register('reason')}
              type="radio"
              value="Career and business"
            />
            Career and business
          </label>
          <label className={css.radio}>
            <input
              {...register('reason')}
              type="radio"
              value="Lesson for kids"
            />
            Lesson for kids
          </label>
          <label className={css.radio}>
            <input {...register('reason')} type="radio" value="Living abroad" />
            Living abroad
          </label>
          <label className={css.radio}>
            <input
              {...register('reason')}
              type="radio"
              value="Exams and coursework"
            />
            Exams and coursework
          </label>
          <label className={css.radio}>
            <input
              {...register('reason')}
              type="radio"
              value="Culture, travel or hobby"
            />
            Culture, travel or hobby
          </label>
        </div>
        <div className={css.form}>
          <label className={css.inputBox}>
            <input
              {...register('fullName')}
              className={css.input}
              placeholder="Full Name"
            />
            <p className={css.error}>{errors.fullName?.message}</p>
          </label>
          <label className={css.inputBox}>
            <input
              {...register('email')}
              className={css.input}
              placeholder="Email"
            />
            <p className={css.error}>{errors.email?.message}</p>
          </label>
          <label className={css.inputBox}>
            <input
              {...register('phoneNumber')}
              className={css.input}
              type="tel"
              placeholder="Phone number"
            />
            <p className={css.error}>{errors.phoneNumber?.message}</p>
          </label>
        </div>
        <button className={css.button}>Book</button>
      </form>
    </>
  );
}
