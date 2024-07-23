import { NextResponse } from 'next/server';
import { postSignUp } from '@/app/service/postRequest';

// 단일 export만 존재할 때 default 없이 쓰기 위해
export default async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json();
    const response = await postSignUp(body);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('에러 : ', error);
    return NextResponse.json({ error: '가입 요청 실패' });
  }
}
//  Next.js의 API 라우트에서는 명명된 export를 사용해야 함
