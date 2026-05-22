import { PrismaClient } from '../src/generated/prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import 'dotenv/config'
import bcrypt from 'bcryptjs'

const dbPath = process.env.DATABASE_URL?.replace('file:', '') || 'dev.db'
const adapter = new PrismaBetterSqlite3({ url: dbPath })
const prisma = new PrismaClient({ adapter })

const products = [
  {
    name: "Classic White Tee",
    description: "Premium cotton essential t-shirt with a perfect fit.",
    price: 3500,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
    category: "Clothing",
    stock: 50,
    isFeatured: true,
  },
  {
    name: "Minimalist Watch",
    description: "Sleek timepiece with a leather strap and brushed steel finish.",
    price: 12000,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
    category: "Accessories",
    stock: 20,
    isFeatured: true,
  },
  {
    name: "Leather Sneakers",
    description: "Handcrafted low-top sneakers in Italian leather.",
    price: 18000,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800",
    category: "Footwear",
    stock: 15,
    isFeatured: true,
  },
  {
    name: "Cashmere Beanie",
    description: "Ultra-soft cashmere wool beanie for cold days.",
    price: 5500,
    image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&q=80&w=800",
    category: "Accessories",
    stock: 30,
    isFeatured: true,
  },
  {
    name: "Canvas Tote Bag",
    description: "Durable organic canvas tote for your daily essentials.",
    price: 2500,
    image: "https://images.unsplash.com/photo-1544816153-12ad5d713312?auto=format&fit=crop&q=80&w=800",
    category: "Accessories",
    stock: 100,
    isFeatured: false,
  },
  {
    name: "Wool Overcoat",
    description: "Structured wool blend coat with a modern silhouette.",
    price: 29500,
    image: "https://images.unsplash.com/photo-1539533377285-a92cc8e77142?auto=format&fit=crop&q=80&w=800",
    category: "Clothing",
    stock: 10,
    isFeatured: false,
  },
  {
    name: "Desert Boots",
    description: "Classic suede boots with a crepe sole.",
    price: 14500,
    image: "https://images.unsplash.com/photo-1520639889458-71d3beeef9c3?auto=format&fit=crop&q=80&w=800",
    category: "Footwear",
    stock: 25,
    isFeatured: false,
  },
  {
    name: "Silk Scarf",
    description: "Lustrous silk scarf with a minimal geometric print.",
    price: 7500,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800",
    category: "Accessories",
    stock: 40,
    isFeatured: false,
  },
]

async function main() {
  console.log('Start seeding...')

  // Seed Admin User
  const adminEmail = "admin@aura.com"
  const adminPassword = "Admin123!"
  const hashedAdminPassword = await bcrypt.hash(adminPassword, 10)

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Admin User",
      password: hashedAdminPassword,
      isAdmin: true,
    },
  })
  console.log(`Admin user created: ${adminEmail}`)

  for (const p of products) {
    const product = await prisma.product.create({
      data: p,
    })
    console.log(`Created product with id: ${product.id}`)
  }
  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

  
