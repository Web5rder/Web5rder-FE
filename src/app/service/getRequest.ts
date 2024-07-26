const SERVER_URL = process.env.NEXT_PUBLIC_SERVER;

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
      throw new Error(`getRequest 데이터 fetch 실패: ${response.statusText}`);
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
    const url = `${SERVER_URL}/api/v1/products/search/?name_prefix=${namePrefix}&limit=${limit}&cached_time=${cachedTime}`;
    console.log(`getRequest 요청 URL: ${url}`);
    console.log(`getRequest Token: ${token}`);

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
