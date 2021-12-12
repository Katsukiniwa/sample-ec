import { PrismaClient, shops } from '@prisma/client';
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
  }
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of shopData) {
    const shop = await prisma.shops.create({
      data: {
        ...u,
        products: {
          create: {
            id: ulid(),
            name: "大人用パーカー",
            options: {
              createMany: {
                data: [
                  {
                    id: ulid(),
                    name: 'サイズ',
                  },
                  {
                    id: ulid(),
                    name: 'カラー'
                  }
                ],
              }
            }
          },
        }
      },
    })
    const size = await prisma.product_options.findFirst({
      where: {
        name: 'サイズ'
      }
    })
    if (!size) {
      throw new Error('size not found')
    }
    await prisma.product_option_values.createMany({
      data: [
        {
          id: ulid(),
          product_option_id: size?.id,
          value: 'Sサイズ',
        },
        {
          id: ulid(),
          product_option_id: size?.id,
          value: 'Mサイズ',
        },
        {
          id: ulid(),
          product_option_id: size?.id,
          value: 'Lサイズ',
        },
      ]
    })
    const color = await prisma.product_options.findFirst({
      where: {
        name: 'カラー'
      }
    })
    if (!color) {
      throw new Error('color not found')
    }
    await prisma.product_option_values.createMany({
      data: [
        {
          id: ulid(),
          product_option_id: color?.id,
          value: '白',
        },
        {
          id: ulid(),
          product_option_id: color?.id,
          value: '黒',
        }
      ]
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
