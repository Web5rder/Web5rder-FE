import { MAIN_MODAL_TEXT } from '@/app/constants/main';
import { useRouter } from 'next/navigation';
import Button from '../common/Button';

const LoginModal = () => {
  const router = useRouter();
  return (
    <div className="w-[720px] h-[240px] flex-center gap-y-9 flex-col bg-white border-2 rounded-[80px] border-black">
      <div className="w-[360px] h-[86px] text-center text-[#306317] text-[32px] font-medium">
        {MAIN_MODAL_TEXT[0]}
      </div>
      <div className="flex gap-x-6">
        <Button
          buttonText={MAIN_MODAL_TEXT[1]}
          type="modalLogin"
          onClickHandler={() => router.push('sign-in/sign-up')}
        />
        <Button
          buttonText={MAIN_MODAL_TEXT[2]}
          type="modalSignup"
          onClickHandler={() => router.push('sign-in')}
        />
      </div>
    </div>
  );
};

export default LoginModal;
