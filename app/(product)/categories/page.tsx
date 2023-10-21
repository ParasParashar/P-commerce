import {
  getAllCategoriesWithParents,
} from "@/actions/category.action";
import CategoryPage from "@/components/Category/CategoryPage";
const page = async () => {
  const allCategories = await getAllCategoriesWithParents();
  return (
        <CategoryPage />
      
  );
};

export default page;
