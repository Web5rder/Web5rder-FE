import { NextResponse } from 'next/server';
import { getSearchProducts } from '@/app/service/getRequest';
import { getCookie } from '@/app/utils/setTokens';

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const token = getCookie(request, 'accessToken');
    const url = new URL(request.url);
    const namePrefix = url.searchParams.get('name_prefix') || '';
    const limit = url.searchParams.get('limit') || '10';
    const cachedTime = url.searchParams.get('cached_time') || '300';

    const data = await getSearchProducts({
      namePrefix,
      limit,
      cachedTime,
      token,
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
