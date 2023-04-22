import type { Order, Payment } from "../../types";

/**
 * Mock Database
 */
const database = new Map();

export function getOrder(orderId: string) {
  return database.get(orderId).values();
}

export function getOrders() {
  return database.get("orders");
}

export function createOrder(data: Order) {
  if (!database.has("orders")) {
    database.set("orders", new Map());
  }

  const orders = database.get("orders");
  const id = crypto.randomUUID();

  if (!orders.has(id)) {
    orders.set(id, {
      id,
      item: data.item,
      amountReceived: 0,
      completed: false,
    });
  }

  return id;
}

export function createPayment(data: Payment): string {
  const id = crypto.randomUUID();
  return id;
}

export function getPayment(paymentId: string): Payment {
  return { paymentId, orderId: "1", amount: "1" };
}
