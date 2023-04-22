import type { BigNumber } from "ethers";

export interface Order {
  orderId?: string;
  item: OrderDetails;
  amountReceived?: BigNumber;
  completed?: boolean;
}

export interface OrderDetails {
  location: string;
  licensePlate: string;
  fuelAmount: string;
  amount: BigNumber; // in XDAI
}

export interface Payment {
  paymentId: string;
  orderId: string;
  amount: string;
}
