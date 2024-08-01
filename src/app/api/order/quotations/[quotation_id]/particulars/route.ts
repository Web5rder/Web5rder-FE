import { patchQuotationParticulars } from '@/app/service/patchRequest';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { quotation_id: string } },
): Promise<NextResponse> {
  try {
    const { quotation_id } = params;
    const body = await req.json();

    const response = await patchQuotationParticulars(body, quotation_id);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
