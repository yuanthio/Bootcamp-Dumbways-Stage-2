import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        points: true,
      },
    });

    if (users.length === 0) {
      return res.status(404).json({ message: "Data masih kosong" });
    }

    res
      .status(200)
      .json({ message: "Data user berhasil ditampilkan", data: users });
  } catch (err) {
    console.error(err);
    res.status(500).json("Gagal menampilkan data");
  }
};

export const transferPoints = async (req: Request, res: Response) => {
  try {
    const { amount, seenderId, receiverId } = req.body;

    if (amount <= 0) {
      return res
        .status(400)
        .json({ status: 404, message: "Jumlah tidak boleh kosong" });
    }

    const [sender, receiver] = await Promise.all([
      prisma.user.findUnique({ where: { id: seenderId } }),
      prisma.user.findUnique({ where: { id: receiverId } }),
    ]);

    if (!sender) {
      return res.status(404).json({ message: "Pengirim tidak ditemukan!" });
    }

    if (!receiver) {
      return res.status(404).json({ message: "Penerima tidak ditemukan!" });
    }

    if (sender.points < amount) {
      return res.status(400).json({ message: "Point tidak mencukupi" });
    }

    const result = await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: seenderId },
        data: { points: { decrement: amount } },
      });

      await tx.user.update({
        where: { id: receiverId },
        data: { points: { increment: amount } },
      });
    });

    res.status(200).json({ message: "Transaksi berhasil", data: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Transaksi gagal" });
  }
};
