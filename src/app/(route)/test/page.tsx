'use client';

import { ToastContainer } from 'react-toastify';
import { testAlert, testAlert2 } from '@/app/utils/toast';
import 'react-toastify/dist/ReactToastify.css';

const testpage = () => {
  return (
    <div className="w-full h-full flex items-center justify-center text-white text-3xl">
      {/* <ToastContainer style={{ width: 400, height: 180 }} />  다음과 같이 알림창 크기 조정 가능 */}
      <ToastContainer />
      <button
        type="button"
        onClick={testAlert}
        className="bg-slate-400 rounded-3xl m-4 p-3"
      >
        알림창 테스트 버튼
      </button>
      <button
        type="button"
        onClick={testAlert2}
        className="bg-slate-400 rounded-3xl m-4 p-3"
      >
        알림창 테스트 버튼(error버전 + 이모지x)
      </button>
    </div>
  );
};

export default testpage;
