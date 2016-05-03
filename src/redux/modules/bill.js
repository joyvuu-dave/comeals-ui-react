/* @flow */
export type CookPayload = {
  resident_id: number
};

export type CostPayload = {
  amount: string
};

export type BillSchema = {
  id: number,
  resident_id: number,
  amount: string
};
