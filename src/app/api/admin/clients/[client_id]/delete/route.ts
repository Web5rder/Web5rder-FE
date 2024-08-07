// 거래처 삭제

import { NextResponse } from 'next/server';
import { deleteAdminClient } from '@/app/service/deleteRequest';

export async function DELETE(req: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const client_id = searchParams.get('client_id') || '';

    const data = await deleteAdminClient(client_id);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json('Internal Server Error');
  }
}
