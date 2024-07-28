import { getUsers } from '@/app/service/getRequest';
import { getCookie } from '@/app/utils/setTokens';
import { NextResponse } from 'next/server';

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const token = getCookie(request, 'accessToken');
    console.log('내 토큰', token);
    const data = await getUsers(token);
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error: ', error);
    return NextResponse.json({ error: '인터넷 서버 에러' }, { status: 500 });
  }
}
