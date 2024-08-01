import { QUOTATION_MANAGE } from '@/app/constants/quotation';
import { useModal } from '@/app/hooks/useModal';
import { callDelete } from '@/app/utils/callApi';
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

  const deleteQuotation = async (id: number) => {
    const data = await callDelete(`/api/quotation/delete?id=${id}`);
    console.log(data.result, '삭제 후 응답');
  };

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
          className="w-[42px] text-center cursor-pointer font-bold"
          onClick={openModal}
        >
          {QUOTATION_MANAGE[0]}
        </div>
        <div className="w-[42px] text-center cursor-pointer font-bold text-primary-4">
          {QUOTATION_MANAGE[1]}
        </div>
        <div
          className="w-[42px] text-center cursor-pointer font-bold text-red-1"
          onClick={() => deleteQuotation(quoteView.id)}
        >
          {QUOTATION_MANAGE[2]}
        </div>
      </div>
      <div className="w-full h-[0px] border border-black" />
    </div>
  );
};

export default QuotationViewTableInfo;
