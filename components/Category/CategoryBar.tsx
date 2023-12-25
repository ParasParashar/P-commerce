import { getAllCategoriesWithParents } from "@/actions/category.action";
import CategoryItem from "./CategoryItem";

const CategoryBar = async () => {
  const categories = await getAllCategoriesWithParents();
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto py-2 px-2 md:px-10 bg-neutral-900">
      {categories?.length === 0 && (
        <div className="flex items-center justify-center w-full h-full px10">
          <p className="text-lg">NO Categores found</p>
        </div>
      )}
      {categories?.map((item) => (
        <CategoryItem key={item.id} name={item.name} />
      ))}
    </div>
  );
};

export default CategoryBar;
