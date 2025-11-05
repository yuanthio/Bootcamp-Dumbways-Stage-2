import { prisma } from "../prisma/client";
import { Request, Response } from "express";

export const getPosts = async (req: Request, res: Response) => {
  const { categoryId, limit, offset } = req.query;

  try {
    const filters: any = {};
    if (categoryId) filters.categoryId = Number(categoryId);

    const posts = await prisma.post.findMany({
      where: filters,
      include: {
        user: { select: { id: true, name: true } },
        category: { select: { id: true, name: true } },
      },
      skip: offset ? Number(offset) : undefined,
      take: limit ? Number(limit) : undefined,
      orderBy: { createdAt: "desc" },
    });

    const total = await prisma.post.count({ where: filters });

    res.status(200).json({
      message: "Daftar post berhasil ditampilkan",
      data: posts,
      total,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mendapatkan daftar post" });
  }
};

export const getCommentsByPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { limit, offset } = req.query;

  try {
    const comments = await prisma.comment.findMany({
      where: { postId: Number(id) },
      orderBy: { createdAt: "desc" },
      skip: offset ? Number(offset) : undefined,
      take: limit ? Number(limit) : undefined,
    });

    const total = await prisma.comment.count({ where: { postId: Number(id) } });

    res.status(200).json({
      message: "Komentar berhasil ditampilkan",
      data: comments,
      total,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mendapatkan komentar" });
  }
};

export const getCommentsSummary = async (req: Request, res: Response) => {
  const { limit, offset, minComments } = req.query;

  try {
    const summary = await prisma.comment.groupBy({
      by: ["postId"],
      _count: { id: true },
      having: minComments
        ? { id: { _count: { gt: Number(minComments) } } }
        : undefined,
      orderBy: { postId: "asc" },
      skip: offset ? Number(offset) : undefined,
      take: limit ? Number(limit) : undefined,
    });

    const total = summary.length;

    const result = await Promise.all(
      summary.map(async (item) => {
        const post = await prisma.post.findUnique({
          where: { id: item.postId },
          select: { title: true, user: { select: { name: true } } },
        });
        return {
          postId: item.postId,
          title: post?.title,
          author: post?.user.name,
          totalComments: item._count.id,
        };
      })
    );

    res.status(200).json({
      message: "Summary komentar per post berhasil ditampilkan",
      data: result,
      total,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mendapatkan summary komentar" });
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
