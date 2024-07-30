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

interface PastOrder {
  past_order_id: number;
  name: string;
}
