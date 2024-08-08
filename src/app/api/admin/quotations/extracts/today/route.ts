// 오늘 날짜의 모든 견적서 excel 파일로 추출

import { getAdminQuotationsExtractsToday } from '@/app/service/getRequest';
import { NextResponse } from 'next/server';

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const url = new URL(req.url);
    const input_date = url.searchParams.get('input_date') || '';

    const data = await getAdminQuotationsExtractsToday(input_date);
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
