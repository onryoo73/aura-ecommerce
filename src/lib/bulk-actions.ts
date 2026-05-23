"use server"

import { supabase } from "@/lib/supabase"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import * as XLSX from "xlsx"

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

  let imported = 0
  let errors = 0

  for (const row of rows) {
    const name = row["name"] || row["Name"] || row["NAME"]
    const description = row["description"] || row["Description"] || row["DESCRIPTION"]
    const priceRaw = row["price"] || row["Price"] || row["PRICE"]
    const image = row["image"] || row["Image"] || row["IMAGE"] || row["img"] || row["url"]
    const category = row["category"] || row["Category"] || row["CATEGORY"]
    const stockRaw = row["stock"] || row["Stock"] || row["STOCK"]

    if (!name || !priceRaw) {
      errors++
      continue
    }

    const price = Math.round(parseFloat(String(priceRaw).replace(/[^0-9.]/g, "")) * 100)
    const stock = parseInt(String(stockRaw || "0").replace(/[^0-9]/g, "")) || 0

    if (!price) {
      errors++
      continue
    }

    const { error } = await supabase.from("products").insert({
      name,
      description: description || "",
      price,
      image: image || "",
      category: category || "Other",
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
  }
}
