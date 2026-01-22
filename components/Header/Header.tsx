'use client';
import Link from 'next/link';
import css from './Header.module.css';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import RegisterForm from '../RegisterForm/RegisterForm';
import LoginForm from '../LoginForm/LoginForm';
import { useAuthStore } from '@/lib/store/authStore';

export default function Header() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <header className={css.header}>
      <div className={css.navContainer}>
        <Link href="/" className={css.logo}>
          <svg width={28} height={28}>
            <use href="/icons.svg#icon-ukraine"></use>
          </svg>
          <p>LearnLingo</p>
        </Link>
        <nav>
          <ul className={css.navigation}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/teachers">Teachers</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className={css.authorization}>
        {!user ? (
          <>
            <button className={css.login} onClick={() => setIsLoginOpen(true)}>
              <svg width={20} height={20}>
                <use href="/icons.svg#icon-log-in"></use>
              </svg>
              <p>Log in</p>
            </button>
            {isLoginOpen && (
              <Modal onClose={() => setIsLoginOpen(false)} width='566px'>
                <LoginForm onClose={()=>setIsLoginOpen(false)}/>
              </Modal>
            )}
            <button
              className={css.registration}
              onClick={() => setIsRegisterOpen(true)}
            >
              Registration
            </button>
            {isRegisterOpen && (
              <Modal onClose={() => setIsRegisterOpen(false)} width='566px'>
                <RegisterForm onClose={()=>setIsRegisterOpen(false)}/>
              </Modal>
            )}
          </>
        ) : (
          <>
            <button className={css.login} onClick={logout}>
              <svg width={20} height={20}>
                <use href="/icons.svg#icon-log-in"></use>
              </svg>
              <p>Log out</p>
            </button>
            <Link href={'/favorites'}>
              <button className={css.registration}>Favorites</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
