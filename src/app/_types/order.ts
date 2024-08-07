interface OrderState {
  dialog: boolean;
  showBookmark: boolean;
  alert: boolean;
  search: string;
  bookmarkName: string;
  quotation: boolean;
}

interface ProductsTypes {
  product: string;
  quantity: number;
  price: number;
  created_at: string;
  updated_at: string;
}

interface User {
  isSuccess: boolean;
  code: string;
  message: string;
  category: string;
  result: {
    client_id: number;
    email: string;
    id: number;
    is_active: boolean;
  };
}

interface searchProductsProps {
  namePrefix: string;
  limit: string;
  cachedTime: string;
  token: string;
}

interface PastOrder {
  past_order_id: number;
  name: string;
}

interface ProductItemProps {
  category: string;
  id?: string;
  name: string;
  count?: string;
  isAdded?: boolean;
  isEdited?: boolean;
  unit: string;
  onAddItem?: (item: ProductItemProps) => void;
  onRemoveItem?: (id: string | undefined) => void;
  onCountChange?: (id: string | undefined, value: string) => void;
}

interface ProductListProps {
  items: ProductItemProps[];
  isSearchResult: boolean;
  addedItems?: ProductItemProps[];
  onAddItem?: (item: ProductItemProps) => void;
  onRemoveItem: (id: string | undefined) => void;
  onCountChange?: (id: string | undefined, value: string) => void;
}

interface quotationIdProps {
  quotation_id: string;
}

interface patchQuotationPartiProps extends quotationIdProps {
  particulars: string;
}

interface QuotationModalProps {
  QuotationModalData: any;
  closeModal: () => void;
  quotationId?:string
}
