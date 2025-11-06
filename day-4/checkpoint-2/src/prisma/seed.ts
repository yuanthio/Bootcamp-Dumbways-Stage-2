import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.stock.deleteMany();
  await prisma.supplier.deleteMany();
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: [
      { name: "Laptop", price: 8500000, stock: 20 },
      { name: "Keyboard", price: 250000, stock: 50 },
      { name: "Monitor", price: 1800000, stock: 15 },
    ],
  });

  await prisma.supplier.createMany({
    data: [
      { name: "PT Sumber Jaya" },
      { name: "CV Maju Abadi" },
      { name: "PT Elektronik Nusantara" },
    ],
  });

  await prisma.stock.createMany({
    data: [
      { productId: 1, supplierId: 1, quantity: 10 },
      { productId: 2, supplierId: 2, quantity: 20 },
      { productId: 3, supplierId: 3, quantity: 5 },
      { productId: 1, supplierId: 1, quantity: -3 },
    ],
  });
}

main()
  .then(() => {
    console.log("✅ Seeding selesai!");
  })
  .catch((err) => {
    console.error("Error seeding:", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
