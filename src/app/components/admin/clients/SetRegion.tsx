import { callPatch } from '@/app/utils/callApi';
import { useState } from 'react';
import Button from '../../common/Button';

export default function SetRegion({ clientId }: ClientIdProps) {
  const [region, setRegion] = useState('');

  const handleSetRegion = async () => {
    try {
      await callPatch(
        `/api/admin/clients/${clientId}/region`,
        `region=${region}`,
      );
      alert('해당 거래처의 지역이 변경되었습니다.');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex gap-4 border-2 p-8">
      <select
        className="border-2"
        name="region"
        onChange={(e) => setRegion(e.target.value)}
        value={region}
      >
        <option value="">지역을 선택하세요</option>
        <option value="노원">노원</option>
        <option value="의정부">의정부</option>
        <option value="강남">강남</option>
        <option value="건대">건대</option>
        <option value="신촌">신촌</option>
      </select>

      <Button
        className="border-2 w-fit px-8"
        buttonText="실행"
        type="default"
        onClickHandler={handleSetRegion}
      />
    </div>
  );
}
