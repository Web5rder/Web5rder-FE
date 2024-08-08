const SERVER_URL = process.env.NEXT_PUBLIC_SERVER;

const headers = {
  'Content-Type': 'application/json',
};

export const putRequest = async (
  url: string,
  body: any = null,
  accessToken?: string,
) => {
  try {
    const response = await fetch(url, {
      method: 'PUT',
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

// 거래처 수정
export const putUpdateClient = async (
  clientContents: any,
  client_id: string,
) => {
  try {
    const url = `${SERVER_URL}/api/v1/clients/${client_id}/update`;
    return await putRequest(url, clientContents);
  } catch (error) {
    console.error('에러 : ', error);
    throw new Error('putUpdateClient 에러 발생');
  }
};

// ===== 관리자 =====
// 물품 수정
export const putUpdateProducts = async (
  productContents: any,
  product_id: string,
) => {
  try {
    const url = `${SERVER_URL}/api/v1/products${product_id}/update`;
    return await putRequest(url, productContents);
  } catch (error) {
    console.error(error);
    throw new Error('putUpdateProducts 에러 발생');
  }
};
