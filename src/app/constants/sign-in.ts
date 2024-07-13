const SignInConstants = {
  EMAIL: '이메일',
  CHANGE_PWD: '비밀번호 변경',
  PWD: '비밀번호',
  PWD_CONFIRM: '비밀번호 확인',
  LOGIN: '로그인',
  SIGN_UP: '회원가입',

  REGION: '지역',
  NAME: '거래처명',
  ADDRESS: '거래처 주소',
} as const;

const SignInPlaceholder = {
  EMAIL: 'user@example.com',
  PWD: '영문, 숫자, 특수기호를 포함하는 6자 이상의 비밀번호를 입력해주세요.',
  PWD_CONFIRM: '********',

  REGION: '지역명을 입력해주세요 예)인천 부평구, 성남시 수정구',
  NAME: '거래처명을 정확히 입력해주세요.',
  ADDRESS: '거래처 주소를 정확히 입력해주세요.',
} as const;

const SignUpError = {
  EMAIL: '유효하지 않은 이메일 형식입니다.',
  EMAIL_DPLCT: '이미 사용 중인 이메일입니다.',
  PWD: '영문, 숫자, 특수기호를 포함하는 6자 이상의 비밀번호를 입력해주세요.',
  PWD_CONFIRM: '비밀번호가 일치하지 않습니다.',
} as const;

const SignInData = {
  SignInConstants,
  SignInPlaceholder,
  SignUpError,
};

export default SignInData;

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

export const clientMapping: { [key: string]: string } = {
  region: '지역',
  name: '거래처명',
  address: '거래처주소',
};
