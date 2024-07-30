import React from 'react';
import ProductItem, { ProductItemProps } from './ProductItem';
import {
  PRODUCT_TEXT,
  ORDER_TEXT,
  categoryMapping,
} from '../../constants/order';

interface ProductListProps {
  items: ProductItemProps[];
  isSearchResult: boolean;
  addedItems?: ProductItemProps[];
  onAddItem?: (item: ProductItemProps) => void;
  onRemoveItem: (id: string | undefined) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  items,
  isSearchResult,
  addedItems,
  onAddItem,
  onRemoveItem,
}) => {
  return (
    <div
      className={`${isSearchResult ? 'bg-primary-4 mt-4 w-full' : 'w-full bg-primary-4 mt-4'}`}
    >
      {isSearchResult ? (
        <div className="flex text-white font-black py-1 pl-4 pr-6 whitespace-nowrap">
          <div className="w-[7%] pl-4">{PRODUCT_TEXT[0]}</div>
          <div className="w-[7%]">{PRODUCT_TEXT[1]}</div>
          <div className="w-[60%] pl-4">{PRODUCT_TEXT[2]}</div>
          <div className="w-[10%] text-center">{PRODUCT_TEXT[3]}</div>
          <div className="w-[8%] text-right pr-2">{PRODUCT_TEXT[4]}</div>
          <div className="w-[8%] text-right pr-8">{PRODUCT_TEXT[5]}</div>
        </div>
      ) : (
        <div className="flex text-white font-black px-4 py-1">
          {ORDER_TEXT[3]}
        </div>
      )}

      <div
        className={`bg-white px-3 ${isSearchResult ? 'h-80' : 'h-48'} flex-col border-2 whitespace-nowrap overflow-scroll`}
      >
        {items.map((item) => (
          <ProductItem
            key={item.id}
            category={
              isSearchResult ? categoryMapping[item.category] : item.category
            }
            id={item.id}
            name={item.name}
            isAdded={
              isSearchResult
                ? !!addedItems?.find((addedItem) => addedItem.id === item.id)
                : true
            }
            unit={item.unit}
            count={!isSearchResult ? item.count || '1' : undefined}
            onAddItem={onAddItem}
            onRemoveItem={onRemoveItem}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
