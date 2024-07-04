export default function TopBar() {
  return (
    <div className="flex items-center justify-between p-4 bg-red-200 w-full min-h-10">
      <div className="flex gap-1">
        <div>2024.07.04 (금) /</div> <div> 55℃</div>
      </div>
      <div>회원 이름</div>
    </div>
  );
}
