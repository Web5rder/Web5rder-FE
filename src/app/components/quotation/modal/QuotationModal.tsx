import { cancelIcon } from '@/app/ui/iconPath';
import Icons from '../../common/Icons';

const QuotationModal = () => {
  return (
    <div className="w-[800px] h-[840px] rounded-3xl p-9">
      <div className="flex">
        {' '}
        <Icons name={cancelIcon} />
      </div>
      <div>견적서</div>
    </div>
  );
};

export default QuotationModal;
