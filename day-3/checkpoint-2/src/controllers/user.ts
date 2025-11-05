import { prisma } from "../prisma/client";
import { Request, Response } from "express";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        posts: true,
      },
    });
    if (users.length === 0) {
      return res.status(404).json({ message: "Belum ada user!" });
    }

    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mendapatkan data user!" });
  }
};

export const findUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        posts: true,
      }
    });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan!" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mendapatkan data user!" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const post = await prisma.user.create({
      data: { name, email },
    });

    res.status(201).json({ message: "Berhasil tambah user", post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal tambah data user!" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;
    const user = await prisma.user.update({
      where: { id },
      data: { name, email },
    });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    res.status(200).json({ message: "Berhasil update user", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal update data user!" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.post.deleteMany({
      where: { userId: id },
    });

    const user = await prisma.user.delete({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    res.status(200).json({ message: "Berhasil hapus user", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal hapus data user!" });
  }
};
