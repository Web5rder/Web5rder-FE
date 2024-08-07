// 거래처 견적서 기간에 따른 조회

import { NextResponse } from 'next/server';
import { getAdminClientQuotationsDate } from '@/app/service/getRequest';

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const url = new URL(req.url);
    const client_id = url.searchParams.get('client_id') || '';
    const date_range_type = url.searchParams.get('date_range_type') || '';
    const start_date = url.searchParams.get('start_date') || '';
    const end_date = url.searchParams.get('end_date') || '';
    const page = url.searchParams.get('page') || '';
    const page_size = url.searchParams.get('page_size') || '';

    const data = await getAdminClientQuotationsDate(
      client_id,
      date_range_type,
      start_date,
      end_date,
      page,
      page_size,
    );
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
