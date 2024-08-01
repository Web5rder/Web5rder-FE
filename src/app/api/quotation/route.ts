import { getQuotation } from '@/app/service/getRequest';
import { getCookie } from '@/app/utils/setTokens';
import { NextResponse } from 'next/server';

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const token = getCookie(req, 'accessToken');
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id') || '';
    console.log(id,'로 요청');
    
    const data = await getQuotation(id, token);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json('Internal Server Error');
  }
}
