import { forwardRef, useState } from "react";
import ProductGrid from "./ProductGrid";
import FilterBar from "./FilterBar";
import { COLLECTION_FILTERS, PRODUCTS } from "@/data/product";



export default function CollectionsSection() {


  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeFilter);

  return (
    <section className="px-8 pb-10">
      {/* Section header */}
      <div className="text-center  pt-16 md:pt-24 pb-10">
        <p className="text-black font-mono tracking-[0.45em] text-[20px] md:text-[26px] uppercase  mb-1">
          Signature Selection
        </p>
      
      </div>

      {/* Filter bar */}
      <div className="mb-8">
        <FilterBar
          filters={COLLECTION_FILTERS}
          active={activeFilter}
          onChange={setActiveFilter}
        />
      </div>

      {/* Grid */}
      <ProductGrid products={filtered} />
    </section>
  );
};


