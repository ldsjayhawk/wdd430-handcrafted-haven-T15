import { getProductById } from "@/app/lib/getProducts";
import { updateProductDescription } from "@/app/lib/actions";
import Link from "next/link";
import styles from "@/app/shop/product.module.css";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getUserByEmail } from "@/app/lib/getUser";

export default async function EditProductDescriptionPage({
  params,
}: {
  params: { id: string };
}) {
    
  const { id } = await params;
  const numericId = Number(id);
  const product = await getProductById(numericId);

  if (!product) {
    return (
      <div className={styles.container}>
        <p>Product not found.</p>
        <Link href="/shop">Back to products</Link>
      </div>
    );
  }

  const session = await auth();
  const currentUserEmail = session?.user?.email;
  
  let currentUserId: string | number | undefined;

  if (!currentUserEmail) {
    redirect(`/shop/${product.id}`); 
  }
  
  if (currentUserEmail) {
      const user = await getUserByEmail(currentUserEmail);
      currentUserId = user?.id; 
  }

  if (String(currentUserId) !== String(product.user_id)) {
    redirect(`/shop/${product.id}`); 
  }

  const updateProductAction = updateProductDescription.bind(null, numericId);

  return (
    <div className={styles.container}>
      <div className={styles.backRow}>
        <Link href={`/shop/${product.id}`}>← Back to Product</Link>
      </div>

      <h1 className={styles.title2}>Edit Description for: {product.title}</h1>
      
      <form action={updateProductAction} className={styles.editForm2}>
        <input type="hidden" name="productId" value={product.id} />

        <label htmlFor="description" className={styles.label2}>
          New Description
        </label>
        
        <textarea
          id="description"
          name="description"
          rows={10}
          required
          defaultValue={product.description}
          className={styles.textField2}
        />

        <div className={styles.actions2}>
          <Link href={`/shop/${product.id}`} className={styles.cancelButton2}>
            Cancel
          </Link>
          <button type="submit" className={styles.submitButton2}>
            Save Description
          </button>
        </div>
      </form>
    </div>
  );
}