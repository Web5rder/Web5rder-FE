const SERVER_URL = process.env.NEXT_PUBLIC_SERVER;

export const getSearchProducts = async ({
  namePrefix,
  limit,
  cachedTime,
  token,
}) => {
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
