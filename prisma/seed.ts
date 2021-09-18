import { PrismaClient, Prisma, shops } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { ulid } from 'ulid';

const salt = bcrypt.genSaltSync(10);
const hashed_password = bcrypt.hashSync("password", salt);

const prisma = new PrismaClient()

const shopData: shops[] = [
  {
    id: ulid(),
    name: 'テスト店舗',
    hashed_password,
    remember_token: Math.random().toString(32).substring(2),
    created_at: new Date(),
    updated_at: new Date(),
    // products: {
    //   create: [
    //     {
    //       name: 'Join the Prisma Slack',
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //     },
    //   ],
    // },
  }
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of shopData) {
    const shop = await prisma.shops.create({
      data: u,
    })
    console.log(`Created user with id: ${shop.name}`)
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
