import { json, type RequestHandler } from "@sveltejs/kit";
import { createPayment } from "../../../lib/server/database";
import type { Payment } from "../../../types";

const toObject = (map = new Map()): any =>
  Object.fromEntries(
    Array.from(map.entries(), ([k, v]) => (v instanceof Map ? [k, toObject(v)] : [k, v]))
  );

export const POST: RequestHandler = async ({ request }) => {
  const body: Payment = await request.json();
  const response = createPayment(body);

  return json(response);
};
