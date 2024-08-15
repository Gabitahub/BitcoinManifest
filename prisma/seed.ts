import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const alice = await prisma.user.createMany({
    data: Array.from({ length: 300 }).map((a, index) => {
      return {
        name: `alice${index}`,
        sub: `alice|${index}`,
        sid: `alice|${index}`,
        image: "https://pbs.twimg.com/profile_images/1613155367831191552/zProc3y0.jpg",
        displayName: `alice${index}`,
      };
    }),
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
