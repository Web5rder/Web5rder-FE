import { callGet } from '@/app/utils/callApi';
import { useState } from 'react';
import Button from '../../common/Button';

export default function InquiryPastOrder({ clientId }: ClientIdProps) {
  const [result, setResult] = useState<{ result: AdminItemProps[] }>({
    result: [],
  });

  const handleGetPastOrders = async () => {
    try {
      const data = await callGet(`/api/order/${clientId}/get-past-order`);
      setResult(data);
    } catch (error) {
      console.error(error);
      setResult({ result: [] });
    }
  };

  const renderTable = () => {
    return (
      <table className="admin-table">
        <thead>
          <tr>
            <th className="admin-table-th">번호</th>
            <th className="admin-table-th">이름</th>
          </tr>
        </thead>
        <tbody>
          {result.result.map((item: AdminItemProps) => (
            <tr key={item.past_order_id}>
              <td className="admin-table-th">{item.past_order_id}</td>
              <td className="admin-table-th">{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="flex flex-col gap-4 border-2 p-8">
      <Button
        className="admin-btn"
        buttonText="실행"
        type="default"
        onClickHandler={handleGetPastOrders}
      />
      {renderTable()}
    </div>
  );
}
