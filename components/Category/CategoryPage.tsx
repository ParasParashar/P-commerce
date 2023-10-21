import { getCategoryWiseProduct } from "@/actions/category.action";
import ProductCard from "../Card/ProductCard";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const CategoryPage = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const categories = await getCategoryWiseProduct();
  if (!categories) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <h3 className="text-xl font-semibold text-gray-500">
          No Category Found!!!
        </h3>
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full p-4 gap-2">
      {categories.map((category) => (
        <div key={category.id} className="mt-1">
          <p className="text-2xl font-semibold text-gray-300 ">
            {category.name}
          </p>
            <div className="flex mt-1 gap-x-2 overflow-x-auto md:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {category.product.map((product) => (
                  <ProductCard key={product.id}  currentUserId={userId} product={product} />
              ))}
            </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryPage;
