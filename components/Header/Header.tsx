import Link from 'next/link';
import css from './Header.module.css';

export default function Header() {
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
        <button className={css.login}>
          <svg width={20} height={20}>
            <use href="/icons.svg#icon-log-in"></use>
          </svg>
          <p>Log in</p>
        </button>
        <button className={css.registration}>Registration</button>
      </div>
    </header>
  );
}
