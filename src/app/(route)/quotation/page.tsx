import Footer from '@/app/components/common/layout/Footer';
import SideNavBar from '@/app/components/common/layout/SideNavBar';
import MainContainer from '@/app/components/quotation/container/QuotationContainer';

export default function Quotation() {
  return (
    <section>
      <div className="bg-white w-full h-screen flex flex-col relative">
        <div className="flex w-full">
          <SideNavBar />
          <MainContainer />
        </div>
        <Footer />
      </div>
    </section>
  );
}
