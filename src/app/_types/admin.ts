interface AdminHeaderProps {
  isActive: string;
}

interface AdminPageProps {
  searchParams: { page: string };
}

interface ClientIdProps {
  clientId: string;
}

interface AdminItemProps {
  id: number;
  name: string;
  created_at: string;
  updated_at: string | null;
  status: string;
  total_price: number;
}

interface AdminItemProps {
  past_order_id: number;
  name: string;
}

interface CheckQuotationResult {
  client_id: number;
  status: boolean;
}
