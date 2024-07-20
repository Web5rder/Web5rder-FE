import Header from '../components/common/layout/Header';

export default function MainPage() {
  return (
    <section>
      <div className="flex w-full h-screen flex-col">
        <Header />
        <div className="h-[200px] w-[900px] text-[100px] text-center text-white whitespace-nowrap">
          정말 맛있는 푸드
        </div>
      </div>
    </section>
  );
}
