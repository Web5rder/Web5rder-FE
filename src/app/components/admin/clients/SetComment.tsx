import { callPatch } from '@/app/utils/callApi';
import { useState } from 'react';
import Input from '../../common/Input';
import Button from '../../common/Button';

export default function SetComment({ clientId }: ClientIdProps) {
  const [inputComment, setInputComment] = useState('');

  const handleSetComment = async () => {
    try {
      const data = await callPatch(
        `/api/admin/clients/${clientId}/comment`,
        `input_comment=${inputComment}`,
      );
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Input
        name="inputComment"
        className="bg-gray-0 p-3"
        type="default"
        onChange={(e) => setInputComment(e.target.value)}
        textValue={inputComment}
        placeholder="특이사항 입력"
      />
      <Button
        className="border-2"
        buttonText="실행"
        type="default"
        onClickHandler={handleSetComment}
      />
    </div>
  );
}
