import { forwardRef, useState } from "react";
import ProductGrid from "./ProductGrid";
import FilterBar from "./FilterBar";
import { COLLECTION_FILTERS, PRODUCTS } from "@/data/product";



export default function CollectionsSection (){


  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeFilter);

  return (
    <section className="px-8 pb-10">
      {/* Section header */}
      <div className="text-center  pt-16 md:pt-24 pb-10">
        <p className="text-black font-mono tracking-widest text-[12px] uppercase  mb-1">
    Exclusive Edition
        </p>
        <h2 className="text-black text-[28px] lg:text-[36px] font-bold tracking-[0.1em]"
        
        >
    Crafted for the Discerning
        </h2>
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


