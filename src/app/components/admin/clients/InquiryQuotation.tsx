import { callGet } from '@/app/utils/callApi';
import { useState } from 'react';
import Input from '../../common/Input';
import Button from '../../common/Button';

export default function InquiryQuotation({ clientId }: ClientIdProps) {
  const [page, setPage] = useState('');
  const [pageSize, setPageSize] = useState('');
  const [result, setResult] = useState<{ result: { items: AdminItemProps[] } }>(
    { result: { items: [] } },
  );

  const handleGetQuotations = async () => {
    try {
      const data = await callGet(
        `/api/admin/clients/${clientId}/quotations`,
        `page=${page}&page_size=${pageSize}`,
      );
      setResult(data);
    } catch (error) {
      console.error(error);
      setResult({ result: { items: [] } });
    }
  };

  const renderTable = () => {
    return (
      <table className="table-auto border-collapse border border-gray-3">
        <thead>
          <tr>
            <th className="admin-table-th">번호</th>
            <th className="admin-table-th">이름</th>
            <th className="admin-table-th">생성일</th>
            <th className="admin-table-th">수정일</th>
            <th className="admin-table-th">상태</th>
            <th className="admin-table-th">가격</th>
          </tr>
        </thead>
        <tbody>
          {result.result.items.map((item: AdminItemProps) => (
            <tr key={item.id}>
              <td className="admin-table-th">{item.id}</td>
              <td className="admin-table-th">{item.name}</td>
              <td className="admin-table-th">{item.created_at}</td>
              <td className="admin-table-th">{item.updated_at || 'N/A'}</td>
              <td className="admin-table-th">{item.status}</td>
              <td className="admin-table-th">{item.total_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <Input
        name="page"
        className="bg-gray-0 p-3"
        type="default"
        onChange={(e) => setPage(e.target.value)}
        textValue={page}
        placeholder="페이지"
      />
      <Input
        name="pageSize"
        className="bg-gray-0 p-3"
        type="default"
        onChange={(e) => setPageSize(e.target.value)}
        textValue={pageSize}
        placeholder="페이지 크기"
      />
      <Button
        className="border-2"
        buttonText="실행"
        type="default"
        onClickHandler={handleGetQuotations}
      />
      {renderTable()}
    </div>
  );
}
