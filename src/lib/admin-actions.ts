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
