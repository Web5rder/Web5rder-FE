import { NextResponse } from 'next/server';
import { getSearchProducts } from '@/app/service/getRequest';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const namePrefix = url.searchParams.get('name_prefix') || '';
    const limit = url.searchParams.get('limit') || '10'; // default value: 10
    const cachedTime = url.searchParams.get('cached_time') || '300'; // default value: 300
    const token = request.headers.get('access-token') || '';

    console.log(`Request URL: ${url}`);
    console.log(`namePrefix: ${namePrefix}`);
    console.log(`limit: ${limit}`);
    console.log(`cachedTime: ${cachedTime}`);
    console.log(`Token: ${token}`);

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
