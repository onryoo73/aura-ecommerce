import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import bcrypt from 'bcryptjs'

// Load .env manually
const env = fs.readFileSync('.env', 'utf-8')
env.split('\n').forEach(line => {
  const [key, ...rest] = line.split('=')
  if (key && rest.length) {
    process.env[key.trim()] = rest.join('=').trim().replace(/^["']|["']$/g, '')
  }
})

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

const products = [
  { name: "Hello Week 001", description: "Premium minimal white t-shirt featuring the Hello Week cartoon typography. Sturdy heavyweight cotton.", price: 3000, image: "/images/hello_week_001.png", category: "APPAREL", stock: 50, isFeatured: true },
  { name: "Hello Week 002", description: "Classic black t-shirt with Hello Week sun print on the back. Relaxed fit.", price: 3000, image: "/images/hello_week_002.png", category: "APPAREL", stock: 50, isFeatured: true },
  { name: "Monochrome Manifest", description: "Sleek black tote bag with double stitched black ++ logo details.", price: 3000, image: "/images/monochrome_manifest.png", category: "APPAREL", stock: 50, isFeatured: true },
  { name: "Neutral Grotesk", description: "Black canvas tote bag featuring bold white 'Say Hello' design.", price: 3000, image: "/images/neutral_grotesk.png", category: "APPAREL", stock: 50, isFeatured: true },
  { name: "Red Dot Not Award", description: "Vibrant red knit beanie with double folded edge. Made of soft premium wool.", price: 2000, image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&q=80&w=800", category: "APPAREL", stock: 50, isFeatured: true },
  { name: "Contrast Grid Typeface", description: "Brutalist metallic silver tote bag with grid lines and typography styling, complete with tag.", price: 3000, image: "https://images.unsplash.com/photo-1544816153-12ad5d713312?auto=format&fit=crop&q=80&w=800", category: "APPAREL", stock: 50, isFeatured: true },
  { name: "Off by Design", description: "Deconstructed fit top with offset paneling and raw edge finish.", price: 3300, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800", category: "APPAREL", stock: 50, isFeatured: true },
  { name: "Kerned Confidence", description: "Tailored fit knit shirt emphasizing typographical proportions and spacing.", price: 2500, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800", category: "APPAREL", stock: 50, isFeatured: true },
  { name: "Specimen No. HH01", description: "Limited edition apparel specimen piece highlighting high-fashion industrial aesthetics.", price: 3000, image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=800", category: "APPAREL", stock: 50, isFeatured: true },
  { name: "Grid System Go", description: "Structured design garment aligning with strict grid rules and layouts.", price: 3000, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800", category: "APPAREL", stock: 50, isFeatured: true }
]

async function main() {
  console.log('Start seeding...')

  const { error: deleteError } = await supabase.from('products').delete().neq('id', 'none')
  if (deleteError) console.error('Error clearing products:', deleteError)

  const adminEmail = "admin@aura.com"
  const adminPassword = "Admin123!"
  const hashedAdminPassword = await bcrypt.hash(adminPassword, 10)

  const { error: upsertError } = await supabase.from('users').upsert({
    email: adminEmail,
    name: "Admin User",
    password: hashedAdminPassword,
    isAdmin: true,
  }, { onConflict: 'email' })

  if (upsertError) {
    console.error('Error creating admin:', upsertError)
  } else {
    console.log(`Admin user created: ${adminEmail}`)
  }

  for (const p of products) {
    const { error } = await supabase.from('products').insert(p)
    if (error) {
      console.error(`Error creating product ${p.name}:`, error)
    } else {
      console.log(`Created product: ${p.name}`)
    }
  }

  console.log('Seeding finished.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
