import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const getOrdersSummary = async (req: Request, res: Response) => {
  const { limit, offset } = req.query;

  try {
    const summary = await prisma.order.groupBy({
      by: ["userId"],
      _count: { id: true },
      _sum: { quantity: true },
      orderBy: {
        userId: "asc",
      },
      skip: offset ? Number(offset) : undefined,
      take: limit ? Number(limit) : undefined,
    });

    const result = await Promise.all(
        summary.map(async (item) => {
            const user = await prisma.user.findUnique({where: { id: item.userId}});
            return {
                userId: item.userId,
                name: user?.name,
                totalOrders: item._count.id,
                totalQuantity: item._sum.quantity 
            };
        })
    );

    const total = summary.length;

    res.status(200).json({
      message: "Summary pesanan berhasil ditampilkan",
      data: result,
      total
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mendapatkan summary pesanan" });
  }
};
