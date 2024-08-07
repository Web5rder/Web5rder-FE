// 거래처 주문 내역 조회

import { NextResponse } from 'next/server';
import { getAdminClientPastOrder } from '@/app/service/getRequest';

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const url = new URL(req.url);
    const client_id = url.searchParams.get('client_id') || '';

    const data = await getAdminClientPastOrder(client_id);
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
