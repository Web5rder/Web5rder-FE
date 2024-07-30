import { MODAL_TEXT } from '@/app/constants/order';
import CameraIcon from '@/app/ui/Icons/Camera';

const QuotationSave = () => {
  return (
    <div className="flex-center w-[152px] h-10 border-2 rounded-3xl border-black gap-x-1 cursor-pointer">
      <CameraIcon />
      <div className="text-lg">{MODAL_TEXT[4]}</div>
    </div>
  );
};

export default QuotationSave;
