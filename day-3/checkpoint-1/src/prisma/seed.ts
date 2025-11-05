import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.user.deleteMany();
    await prisma.product.deleteMany();
    await prisma.order.deleteMany();

    await prisma.user.createMany({
        data: [
            {name: "Yuanthio Virly", email: "yuan@gmail.com"},
            {name: "Fatur", email: "fatur@gmail.com"},
            {name: "rahman", email: "rahman@gmail.com"},
        ]
    });

    await prisma.product.createMany({
        data: [
            {name: "Baju", price: 20000, stock: 10},
            {name: "Celana", price: 25000, stock: 15},
            {name: "Topi", price: 25000, stock: 13},
        ]
    });

    await prisma.order.createMany({
        data: [
            {userId: 1, productId: 1, quantity: 3},
            {userId: 2, productId: 2, quantity: 2},
            {userId: 3, productId: 3, quantity: 1},
        ]
    });
}

main().then(() => {
    console.log("Seeding berhasil")
}).catch(err => {
    console.log(err);
}).finally(async () => {
    await prisma.$disconnect();
});