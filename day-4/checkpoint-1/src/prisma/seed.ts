import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.user.deleteMany();

    await prisma.user.createMany({
        data: [
            {name: "Yuanthio Virly", email: "yuan@gmail.com", points: 5000},
            {name: "Fatur", email: "fatur@gmail.com", points: 6000},
            {name: "rahman", email: "rahman@gmail.com", points: 7000},
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