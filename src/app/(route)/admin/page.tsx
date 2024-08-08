import AdminContainer from '@/app/components/admin/container/AdminContainer';

export default function Admin() {
  return (
    <section>
      <div className="bg-white w-full h-full flex relative">
        <div className="flex flex-col w-full">
          <AdminContainer />
        </div>
      </div>
    </section>
  );
}
