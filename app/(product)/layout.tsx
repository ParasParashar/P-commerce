import CategoryBar from "@/components/Category/CategoryBar";
import Footer from "@/components/Navbar/Footer";
import Navbar from "@/components/Navbar/Navbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen">
      <div className="w-full h-[120px]">
        <Navbar />
        <CategoryBar />
      </div>
      <main className="md:pt-[20px] pt-[70px] px-5 min-h-screen md:px-10 w-full">
        {children}
      </main>
      <Footer/>
    </div>
  );
};

export default layout;
