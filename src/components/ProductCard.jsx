import Link from "next/link";

function ProductBadge({ badge }) {
  if (!badge) return null;

  // Map badge text to styles
  const badgeStyles = {
    "Limited": "bg-red-700 text-white",
    "New": "bg-green-600 text-white",
    "stock-out": "bg-red-500 text-white line-through",
  };

  const style = badgeStyles[badge] || "bg-gray-300 text-black";

  return (
    <span className="absolute top-4 left-4 z-10">
      <span className={`rounded-md px-2 py-1 text-[10px] tracking-wide font-semibold ${style}`}>
        {badge}
      </span>
    </span>
  );
}

export default function ProductCard({ product }) {
    return (
        <article className="text-black pb-4 group rounded-md overflow-hidden hover:border-zinc-600 transition-all duration-500">
            <Link href={`/products/${product.id}`}>
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                        src={product.imgs[0]}
                        alt={product.name}
                        className="
      w-full h-full object-cover
      transition-transform duration-500 ease-out
      group-hover:scale-110
    "          />
                    <ProductBadge badge={product.badge} />


                </div>

                {/* Info */}
                <div className="px-2 pt-2">
                    <h3 className="text-black text-xl font-medium mb-2">
                        {product.name}
                    </h3>

                    <span className=" font-semibold text-sm tracking-wide">
                        {product.price}
                    </span>
                </div>
            </Link>
        </article>
    );
}