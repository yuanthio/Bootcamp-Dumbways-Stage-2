import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Hapus semua data lama (biar seed ulang bersih)
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Seed data users
  await prisma.user.createMany({
    data: [
      { name: "Yuanthio Virly", email: "yuan@gmail.com" },
      { name: "Fatur", email: "fatur@gmail.com" },
      { name: "Rahman", email: "rahman@gmail.com" },
      { name: "Salsa", email: "salsa@gmail.com" },
      { name: "Dimas", email: "dimas@gmail.com" },
    ],
  });

  // Seed data categories
  await prisma.category.createMany({
    data: [
      { name: "Teknologi" },
      { name: "Olahraga" },
      { name: "Musik" },
      { name: "Kuliner" },
      { name: "Game" },
    ],
  });

  // Seed data posts
  await prisma.post.createMany({
    data: [
      {
        title: "Belajar Prisma untuk Pemula",
        content: "Panduan dasar menggunakan ORM Prisma di Node.js.",
        userId: 1,
        categoryId: 1,
      },
      {
        title: "Latihan React dan Express",
        content: "Cara menghubungkan frontend dan backend.",
        userId: 2,
        categoryId: 1,
      },
      {
        title: "Resep Nasi Goreng Enak",
        content: "Langkah-langkah membuat nasi goreng yang gurih.",
        userId: 3,
        categoryId: 4,
      },
      {
        title: "Tips Bermain Futsal",
        content: "Teknik dasar futsal untuk pemula.",
        userId: 4,
        categoryId: 2,
      },
      {
        title: "Lagu Pop Terbaru 2025",
        content: "Daftar lagu populer tahun ini.",
        userId: 5,
        categoryId: 3,
      },
    ],
  });

  // Seed data comments
  await prisma.comment.createMany({
    data: [
      { content: "Wah artikelnya keren banget!", postId: 1 },
      { content: "Terima kasih infonya!", postId: 1 },
      { content: "Aku coba resepnya, berhasil!", postId: 3 },
      { content: "Mantap sekali tipsnya!", postId: 4 },
      { content: "Lagu nomor 2 favoritku!", postId: 5 },
      { content: "React memang keren!", postId: 2 },
      { content: "Aku baru tahu fitur Prisma ini", postId: 1 },
      { content: "Tambahin contoh kodenya dong", postId: 2 },
      { content: "Kapan bahas backend-nya?", postId: 1 },
      { content: "Thanks udah sharing!", postId: 3 },
    ],
  });
}

main()
  .then(() => {
    console.log("Seeding berhasil!");
  })
  .catch((err) => {
    console.error("Seeding gagal:", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
