import { MODAL_INFO } from '@/app/constants/quotation';
import { cancelIcon } from '@/app/ui/iconPath';
import Icons from '../../common/Icons';
import QuotationTable from './QuotationTable';
import QuotationSave from './QuotationSave';

const QuotationModal = () => {
  return (
    <div className="flex flex-col w-[680px] h-[780px] rounded-3xl px-8 py-7 bg-white relative">
      <div className="flex flex-row-reverse w-full cursor-pointer">
        <Icons name={cancelIcon} />
      </div>
      <div className="w-full h-[50px] flex text-lg font-light">
        <div className="text-5xl font-bold mr-6">{MODAL_INFO[0]}</div>
        <div className="flex gap-x-12 mt-6">
          <div className="flex gap-x-2">
            <div className="font-bold">{MODAL_INFO[1]}</div>
            <div>{`2024.07.07`}</div>
          </div>
          <div className="flex gap-x-2">
            <div className="font-bold">{MODAL_INFO[2]}</div>
            <div>{`yng1404@naver.com`}</div>
          </div>
        </div>
      </div>
      <div className="border-w-[600px] h-[0px] border-2 border-[#55aa00] mt-2.5"></div>
      <QuotationTable />
      <div className="w-[310px] h-14 items-center absolute right-12 bottom-12 flex text-black font-extrabold">
        <div className="w-[62px] text-3xl mt-2.5">
          {MODAL_INFO[3]}
        </div>
        <div className="flex flex-col w-[250px] h-14 items-center gap-y-1">
          <div className="w-[238px] h-[50px] text-black text-5xl font-bold">
            147,000원
          </div>
          <div className="w-full border-[1.5px] border-[#55aa00]"></div>
          <div className="w-full border-[1.5px] border-[#55aa00]"></div>
        </div>
      </div>
      <div className="absolute left-8 bottom-6">
        <QuotationSave />
    </div>
    </div>
  );
};

export default QuotationModal;
