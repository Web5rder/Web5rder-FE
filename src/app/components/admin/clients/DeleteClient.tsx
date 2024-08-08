import { callDelete } from '@/app/utils/callApi';
import Button from '../../common/Button';

export default function DeleteClient({ clientId }: ClientIdProps) {
  const handleDeleteClient = async () => {
    try {
      const data = await callDelete(`/api/admin/clients/${clientId}/delete`);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button
        className="border-2"
        buttonText="실행"
        type="default"
        onClickHandler={handleDeleteClient}
      />
    </div>
  );
}
