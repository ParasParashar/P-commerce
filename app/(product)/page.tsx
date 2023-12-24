import { getAllProducts, getFeaturedProducts } from "@/actions/products.action";
import ImageSlider from "@/components/Card/ImageSlider";
import ProductCard from "@/components/Card/ProductCard";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { updateUser } from "@/actions/user.action";

export default async function Home() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  await updateUser({
    name: user.firstName || "User",
    email: user.emailAddresses[0].emailAddress,
  });

  const products = await getAllProducts();
  const featuredProducts = await getFeaturedProducts();
  return (
    <main className="p-4 flex flex-col gap-3">
      <section className="p-4 flex flex-col-reverse md:flex-row  gap-3">
        <div className="w-full h-1/2 md:w-1/2  md:h-1/2 themes">
          <ImageSlider products={featuredProducts as any} />
        </div>

        <div className="flex flex-col w-full md:flex-row justify-center p-1 md:py-10 md:justify-between gap-2">
          <h1 className="text-3xl md:text-8xl lg:text-9xl font-extrabold leading-snug text-center md:text-right">
            Explore the{" "}
            <span className="text-blue-500">Featured Collection</span>
          </h1>
        </div>
      </section>

      <div className="flex flex-wrap  gap-2">
        {products?.length === 0 ? (
          <p className="text-xl text-red-500">No products available.</p>
        ) : (
          products?.map((data) => (
            <div key={data.id} className="w-full md:w-60 h-72  ">
              <ProductCard currentUserId={user.id} product={data} />
            </div>
          ))
        )}
      </div>
    </main>
  );
}
