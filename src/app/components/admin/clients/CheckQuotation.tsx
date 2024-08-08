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
      <table className="table-auto border-collapse border border-gray-3">
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
    <div>
      <Input
        name="inputDate"
        className="bg-gray-0 p-3"
        inputType="date"
        onChange={(e) => setInputDate(e.target.value)}
        textValue={inputDate}
        placeholder="날짜 입력"
        type="default"
      />
      <Button
        className="border-2"
        buttonText="실행"
        type="default"
        onClickHandler={handleCheckQuotation}
      />
      {renderTable()}
    </div>
  );
}
