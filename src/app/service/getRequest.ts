const SERVER_URL = process.env.NEXT_PUBLIC_SERVER;
const commonHeaders = {
  'Content-Type': 'application/json',
};
export interface searchProductsProps {
  namePrefix: string;
  limit: string;
  cachedTime: string;
  token: string;
}

// 내 정보 조회
export const getUsers = async (token: string) => {
  try {
    const url = `${SERVER_URL}/api/v1/users/me`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'access-token': token,
      },
    });

    if (!response.ok) {
      throw new Error(
        `내 정보 조회(getRequest) fetch 실패: ${response.statusText}`,
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
};

// 상품 검색
export const getSearchProducts = async ({
  namePrefix,
  limit,
  cachedTime,
  token,
}: searchProductsProps) => {
  try {
    const url = `${SERVER_URL}/api/v1/products/search/recent?name_prefix=${namePrefix}&limit=${limit}&cached_time=${cachedTime}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'access-token': token,
      },
    });

    if (!response.ok) {
      throw new Error(`getRequest 데이터 fetch 실패: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`Response data: ${JSON.stringify(data)}`);
    return data;
  } catch (error) {
    console.error('Error: ', error);
    throw error;
  }
};

// 주문 내역 상세 불러오기
export const getPastOrder = async (past_order_id: string) => {
  try {
    const url = `${SERVER_URL}/api/v1/past-order/${past_order_id}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`getRequest 데이터 fetch 실패: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`Response data: ${JSON.stringify(data)}`);
    return data;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
};

// 합계 금액 업데이트
export const getQuotationTotal = async (quotation_id: string) => {
  try {
    const url = `${SERVER_URL}/api/v1/quotations/${quotation_id}/total`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`getRequest 데이터 fetch 실패: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`Response data: ${JSON.stringify(data)}`);
    return data;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
};

// 거래처 주문 내역 조회
export const getClientPastOrder = async (client_id: string) => {
  try {
    const url = `${SERVER_URL}/api/v1/clients/${client_id}/past-order`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });

    if (!response.ok) {
      throw new Error(
        `getClientPastOrder 데이터 fetch 실패: ${response.statusText}`,
      );
    }
    console.log('전체 응답:', response);
    const data = await response.json();
    console.log(`Response data: ${JSON.stringify(data)}`);
    return data;
  } catch (error) {
    console.error('Error: ', error);
    throw error;
  }
};

const getRequest = async (url: string, token?: string) => {
  try {
    const headers = token
      ? { ...commonHeaders, 'access-token': token }
      : { ...commonHeaders };
    const response = await fetch(url, { headers }).then((res) => res.json());
    return response;
  } catch (error) {
    return error;
  }
};

export const getQuotation = async (
  client_id: string,
  date: string,
  accessToken: string,
) => {
  const url =
    date === 'all'
      ? `${SERVER_URL}/api/v1/clients/${client_id}/quotations`
      : `${SERVER_URL}/api/v1/clients/${client_id}/quotations/date?date_range_type=${date}`;
  return getRequest(url, accessToken);
};

export const getQuotationDetail = async (
  quotationId: string,
  accessToken: string,
) => {
  const url = `${SERVER_URL}/api/v1/quotations/${quotationId}`;
  return getRequest(url, accessToken);
};
