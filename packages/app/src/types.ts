export interface Order {
  orderId?: string;
  item: string;
  amount: string;
  amountReceived?: number;
  completed?: boolean;
}

export interface Payment {
  paymentId: string;
  orderId: string;
  amount: string;
}
