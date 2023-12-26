import { getSpecificProduct } from "@/actions/products.action";
import HeartButton from "@/components/ActionButton/HeartButton";
import ShareButton from "@/components/ActionButton/ShareButton";
import ProductDetails from "@/components/DetailsPage/ProductDetails";
import ProductDiscription from "@/components/DetailsPage/ProductDiscription";
import ProductVariant from "@/components/DetailsPage/ProductVaraint";
import RelatedProducts from "@/components/DetailsPage/RelatedProducts";
import ReviewBox from "@/components/DetailsPage/ReviewBox";
import ProductDetailsSkeleton from "@/components/Skeleton/ProductDetailsSkeleton";
import ProductImageSkeleton from "@/components/Skeleton/ProductImageSkeleton";
import ProductVariantSkeleton from "@/components/Skeleton/ProductVariantSkeleton";
import { auth } from "@clerk/nextjs";
import { Category, Product, ProductReviews } from "@prisma/client";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
type product = Product & {
  category: Category;
  reviews: ProductReviews[];
};

const page = async ({ params }: { params: { productId: string } }) => {
  const product = await getSpecificProduct(params.productId);
  if (!product) redirect("/");
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const ProductImage = dynamic(
    () => import("@/components/DetailsPage/ProductImage"),
    {
      loading: () => <ProductImageSkeleton />,
      ssr: false,
    }
  );
  const ProductDetails = dynamic(
    () => import("@/components/DetailsPage/ProductDetails"),
    {
      loading: () => <ProductDetailsSkeleton />,
      ssr: false,
    }
  );
  const ProductVariant = dynamic(
    () => import("@/components/DetailsPage/ProductVaraint"),
    {
      loading: () => <ProductVariantSkeleton />,
      ssr: false,
    }
  );

  return (
    <div className=" pt-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3">
        <div className="p-2 themes rounded-lg ">
          <div className="flex  justify-end items-end  w-full">
            <HeartButton currentUserId={userId} productId={params.productId} />
            <ShareButton />
          </div>
          <ProductImage images={product?.image} />
        </div>
        <div className="flex flex-col themes gap-2 rounded-lg py-3">
          <ProductDetails product={product as product} />
          <ProductVariant product={product} />
          <ProductDiscription product={product} />
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <RelatedProducts
          productId={product.id}
          productCategoryId={product.categoryId as string}
        />
        <ReviewBox productId={product.id} />
      </div>
    </div>
  );
};

export default page;
