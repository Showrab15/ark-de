"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { SIZE_CHART_HEADERS, SIZE_CHART_ROWS } from "@/data/sizeChart";

export default function SizeChart() {
  const [open, setOpen] = useState(false);

  return (
    <div className="text-black border-t border-gray-300 dark:border-gray-700 mt-4">
      {/* Toggle header */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full py-3 focus:outline-none"
        aria-expanded={open}
      >
        <span className="text-sm font-medium uppercase tracking-widest">
          Size Guide
        </span>
        {open ? <Minus size={16} /> : <Plus size={16} />}
      </button>

      {/* Collapsible content */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          open ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        {/* Note */}
        <p className="text-xs italic mb-2">
          → All size measurements are in inches
        </p>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse min-w-[320px]">
            <thead>
              <tr>
                {SIZE_CHART_HEADERS.map((h, i) => (
                  <th
                    key={h}
                    className="text-black dark:text-white text-left py-2 px-3 font-semibold bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SIZE_CHART_ROWS.map((row) => (
                <tr key={row[0]} className="border-b border-gray-300 dark:border-gray-700">
                  {row.map((cell, i) => (
                    <td
                      key={i}
                      className={cn(
                        "py-2 px-3",
                        i === 0 ? "font-semibold" : ""
                      )}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}