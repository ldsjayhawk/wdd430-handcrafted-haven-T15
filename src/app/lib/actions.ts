'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from "next/navigation";
import { updateProductDescriptionInDB } from "./getProducts";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function updateProductDescription(
  productId: number,
  formData: FormData
) {
  const rawDescription = formData.get("description");

  if (typeof rawDescription !== "string" || !rawDescription.trim()) {
    console.error("Validation Error: Invalid or empty description provided.");

    throw new Error("Invalid or empty description provided.");
  }
  
  const newDescription = rawDescription.trim();

  try {

    await updateProductDescriptionInDB(productId, newDescription);

  } catch (error) {
    console.error(`Failed to update product ID ${productId}:`, error);

    throw new Error("Failed to save product description due to a server error.");
  }

  redirect(`/shop/${productId}`);
}