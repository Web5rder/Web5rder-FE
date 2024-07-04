import Link from 'next/link';

export default function NavBar() {
  return (
    <div className="left-0 flex flex-col gap-4 bg-slate-200 w-1/4 h-screen p-4 ">
      <Link
        href="/"
        className="flex justify-center w-full p-2 bg-green-300 cursor-pointer"
      >
        서비스로고명
      </Link>

      <Link
        href="/list"
        className="flex justify-center w-full p-2 bg-green-300 cursor-pointer"
      >
        상품목록
      </Link>
    </div>
  );
}
