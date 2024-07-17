import type { Metadata } from 'next';
import '../ui/globals.css';

export const metadata: Metadata = {
  title: 'JMF',
  description: '정말 맛있는 음식! JMF!',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-black min-h-screen min-w-[800px] mx-auto">
        {children}
      </body>
    </html>
  );
}
