const SERVER_URL = process.env.NEXT_PUBLIC_SERVER;

const patchRequest = async (url: string) => {
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`patch 데이터 fetch 실패: ${response.statusText}`);
  }

  const data = await response.json();
  console.log(`Response data: ${JSON.stringify(data)}`);
  return data;
};

// 견적서 작성 확정
export const patchQuotationConfirm = async ({
  quotation_id,
}: quotationIdProps) => {
  try {
    const url = `${SERVER_URL}/api/v1/quotations/${quotation_id}/confirmation`;
    return await patchRequest(url);
  } catch (error) {
    console.error('에러 : ', error);
    throw new Error('patchQuotationConfirm 에러 발생');
  }
};

// 견적서 특이사항 작성
export const patchQuotationParticulars = async ({
  quotation_id,
  particulars,
}: patchQuotationPartiProps) => {
  try {
    const url = `${SERVER_URL}/api/v1/quotations/${quotation_id}/particulars?particulars=${particulars}`;
    return await patchRequest(url);
  } catch (error) {
    console.error('에러 : ', error);
    throw new Error('patchQuotationParticulars 에러 발생');
  }
};
