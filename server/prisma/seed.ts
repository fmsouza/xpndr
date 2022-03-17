import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient();

const accountTypeData: Prisma.AccountTypeCreateInput[] = [
  {
    title: 'Nubank',
    enabled: true
  }
];

async function main() {
  console.log(`Start seeding ...`);

  console.log(`Creating account types...`);
  for (const at of accountTypeData) {
    const accountType = await prisma.accountType.create({
      data: at,
    })
    console.log(`Created account type with id: ${accountType.id}`)
  }

  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
