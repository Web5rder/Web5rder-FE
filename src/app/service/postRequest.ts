const SERVER_URL = process.env.NEXT_PUBLIC_SERVER;

const headers = {
  'Content-Type': 'application/json',
};

export const postRequest = async (
  url: string,
  body: any = null,
  accessToken?: string,
) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
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

// 로그인 요청
export const postLogin = async (signInContents: any) => {
  try {
    const url = `${SERVER_URL}/api/v1/token`;
    const params = new URLSearchParams();
    params.append('username', signInContents.email);
    params.append('password', signInContents.pwd);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: params.toString(),
      //  params.toString() === username=test@example.com&password=qwe12#
    });

    if (!response.ok) {
      throw new Error('로그인 요청 실패');
    }

    return await response.json();
  } catch (error) {
    console.error('에러 : ', error);
    throw new Error('postLogin 에러 발생');
  }
};

// user 가입
export const postSignUp = async (signUpContents: any) => {
  try {
    const url = `${SERVER_URL}/api/v1/users`;
    return await postRequest(url, signUpContents);
  } catch (error) {
    console.error('에러 : ', error);
    throw new Error('postSignUp 에러 발생');
  }
};

// 거래처 생성
export const postClient = async (clientContents: any, accessToken?: string) => {
  try {
    const url = `${SERVER_URL}/api/v1/clients`;
    return await postRequest(url, clientContents, accessToken);
  } catch (error) {
    console.error('에러 : ', error);
    throw new Error('postClient 에러 발생');
  }
};

// 주문 내역 생성
export const postPastOrder = async (pastOrderContents: any) => {
  try {
    const url = `${SERVER_URL}/api/v1/past-order`;
    return await postRequest(url, pastOrderContents);
  } catch (error) {
    console.error('에러 :', error);
    throw new Error('postPastOrder 에러 발생');
  }
};

// 견적서 생성
export const postQuotations = async (quotationContents: any) => {
  try {
    const url = `${SERVER_URL}/api/v1/quotations`;
    return await postRequest(url, quotationContents);
  } catch (error) {
    console.error('에러 :', error);
    throw new Error('postQuotations 에러 발생');
  }
};

// 견적서 물품 생성
export const postQuotationsProducts = async (
  quotationContents: any,
  accessToken?: string,
) => {
  try {
    const url = `${SERVER_URL}/api/v1/quotations/products`;
    return await postRequest(url, quotationContents, accessToken);
  } catch (error) {
    console.error('에러 :', error);
    throw new Error('postQuotationsProducts 에러 발생');
  }
};

// ===== 관리자 =====
// 물건 견적서 파일 업로드
export const postAdminProductsUpload = async (productsContents: any) => {
  try {
    const url = `${SERVER_URL}/api/v1/products/upload`;
  } catch (error) {
    console.error('에러 : ', error);
    throw new Error('postAdminProductUpload 에러 발생');
  }
};

// 물품 추가 생성
export const postAdminProducts = async (productsContents: any) => {
  try {
    const url = `${SERVER_URL}/api/v1/products`;
    return await postRequest(url, productsContents);
  } catch (error) {
    console.error('에러 : ', error);
    throw new Error('postAdminProducts 에러 발생');
  }
};
