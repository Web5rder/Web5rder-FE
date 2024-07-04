import { ReactNode } from 'react';
import NavBar from './components/NavBar';
import TopBar from './components/TopBar';
import '../globals.css';

export const metadata = {
  title: '메인화면-구매',
  description: '상품 구매 페이지입니다.',
};

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="relative flex h-screen">
      <NavBar />
      <div className="flex flex-col w-full">
        <TopBar />
        <div className="flex-grow">{children}</div>
      </div>
    </div>
  );
}
