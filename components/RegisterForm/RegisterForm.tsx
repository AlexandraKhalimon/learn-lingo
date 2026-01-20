'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import css from './RegisterForm.module.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const registerSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
  });

  return (
    <>
      <div>
        <h3 className={css.title}>Registration</h3>
        <p className={css.text}>
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information
        </p>
      </div>
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <input {...register('name')} className={css.input} placeholder="Name" />
        <p className={css.error}>{errors.name?.message}</p>
        <input
          {...register('email')}
          className={css.input}
          placeholder="Email"
        />
        <p className={css.error}>{errors.email?.message}</p>
        <input
          {...register('password')}
          className={css.input}
          type="password"
          placeholder="Password"
        />
        <p className={css.error}>{errors.password?.message}</p>
        <button type="submit" className={css.submit}>
          Sign Up
        </button>
      </form>
    </>
  );
}
