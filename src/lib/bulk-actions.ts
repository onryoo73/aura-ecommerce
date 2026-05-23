"use server"

import { supabase } from "@/lib/supabase"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import * as XLSX from "xlsx"

function findColumn(rows: Record<string, string>[], keys: string[]): string | undefined {
  for (const row of rows) {
    for (const ek of Object.keys(row)) {
      const normalized = ek.trim().toLowerCase().replace(/[\s_-]+/g, "")
      if (keys.some(k => normalized === k.toLowerCase().replace(/[\s_-]+/g, ""))) {
        return ek
      }
    }
  }
  return undefined
}

export async function bulkAddProducts(formData: FormData) {
  const session = await auth()
  if (!session?.user?.isAdmin) {
    return { error: "Unauthorized" }
  }

  const file = formData.get("file") as File
  if (!file) {
    return { error: "No file provided" }
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const workbook = XLSX.read(buffer, { type: "buffer" })
  const sheet = workbook.Sheets[workbook.SheetNames[0]]
  const rows = XLSX.utils.sheet_to_json<Record<string, string>>(sheet)

  if (rows.length === 0) {
    return { error: "Excel file is empty" }
  }

  const detectedColumns = Object.keys(rows[0])

  const nameCol = findColumn(rows, ["name", "productname", "product name", "product_name", "item", "title"])
  const descCol = findColumn(rows, ["description", "desc", "productdescription", "product description"])
  const priceCol = findColumn(rows, ["price", "regularprice", "regular price", "amount", "cost", "unitprice"])
  const imageCol = findColumn(rows, ["image", "images", "img", "imageurl", "image_url", "url", "photo", "picture"])
  const catCol = findColumn(rows, ["category", "categories", "cat", "productcategory", "type", "department"])
  const stockCol = findColumn(rows, ["stock", "quantity", "qty", "inventory", "units", "count"])

  let imported = 0
  let errors = 0
  const errorDetails: string[] = []

  for (const row of rows) {
    const name = nameCol ? String(row[nameCol] || "").trim() : ""
    const description = descCol ? String(row[descCol] || "").trim() : ""
    const priceRaw = priceCol ? String(row[priceCol] || "").trim() : ""
    const image = imageCol ? String(row[imageCol] || "").trim() : ""
    const category = catCol ? String(row[catCol] || "").trim() : ""
    const stockRaw = stockCol ? String(row[stockCol] || "").trim() : ""

    if (!name) {
      errors++
      continue
    }

    const priceCents = Math.round(parseFloat(priceRaw.replace(/[^0-9.]/g, "")) * 100)
    if (!priceCents && priceCents !== 0) {
      errors++
      continue
    }

    const stock = parseInt(stockRaw.replace(/[^0-9]/g, "")) || 0

    const { error } = await supabase.from("products").insert({
      name: name.slice(0, 255),
      description: description.slice(0, 2000),
      price: priceCents,
      image: image.slice(0, 500),
      category: category.slice(0, 100) || "Other",
      stock,
    })

    if (error) {
      errors++
    } else {
      imported++
    }
  }

  revalidatePath("/admin/products")

  return {
    success: true,
    imported,
    errors,
    total: rows.length,
    detectedColumns,
  }
}
