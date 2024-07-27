import { getUsers } from '@/app/service/getRequest';
import { NextResponse } from 'next/server';

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const token = request.headers.get('access-token') || '';

    const data = await getUsers(token);
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error: ', error);
    return NextResponse.json({ error: '인터넷 서버 에러' }, { status: 500 });
  }
}
