'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import css from './RegisterForm.module.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { registerUser } from '@/lib/api';
import { useAuthStore } from '@/lib/store/authStore';
import toast from 'react-hot-toast';

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

interface RegisterFormProps {
  onClose: () => void
}

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

export default function RegisterForm({onClose}:RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const setUser = useAuthStore((state) => state.setUser);

  const onSubmit = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    const user = await registerUser(data);
    setUser({
      idToken: user.idToken,
      email: user.email,
      localId: user.localId,
      displayName: user.displayName || data.name,
    });
    
    toast.success('You successfully registered!', {position: 'top-center'})
    reset();
    onClose();
  };

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
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className={css.form}>
          <label className={css.inputBox}>
            <input
              {...register('name')}
              className={css.input}
              placeholder="Name"
            />
            <p className={css.error}>{errors.name?.message}</p>
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
              {...register('password')}
              className={css.input}
              type="password"
              placeholder="Password"
            />
            <p className={css.error}>{errors.password?.message}</p>
          </label>
        </div>
        <button type="submit" className={css.submit}>
          Sign Up
        </button>
      </form>
    </>
  );
}
