'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import css from './LoginForm.module.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const loginSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
  });

  return (
    <>
      <div>
        <h3 className={css.title}>Log In</h3>
        <p className={css.text}>
          Welcome back! Please enter your credentials to access your account and
          continue your search for an teacher.
        </p>
      </div>
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
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
          Log In
        </button>
      </form>
    </>
  );
}
