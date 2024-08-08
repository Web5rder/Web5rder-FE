import { callDelete } from '@/app/utils/callApi';
import Button from '../../common/Button';

export default function DeleteClient({ clientId }: ClientIdProps) {
  const handleDeleteClient = async () => {
    try {
      await callDelete(`/api/admin/clients/${clientId}/delete`);
      alert('거래처가 삭제되었습니다.');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 border-2 p-8">
      <Button
        className="border-2 border-red-1 w-fit px-8"
        buttonText="실행"
        type="default"
        onClickHandler={handleDeleteClient}
      />
    </div>
  );
}
