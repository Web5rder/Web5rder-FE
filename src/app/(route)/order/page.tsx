import SideNavBar from '@/app/components/common/layout/SideNavBar';
import OrderContainer from '@/app/components/order/container/OrderContainer';
import TopBar from '@/app/components/order/TopBar';

export default function Order() {
  return (
    <section>
      <div className="bg-white w-full h-screen flex relative">
        {/* 네비게이션 바 */}
        <SideNavBar />

        {/* 탑바 */}
        <TopBar />

        {/* 메인 컨테이너 */}
        <OrderContainer />
      </div>
    </section>
  );
}
