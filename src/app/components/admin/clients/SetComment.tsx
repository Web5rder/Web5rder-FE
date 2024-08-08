import { callPatch } from '@/app/utils/callApi';
import { useState } from 'react';
import Input from '../../common/Input';
import Button from '../../common/Button';

export default function SetComment({ clientId }: ClientIdProps) {
  const [inputComment, setInputComment] = useState('');

  const handleSetComment = async () => {
    try {
      await callPatch(
        `/api/admin/clients/${clientId}/comment`,
        `input_comment=${inputComment}`,
      );
      alert('특이사항이 저장되었습니다.');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex gap-4 border-2 p-8">
      <div className="flex gap-4 items-center">
        <p className="whitespace-nowrap">특이사항 입력</p>
        <Input
          name="inputComment"
          className="admin-input"
          type="default"
          onChange={(e) => setInputComment(e.target.value)}
          textValue={inputComment}
          placeholder="특이사항 입력"
        />
      </div>

      <Button
        className="admin-btn"
        buttonText="실행"
        type="default"
        onClickHandler={handleSetComment}
      />
    </div>
  );
}
