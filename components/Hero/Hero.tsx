import Image from 'next/image';
import css from './Hero.module.css';

export default function Hero() {
  return (
    <section className={css.section}>
      <div className={css.hero}>
        <div>
          <h1 className={css.title}>
            Unlock your potential with the best <span>language</span> tutors
          </h1>
          <p className={css.info}>
            Embark on an Exciting Language Journey with Expert Language Tutors:
            Elevate your language proficiency to new heights by connecting with
            highly qualified and experienced tutors.
          </p>
          <button className={css.button}>Get started</button>
        </div>
        <Image
          src="/images/hero.png"
          alt="Girl with a computer"
          width={568}
          height={530}
        />
      </div>
      <ul className={css.list}>
        <li>
          <p className={css.number}>32,000 +</p>
          <p className={css.text}>Experienced tutors</p>
        </li>
        <li>
          <p className={css.number}>300,000 +</p>
          <p className={css.text}>5-star tutor reviews</p>
        </li>
        <li>
          <p className={css.number}>120 +</p>
          <p className={css.text}>Subjects taught</p>
        </li>
        <li>
          <p className={css.number}>200 +</p>
          <p className={css.text}>Tutor nationalities</p>
        </li>
      </ul>
    </section>
  );
}
