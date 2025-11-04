import { prisma } from "../connection/client";
import { Request, Response } from "express";

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: true,
      },
    });
    if (posts.length === 0) {
      return res.status(404).json({ message: "Belum ada postingan!" });
    }

    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mendapatkan data postingan!" });
  }
};

export const findPost = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        user: true,
      }
    });

    if (!post) {
      return res.status(404).json({ message: "Postingan tidak ditemukan!" });
    }

    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mendapatkan data postingan!" });
  }
};

export const createPosts = async (req: Request, res: Response) => {
  try {
    const { title, content, userId } = req.body;
    const post = await prisma.post.create({
      data: { title, content, userId: parseInt(userId) },
    });

    res.status(201).json({ message: "Berhasil tambah postingan", post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal tambah data postingan!" });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { title, content } = req.body;
    const post = await prisma.post.update({
      where: { id },
      data: { title, content, },
    });

    if (!post) {
      return res.status(404).json({ message: "Postingan tidak ditemukan" });
    }

    res.status(200).json({ message: "Berhasil update postingan", post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal update data postingan!" });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const post = await prisma.post.delete({
      where: { id },
    });

    if (!post) {
      return res.status(404).json({ message: "Postingan tidak ditemukan" });
    }

    res.status(200).json({ message: "Berhasil hapus postingan", post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal hapus data postingan!" });
  }
};
