interface ProductsTypes {
  product: string;
  quantity: number;
  price: number;
  created_at: string;
  updated_at: string;
}

interface QuotationInfoTypes {
  products: ProductsTypes[];
  name: string;
  total: number;
  created_at: string;
  updated_at: string;
}

interface QuotationViewInfoTypes {
  id: number;
  name: string;
  total_price: number;
  created_at: string;
  updated_at: string;
}

type CheckTypes = 'week' | 'month' | 'date';
