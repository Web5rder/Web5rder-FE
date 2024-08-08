import { callGet } from '@/app/utils/callApi';
import { useState } from 'react';
import Input from '../../common/Input';
import Button from '../../common/Button';

export default function CheckQuotation({ clientId }: ClientIdProps) {
  const [inputDate, setInputDate] = useState('');
  const [result, setResult] = useState<{ result: CheckQuotationResult | null }>(
    { result: null },
  );

  const handleCheckQuotation = async () => {
    try {
      const data = await callGet(
        `/api/admin/clients/${clientId}/check`,
        `input_date=${inputDate}`,
      );
      setResult(data);
    } catch (error) {
      console.error(error);
      setResult({ result: null });
    }
  };

  const renderTable = () => {
    if (!result.result) return null;
    return (
      <table className="admin-table">
        <thead>
          <tr>
            <th className="admin-table-th">번호</th>
            <th className="admin-table-th">상태</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="admin-table-th">{result.result.client_id}</td>
            <td className="admin-table-th">
              {result.result.status ? '제출' : '미제출'}
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  return (
    <div className="flex flex-col gap-4 border-2 p-8">
      <div className="flex w-full gap-12">
        <div className="flex gap-4 items-center">
          <p className="whitespace-nowrap">날짜 입력</p>
          <Input
            name="inputDate"
            className="admin-input"
            inputType="date"
            onChange={(e) => setInputDate(e.target.value)}
            textValue={inputDate}
            placeholder="날짜 입력"
            type="default"
          />
        </div>

        <Button
          className="admin-btn"
          buttonText="실행"
          type="default"
          onClickHandler={handleCheckQuotation}
        />
      </div>
      {renderTable()}
    </div>
  );
}
