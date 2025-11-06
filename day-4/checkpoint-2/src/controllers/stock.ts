import { Request, Response } from "express";
import { prisma } from "../prisma/client";
import { StockError } from "../errors/StockError";

export const getProducts = async (req:Request, res:Response) => {
  try {
    const products = await prisma.product.findMany();

    if (products.length === 0) {
      return res.status(404).json({ message: "Data masih kosong" });
    }

    res.status(200).json({message: "Produk berhasil ditampilkan", data: products});
  } catch (err) {
    console.error(err);
    res.status(500).json({message: "Gagal menampilkan produk"});
  }
}

export const getLogStocks = async (req:Request, res:Response) => {
  try {
    const logStocks = await prisma.stock.findMany();

    if (logStocks.length === 0) {
      return res.status(404).json({ message: "Data masih kosong" });
    }

    res.status(200).json({message: "Riwayat transaksi berhasil ditampilkan", data: logStocks});
  } catch (err) {
    console.error(err);
    res.status(500).json({message: "Gagal menampilkan riwayat transaksi"});
  }
}


export const updateStockFromSuppliers = async (req: Request, res: Response) => {
  const { updates } = req.body;

  if (!updates || !Array.isArray(updates)) {
    throw new StockError("Format body tidak valid");
  }

  try {
    const txResult = await prisma.$transaction(async (tx) => {
      for (const upd of updates) {
        const { productId, supplierId, quantity } = upd;

        const supplier = await tx.supplier.findUnique({ where: { id: supplierId } });
        if (!supplier) throw new StockError(`Supplier dengan ID ${supplierId} tidak ditemukan`, 404);

        const product = await tx.product.findUnique({ where: { id: productId } });
        if (!product) throw new StockError(`Product dengan ID ${productId} tidak ditemukan`, 404);

        const newStock = product.stock + quantity;

        if (newStock < 0) {
          throw new StockError(
            `Update tidak valid: Stok product ${product.name} akan menjadi negatif (${newStock})`
          );
        }

        await tx.stock.create({
          data: { productId, supplierId, quantity }
        });

        await tx.product.update({
          where: { id: productId },
          data: { stock: newStock }
        });
      }

      return { success: true };
    });

    res.status(200).json({
      message: "Stock berhasil diperbarui",
      result: txResult
    });
  } catch (err) {
    throw err; 
  }
};
