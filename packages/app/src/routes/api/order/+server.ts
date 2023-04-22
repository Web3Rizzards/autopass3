import { json, type RequestHandler } from "@sveltejs/kit";
import { createOrder, getOrders } from "../../../lib/server/database";
import type { Order } from "../../../types";

const toObject = (map = new Map()): any =>
  Object.fromEntries(
    Array.from(map.entries(), ([k, v]) => (v instanceof Map ? [k, toObject(v)] : [k, v]))
  );

export const GET: RequestHandler = async () => {
  const response = getOrders();
  const obj = toObject(response);

  return json(obj);
};

export const POST: RequestHandler = async ({ request }) => {
  const body: Order = await request.json();
  const response = createOrder(body);

  return json(response);
};
