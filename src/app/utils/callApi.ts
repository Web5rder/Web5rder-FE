export async function callPost(endpoint: string, body: any) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_LOCAL_SERVER}${endpoint}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  );
  return response.json();
}

export async function callGet(endpoint: string, params?: string) {
  const url = params
    ? `${process.env.NEXT_PUBLIC_LOCAL_SERVER}${endpoint}?${params}`
    : `${process.env.NEXT_PUBLIC_LOCAL_SERVER}${endpoint}`;

  const response = await fetch(url, {
    method: 'GET',
  });

  return response.json();
}
