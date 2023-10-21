import { Product, Sellers } from '@prisma/client';

type Props = {
  product: Product & {
    seller: Sellers;
  };
};

const ProductDescription = ({ product }: Props) => {
  return (
    <div className="flex flex-col bg-neutral-600/10 rounded-lg gap-4 p-4 m-4 ">
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Product Description</h2>
        <p className="text-gray-300">
          {product.description?.slice(0, 300) || 'No description available.'}
        </p>
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Seller Information</h2>
        <p className="text-lg font-semibold">{product.seller?.sellerName || 'Seller information not available.'}</p>
        <p className="text-gray-400">Company: {product.seller?.companyName}</p>
        <p className="text-gray-400">Email: {product.seller?.email}</p>
      </div>
    </div>
  );
};

export default ProductDescription;
