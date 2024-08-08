'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function KakaoAuth() {
  // const router = useRouter(); 나중에 POST 성공 시 링크 이동 추가
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      console.log('카카오 코드 : ', code);
    }
  }, [searchParams]);

  return <div>카카오 로그인</div>;
}
