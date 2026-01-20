'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import css from './LoginForm.module.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useAuthStore } from '@/lib/store/authStore';
import { loginUser } from '@/lib/api';

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
    reset,
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const setUser = useAuthStore((state) => state.setUser);

  const onSubmit = async (data: LoginFormValues) => {
    const user = await loginUser(data);
    setUser({
      idToken: user.idToken,
      email: user.email,
      localId: user.localId,
      displayName: user.displayName,
    });
    reset();
  };

  return (
    <>
      <div>
        <h3 className={css.title}>Log In</h3>
        <p className={css.text}>
          Welcome back! Please enter your credentials to access your account and
          continue your search for an teacher.
        </p>
      </div>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className={css.form}>
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
              {...register('password')}
              className={css.input}
              type="password"
              placeholder="Password"
            />
            <p className={css.error}>{errors.password?.message}</p>
          </label>
        </div>
        <button type="submit" className={css.submit}>
          Log In
        </button>
      </form>
    </>
  );
}
