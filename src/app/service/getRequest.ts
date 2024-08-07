const SERVER_URL = process.env.NEXT_PUBLIC_SERVER;
const commonHeaders = {
  'Content-Type': 'application/json',
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

// 내 정보 조회
export const getUsers = async (token: string) => {
  const url = `${SERVER_URL}/api/v1/users/me`;
  return getRequest(url, token);
};

// 상품 검색
export const getSearchProducts = async ({
  namePrefix,
  limit,
  cachedTime,
  token,
}: searchProductsProps) => {
  const url = `${SERVER_URL}/api/v1/products/search/recent?name_prefix=${namePrefix}&limit=${limit}&cached_time=${cachedTime}`;
  return getRequest(url, token);
};

// 즐겨찾기 상세 불러오기
export const getPastOrder = async (past_order_id: string) => {
  const url = `${SERVER_URL}/api/v1/past-order/${past_order_id}`;
  return getRequest(url);
};

// 합계 금액 업데이트
export const getQuotationTotal = async (quotation_id: string) => {
  const url = `${SERVER_URL}/api/v1/quotations/${quotation_id}/total`;
  return getRequest(url);
};

// 거래처 주문 내역 조회(URL 캐시 버스팅 사용)
export const getClientPastOrder = async (client_id: string) => {
  const url = `${SERVER_URL}/api/v1/clients/${client_id}/past-order?_t=${Date.now()}`;
  return getRequest(url);
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

// ===== 관리자 =====
// 거래처 명으로 조회
export const getAdminClientName = async (name: string) => {
  const url = `${SERVER_URL}/api/v1/clients/name${name}`;
  return getRequest(url);
};

// 거래처 지역으로 조회
export const getAdminClientRegion = async (region: string) => {
  const url = `${SERVER_URL}/api/v1/clients/region?region=${region}`;
  return getRequest(url);
};

// 거래처 견적서 조회
export const getAdminClientQuotations = async (
  client_id: string,
  page: string,
  page_size: string,
) => {
  const url = `${SERVER_URL}/api/v1/clients/${client_id}/quotations?page=${page}&page_size=${page_size}`;
  return getRequest(url);
};

// 거래처 견적서 기간에 따른 조회
export const getAdminClientQuotationsDate = async (
  client_id: string,
  date_range_type: string,
  start_date: string,
  end_date: string,
  page: string,
  page_size: string,
) => {
  const url = `${SERVER_URL}/api/v1/clients/${client_id}/quotations/date?date_range_type=${date_range_type}&start_date=${start_date}&end_date=${end_date}&page=${page}&page_size=${page_size}`;
  return getRequest(url);
};

// 거래처 주문 내역 조회
export const getAdminClientPastOrder = async (client_id: string) => {
  const url = `${SERVER_URL}/api/v1/clients/${client_id}/past-order`;
  return getRequest(url);
};

// 거래처 해당 날짜 견적서 제출 여부 파악
export const getAdminClientCheck = async (
  client_id: string,
  input_date: string,
) => {
  const url = `${SERVER_URL}/api/v1/clients/${client_id}/check?input_date=${input_date}`;
  return getRequest(url);
};
