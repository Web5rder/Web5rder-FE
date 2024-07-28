export default function NavBar() {
  return (
    <div className="bg-primary-4 w-32 whitespace-nowrap">
      <p className="pt-6 h-4 text-white font-black">정말맛있는푸드</p>
      <div className="mt-12 flex-center flex-col cursor-pointer">
        <p className="flex-center h-9 w-full font-black text-white text-lg hover:bg-primary-3 border-b-[1px] border-gray-1">
          주문생성
        </p>
        <p className="flex-center h-9 w-full font-black text-white text-lg hover:bg-primary-3 border-b-[1px] border-gray-1">
          최근주문
        </p>
        <p className="flex-center h-9 w-full font-black text-white text-lg hover:bg-primary-3 border-b-[1px] border-gray-1">
          견적서
        </p>
      </div>
    </div>
  );
}
