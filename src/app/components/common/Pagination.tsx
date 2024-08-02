import { leftAngle, rightAngle } from '@/app/ui/iconPath';
import ReactPaginate from 'react-paginate';
import Icons from './Icons';

interface PaginationProps {
  totalPages: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  onPageChange,
}) => {
  return (
    <ReactPaginate
      className="flex items-center justify-center mt-8 h-[40px] w-full gap-[20px] text-[17px] text-[#868686] font-semibold"
      previousLabel={
        <div className="pt-0.5">
          <Icons name={leftAngle} />
        </div>
      }
      nextLabel={
        <div className="pt-0.5">
          <Icons name={rightAngle} />
        </div>
      }
      pageCount={totalPages}
      onPageChange={onPageChange}
      activeClassName="active text-[#306317]"
    />
  );
};

export default Pagination;
