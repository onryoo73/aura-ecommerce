"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

async function checkAdmin() {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    throw new Error("Unauthorized");
  }
}

export async function deleteProduct(id: string) {
  await checkAdmin();

  await supabase.from("products").delete().eq("id", id);

  revalidatePath("/admin/products");
}

export async function addProduct(formData: FormData) {
  await checkAdmin();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const priceDollars = parseFloat(formData.get("price") as string);
  const image = formData.get("image") as string;
  const category = formData.get("category") as string;
  const stock = parseInt(formData.get("stock") as string);

  await supabase.from("products").insert({
    name,
    description,
    price: Math.round(priceDollars * 100),
    image,
    category,
    stock,
  });

  revalidatePath("/admin/products");
  revalidatePath("/");
  redirect("/admin/products");
}

export async function updateProduct(id: string, formData: FormData) {
  await checkAdmin();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const priceDollars = parseFloat(formData.get("price") as string);
  const image = formData.get("image") as string;
  const category = formData.get("category") as string;
  const stock = parseInt(formData.get("stock") as string);

  await supabase
    .from("products")
    .update({
      name,
      description,
      price: Math.round(priceDollars * 100),
      image,
      category,
      stock,
    })
    .eq("id", id);

  revalidatePath("/admin/products");
  revalidatePath(`/product/${id}`);
  revalidatePath("/");
  redirect("/admin/products");
}

export async function updateOrderStatus(formData: FormData) {
  await checkAdmin();

  const id = formData.get("id") as string;
  const status = formData.get("status") as string;

  await supabase.from("orders").update({ status }).eq("id", id);

  revalidatePath("/admin/orders");
}

export async function addPromoItem(formData: FormData) {
  await checkAdmin();

  const name = formData.get("name") as string;
  const priceDollars = parseFloat(formData.get("price") as string) || 0;
  const sortOrder = parseInt(formData.get("sort_order") as string) || 0;

  await supabase.from("promo_banner").insert({
    name,
    price: Math.round(priceDollars * 100),
    sort_order: sortOrder,
  });

  revalidatePath("/admin/promo");
  revalidatePath("/");
}

export async function deletePromoItem(id: string) {
  await checkAdmin();

  await supabase.from("promo_banner").delete().eq("id", id);

  revalidatePath("/admin/promo");
  revalidatePath("/");
}

export async function updatePromoItem(id: string, formData: FormData) {
  await checkAdmin();

  const name = formData.get("name") as string;
  const priceDollars = parseFloat(formData.get("price") as string) || 0;
  const sortOrder = parseInt(formData.get("sort_order") as string) || 0;
  const active = formData.get("active") === "on";

  await supabase
    .from("promo_banner")
    .update({
      name,
      price: Math.round(priceDollars * 100),
      sort_order: sortOrder,
      active,
    })
    .eq("id", id);

  revalidatePath("/admin/promo");
  revalidatePath("/");
}
