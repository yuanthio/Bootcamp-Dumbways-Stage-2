export interface Order {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  totalPrice: number;
}

export const orders: Order[] = [];
