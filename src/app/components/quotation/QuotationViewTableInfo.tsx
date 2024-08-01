import { useModal } from '@/app/hooks/useModal';
import { formatDate } from '@/app/utils/date';
import QuotationModal from './modal/QuotationModal';

interface QuotationViewTableInfoProps {
  quoteView: QuotationViewInfoTypes;
  index: number;
}

const QuotationViewTableInfo = ({
  quoteView,
  index,
}: QuotationViewTableInfoProps) => {
  const { isOpen, openModal, closeModal, handleModalClick } = useModal(false);

  return (
    <div key={quoteView.id}>
      {isOpen && <QuotationModal closeModal={closeModal} id={quoteView.id} />}
      <div className="w-full pl-1 justify-start items-center gap-x-[20px] inline-flex h-[48px] text-lg">
        <div className="w-[108px] text-center">{index + 1}</div>
        <div className="w-[200px] text-center">
          {formatDate(quoteView.created_at)}
        </div>
        <div className="w-[250px] text-center">
          {formatDate(quoteView.updated_at)}
        </div>
        <div className="w-[170px] text-center">{quoteView.total_price}원</div>
        <div
          className="w-[58px] text-center cursor-pointer font-bold"
          onClick={openModal}
        >
          {'조회'}
        </div>
        <div className="w-[58px] text-center cursor-pointer font-bold text-primary-4">
          {'수정'}
        </div>
      </div>
      <div className="w-full h-[0px] border border-black" />
    </div>
  );
};

export default QuotationViewTableInfo;
