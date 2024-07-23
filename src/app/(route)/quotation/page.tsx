import MainContainer from '@/app/components/quotation/MainContainer';
import NavBar from '@/app/components/quotation/NavBar';
import TopBar from '@/app/components/quotation/TopBar';

export default function Quotation() {
  return (
    <section>
      <div className="bg-white w-full h-screen flex relative">
        {/* 네비게이션 바 */}
        <NavBar />

        {/* 탑바 */}
        <TopBar />

        {/* 메인 컨테이너 */}
        <MainContainer />
      </div>
    </section>
  );
}
