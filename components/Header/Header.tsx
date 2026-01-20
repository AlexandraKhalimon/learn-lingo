'use client';
import Link from 'next/link';
import css from './Header.module.css';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import RegisterForm from '../RegisterForm/RegisterForm';
import LoginForm from '../LoginForm/LoginForm';

export default function Header() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

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
        <button className={css.login} onClick={() => setIsLoginOpen(true)}>
          <svg width={20} height={20}>
            <use href="/icons.svg#icon-log-in"></use>
          </svg>
          <p>Log in</p>
        </button>
        {isLoginOpen && (
          <Modal onClose={() => setIsLoginOpen(false)}>
            <LoginForm />
          </Modal>
        )}
        <button
          className={css.registration}
          onClick={() => setIsRegisterOpen(true)}
        >
          Registration
        </button>
        {isRegisterOpen && (
          <Modal onClose={() => setIsRegisterOpen(false)}>
            <RegisterForm />
          </Modal>
        )}
      </div>
    </header>
  );
}
