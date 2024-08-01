const SERVER_URL = process.env.NEXT_PUBLIC_SERVER;

const commonHeaders = {
  'Content-Type': 'application/json',
};

const deleteRequest = async (url: string) => {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: commonHeaders,
    });
    return response.json();
  } catch (err) {
    console.log('Error in delete:', err);
  }
};

export const deleteQuotation = async (id: string) => {
  const url = `${SERVER_URL}/api/v1/quotations/${id}/delete`;
  console.log(url, '로 삭제요청');

  return await deleteRequest(url);
};
