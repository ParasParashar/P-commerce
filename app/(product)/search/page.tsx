import {
  getAllCategoriesWithParents,
  getSearchCategoryProperties,
  getSearchProduct,
} from "@/actions/category.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ProductProperties } from "@prisma/client";
import dynamic from "next/dynamic";
import ProductCardSkeleton from "@/components/Skeleton/ProductCardSkeleton";
import CategoryPropertiesSkeletion from "@/components/Skeleton/CategoryPropertiesSkeletion";

type searchType = {
  searchParams: {
    search: string;
    category: string;
    propertySearch: string;
  };
};

const page = async ({ searchParams }: searchType) => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const search = await getSearchProduct({ ...searchParams });

  const productProperties = await getSearchCategoryProperties(
    searchParams.category,
    searchParams.search
  );

  const properties: ProductProperties[] = [];
  productProperties?.forEach((data: any) => {
    if (data.parent) {
      properties.push(...data.parent.properties);
    }
    properties.push(...data.properties);
  });
  const ProductCard = dynamic(() => import("@/components/Card/ProductCard"), {
    loading: () => <ProductCardSkeleton />,
    ssr: false,
  });
  const CategoryProperties = dynamic(
    () => import("@/components/Category/CategoryProperties"),
    {
      loading: () => <CategoryPropertiesSkeletion />,
      ssr: false,
    }
  );

  return (
    <div>
      <CategoryProperties properties={properties} />
      <div className="p-2 md:4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {search?.map((product) => (
          <ProductCard
            key={product.name}
            currentUserId={userId}
            product={product}
          />
        ))}
      </div>

      {search?.length === 0 && (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-xl text-gray-500">No Such Product is found!!!</p>
        </div>
      )}
    </div>
  );
};

export default page;
