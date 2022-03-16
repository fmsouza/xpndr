import { PrismaClient, Prisma } from '@prisma/client'
import { sha256 } from '../src/shared/utils'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Alice',
    email: 'alice@xpndr.io',
    password: sha256('123456')
  },
  {
    name: 'Nilu',
    email: 'nilu@xpndr.io',
    password: sha256('123456')
  },
  {
    name: 'Mahmoud',
    email: 'mahmoud@xpndr.io',
    password: sha256('123456')
  },
]

const accountTypeData: Prisma.AccountTypeCreateInput[] = [
  {
    title: 'Nubank',
    enabled: true
  }
];

async function main() {
  console.log(`Start seeding ...`);
  console.log(`Creating users...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }

  console.log(`Creating account types...`);]
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
