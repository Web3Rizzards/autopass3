import type { Order, Payment } from "../../types";

import { BigNumber } from "ethers";

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
  if (!database.has("payments")) {
    database.set("payments", new Map());
  }
  if (!database.has("orders")) {
    database.set("orders", new Map());
  }

  const orders = database.get("orders");
  console.log("🚀 | createOrder | orders:", orders);
  const id = crypto.randomUUID();

  if (!orders.has(id)) {
    orders.set(id, {
      orderId: id,
      item: data.item,
      amountReceived: BigNumber.from(0),
      completed: false,
    });
  }

  return id;
}

export function createPayment(data: Payment): string {
  console.log("🚀 | createPayment | data:", data);
  if (!database.has("payments")) {
    database.set("payments", new Map());
  }
  if (!database.has("orders")) {
    database.set("orders", new Map());
  }
  const payments = database.get("payments");
  const orders = database.get("orders");
  console.log("🚀 | createPayment | orders:", orders);

  if (!orders.has(data.orderId)) {
    console.log("Order ID Does not exist");
    return "";
  }

  const id = crypto.randomUUID();

  // Create new payment
  if (!payments.has(id)) {
    payments.set(id, {
      paymentId: id,
      orderId: data.orderId,
      amount: data.amount,
      userAddress: data.userAddress,
    });
  }

  // Update order
  const order: Order = orders.get(data.orderId);
  order.amountReceived = order.amountReceived?.add(data.amount);

  if (order.amountReceived?.gte(order.item.amount)) {
    order.completed = true;
  }

  console.log(order);

  return id;
}
