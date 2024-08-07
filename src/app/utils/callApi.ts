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

export async function callPatch(endpoint: string, params?: string) {
  const url = params
    ? `${process.env.NEXT_PUBLIC_LOCAL_SERVER}${endpoint}?${params}`
    : `${process.env.NEXT_PUBLIC_LOCAL_SERVER}${endpoint}`;

  const response = await fetch(url, {
    method: 'PATCH',
  });

  return response.json();
}

export async function callGet(endpoint: string, params?: string) {
  const url = params
    ? `${process.env.NEXT_PUBLIC_LOCAL_SERVER}${endpoint}?${params}`
    : `${process.env.NEXT_PUBLIC_LOCAL_SERVER}${endpoint}`;

  const response = await fetch(url);
  return response.json();
}

export async function callDelete(endpoint: string, params?: string) {
  const url = params
    ? `${process.env.NEXT_PUBLIC_LOCAL_SERVER}${endpoint}?${params}`
    : `${process.env.NEXT_PUBLIC_LOCAL_SERVER}${endpoint}`;

  const response = await fetch(url, {
    method: 'DELETE',
  });
  return response.json();
}

export async function callPut(endpoint: string, body: any, params?: string) {
  const url = params
    ? `${process.env.NEXT_PUBLIC_LOCAL_SERVER}${endpoint}?${params}`
    : `${process.env.NEXT_PUBLIC_LOCAL_SERVER}${endpoint}`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return response.json();
}
