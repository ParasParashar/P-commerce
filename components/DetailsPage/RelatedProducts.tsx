import { getRelatedProducts } from "@/actions/products.action";
import ProductCard from "../Card/ProductCard";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

type props = {
  productCategoryId: string;
  productId: string;
};
const RelatedProducts = async ({ productCategoryId, productId }: props) => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const relatedProducts = await getRelatedProducts(
    productCategoryId,
    productId
  );
  if (!relatedProducts) return null;
  return (
    <div className="p-2">
      <h5 className="text-xl text-fuchsia-300">
        {relatedProducts.length>0 ? "Related Products":"No Related Products Found"}
        </h5>
      <div className="flex overflow-x-auto  gap-x-1 mt-1  ">
        {relatedProducts.map((product) => (
          <div key={product.id} className="w-60">
            <ProductCard currentUserId={userId} product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
