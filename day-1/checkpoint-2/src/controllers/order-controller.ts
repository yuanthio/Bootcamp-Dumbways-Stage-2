import { Request, Response } from "express";
import { Order, orders } from "../models/order-model";
import { products } from "../models/product-model";

export const getOrders = (req: Request, res: Response) => {
  if (orders.length === 0) {
    return res.status(404).json("Order kosong!");
  } else {
    res.json(orders);
  }
};

export const createOrder = (req: Request, res: Response) => {
  const { productId, quantity } = req.body;
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json("Produk tidak ada!");
  }

  if (quantity > product.stock) {
    return res.status(404).json("Stok tidak cukup!");
  }

  const totalPrice = product.price * quantity;

  const newOrder: Order = {
    id: orders.length + 1,
    productId,
    productName: product.name,
    quantity,
    totalPrice,
  };

  product.stock -= quantity;
  orders.push(newOrder);
  res.status(201).json(newOrder);
};

export const deleteOrder = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return res.status(404).json("Orderan tidak ada!");
  }

  const product = products.find(p => p.id === order.productId)
  
  if(product) {
    product.stock += order.quantity;
  }

  const newOrder = orders.filter(o => o.id !== id);
  orders.length = 0;
  orders.push(...newOrder);
  res.status(201).json(newOrder);
};
