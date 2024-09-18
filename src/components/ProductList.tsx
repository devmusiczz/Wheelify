import { wixClientServer } from "@/lib/wixClientServer";
import { products } from "@wix/stores";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import Pagination from "./Pagination";

const PRODUCT_PER_PAGE = 8;

const ProductList = async ({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: any;
}) => {
  const wixClient = await wixClientServer();

  const productQuery = wixClient.products
    .queryProducts()
    .startsWith("name", searchParams?.name || "")
    .eq("collectionIds", categoryId)
    .hasSome(
      "productType",
      searchParams?.type ? [searchParams.type] : ["physical", "digital"]
    )
    .gt("priceData.price", searchParams?.min || 0)
    .lt("priceData.price", searchParams?.max || 999999)
    .limit(limit || PRODUCT_PER_PAGE)
    .skip(
      searchParams?.page
        ? parseInt(searchParams.page) * (limit || PRODUCT_PER_PAGE)
        : 0
    );
  // .find();

  if (searchParams?.sort) {
    const [sortType, sortBy] = searchParams.sort.split(" ");

    if (sortType === "asc") {
      productQuery.ascending(sortBy);
    }
    if (sortType === "desc") {
      productQuery.descending(sortBy);
    }
  }

  const res = await productQuery.find();

  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
    {res.items.map((product: products.Product) => (
      <Link
        href={"/" + product.slug}
        className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
        key={product._id}
      >
        {/* Image Section */}
        <div className="relative w-full h-80">
          <Image
            src={product.media?.mainMedia?.image?.url || "/product.png"}
            alt={product.name || "Product image"}
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease-in-out duration-500"
          />
          {product.media?.items && (
            <Image
              src={product.media?.items[1]?.image?.url || "/product.png"}
              alt="Additional product image"
              fill
              sizes="25vw"
              className="absolute object-cover rounded-md"
            />
          )}
        </div>
  
        {/* Product Title */}
        <div className="text-white">
          <span className="font-medium line-clamp-2">{product.name}</span>
        </div>
  
        {/* Price Section */}
        <div className="flex justify-between items-center">
          <div className="">
            <span className="font-semibold text-lg">Rs {product.priceData?.discountedPrice}</span>
            {product.priceData?.discountedPrice && (
              <span className="text-sm ml-2 text-gray-400 line-through">Rs {product.priceData?.price}</span>
            )}
          </div>
        </div>
  
        {/* Add to Cart Button */}
        <button className="mt-2 rounded-2xl ring-1 ring-gray-800 bg-lama text-white w-full py-2 text-xs transition duration-200 ease-in-out hover:bg-[#b83a2b] hover:ring-[#b83a2b]">
          Add to Cart
        </button>
      </Link>
      ))}
      {searchParams?.cat || searchParams?.name ? (
        <Pagination
          currentPage={res.currentPage || 0}
          hasPrev={res.hasPrev()}
          hasNext={res.hasNext()}
        />
      ) : null}
    </div>
  );
};

export default ProductList;



// additional info section on card like short descp
{/* {product.additionalInfoSections && (
            <div
              className="text-sm text-gray-200"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  product.additionalInfoSections.find(
                    (section: any) => section.title === "Short Description"
                  )?.description || ""
                ),
              }}
            ></div>
          )} */}