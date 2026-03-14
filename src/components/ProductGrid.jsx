import ProductCard from "./ProductCard";


export default function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
        <p className="text-[10px] tracking-widest3 uppercase text-ark-text-muted mb-3">
          No pieces found
        </p>
        <p className="font-display text-2xl font-light text-ark-text-dim">
          Check back soon
        </p>
      </div>
    );
  }

  return (
    <div
      className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-4 bg-ark-border"

    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}
