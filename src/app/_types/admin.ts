interface AdminItemProps {
  id: string | number;
  name: string;
  created_at: string;
  updated_at: string | null;
  status: string;
  total_price: number;
  past_order_id?: number;
}
