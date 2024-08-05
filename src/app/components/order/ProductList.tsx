import React from 'react';
import ProductItem from './ProductItem';
import {
  PRODUCT_TEXT,
  ORDER_TEXT,
  categoryMapping,
} from '../../constants/order';

export default function ProductList({
  items,
  isSearchResult,
  addedItems,
  onAddItem,
  onRemoveItem,
  onCountChange,
}: ProductListProps) {
  return (
    <div className="bg-primary-4 mt-4 w-full">
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
            onCountChange={onCountChange}
          />
        ))}
      </div>
    </div>
  );
}
