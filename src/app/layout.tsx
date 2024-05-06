'use client';
import './globals.css';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
        <Head>
          <title>VirtueGaming</title>
          <meta
            name="description"
            content="An app where users are able to discover something new and receive an NFT to show off their achievement."
          />
        </Head>
        <body
          className={`bg-gradient bg-cover bg-no-repeat w-full min-h-screen flex justify-between h-screen flex-col items-center ${inter.className}`}
        >
          <div className='w-full'>{children}</div>
        </body>
      </html>
  );
}