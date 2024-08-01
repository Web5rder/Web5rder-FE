import QuotationModal from '@/app/components/quotation/modal/QuotationModal';

const QuotationPage = () => {
  return (
    <div className="w-full h-screen flex-center bg-primary-4">
      <QuotationModal closeModal={() => console.log('삭제')} id={0} />
    </div>
  );
};

export default QuotationPage;
