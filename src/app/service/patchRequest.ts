const SERVER_URL = process.env.NEXT_PUBLIC_SERVER;

const headers = {
  'Content-Type': 'application/json',
};

export const patchRequest = async (
  url: string,
  body: any = null,
  accessToken?: string,
) => {
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        ...headers,
        ...(accessToken && { 'access-token': accessToken }),
      },
      body: JSON.stringify(body),
    });

    return await response.json();
  } catch (error) {
    console.error('에러 : ', error);
    throw new Error('요청 실패');
  }
};

// 견적서 작성 확정
export const patchQuotationConfirm = async (
  quotationContents: any,
  quotation_id: string,
) => {
  try {
    const url = `${SERVER_URL}/api/v1/quotations/${quotation_id}/confirmation`;
    return await patchRequest(url, quotationContents);
  } catch (error) {
    console.error('에러 : ', error);
    throw new Error('patchQuotationConfirm 에러 발생');
  }
};

// 견적서 특이사항 작성
export const patchQuotationParticulars = async (
  quotationContents: any,
  quotation_id: string,
) => {
  try {
    const url = `${SERVER_URL}/api/v1/quotations/${quotation_id}/particulars`;
    return await patchRequest(url, quotationContents);
  } catch (error) {
    console.error('에러 : ', error);
    throw new Error('patchQuotationParticulars 에러 발생');
  }
};
