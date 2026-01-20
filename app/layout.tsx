import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

// Додати url у OG сайту після деплою

export const metadata: Metadata = {
  title: 'LearnLingo',
  description:
    'Learn Lingo — an online platform for learning languages with professional tutors.',
  keywords:
    'language learning, online language courses, language tutors, learn English, learn Spanish, learn French, learn German, learn Chinese, online lessons, foreign languages, language practice, online education',
  openGraph: {
    title: 'LearnLingo',
    description:
      'Learn Lingo — an online platform for learning languages with professional tutors.',
    url: 'https://learn-lingo-tan.vercel.app/',
    type: 'website',
    images: [
      {
        url: 'https://cdn.pixabay.com/photo/2025/10/10/10/21/learning-9885624_1280.png',
        width: 1200,
        height: 630,
        alt: 'Learn Lingo online language learning platform',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>

      <body className={`${roboto.variable}`}>
        <TanStackProvider>
          <Header />
          {children}
        </TanStackProvider>
      </body>
    </html>
  );
}
