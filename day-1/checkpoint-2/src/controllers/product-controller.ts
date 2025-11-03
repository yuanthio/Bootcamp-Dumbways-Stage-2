import { Request, Response } from "express";
import { Product, products } from "../models/product-model";

export const getProducts = (req: Request, res: Response) => {
  if (products.length === 0) {
    return res.json("Products empty");
  } else {
    res.json(products);
  }
};

export const createProduct = (req: Request, res: Response) => {
  const { name, price, stock } = req.body;
  const newProduct: Product = {
    id: products.length + 1,
    name,
    price,
    stock,
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
};

export const updateProduct = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, price, stock } = req.body;

  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.json("Product not found!");
  }

  if (name) product.name = name;
  if (price) product.price = price;
  if (stock) product.stock = stock;

  res.status(201).json(product);
};

export const deleteProduct = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.json("Product not found!");
  }

  const updatedProduct = products.filter((p) => p.id !== id);
  products.length = 0;
  products.push(...updatedProduct);
  res.status(201).json(updatedProduct);
};
