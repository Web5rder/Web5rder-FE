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
    return await response.json();
  } catch (err) {
    throw err;
  }
};

export const deleteQuotation = async (id: string) => {
  const url = `${SERVER_URL}/api/v1/quotations/${id}/delete`;
  return deleteRequest(url);
};

// ===== 관리자 =====
// 거래처 삭제
export const deleteAdminClient = async (client_id: string) => {
  const url = `${SERVER_URL}/api/v1/clients/${client_id}/delete`;
  return deleteRequest(url);
};
