import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, ChevronDown, Grid3X3, Search } from "lucide-react";
import gsap from "gsap";

const PARENT_MAP = {
  48: "drones",
  44: "gnss",
  27: "marine-surveying",
  66: "slam-lidar",
};

const PER_PAGE = 40;

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get("category") || "all";
  const initialBrand = searchParams.get("brand") || "";
  const [activeFilter, setActiveFilter] = useState(initialCat);
  const [activeBrand, setActiveBrand] = useState(initialBrand);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedParent, setExpandedParent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const gridRef = useRef(null);

  useEffect(() => {
    Promise.all([
      fetch("/products/products-list.json").then((r) => r.json()),
      fetch("/products/categories.json").then((r) => r.json()),
    ]).then(([prods, cats]) => {
      setProducts(prods);
      setCategories(cats);
    });
  }, []);

  const categoryTree = useMemo(() => {
    const topLevel = categories.filter((c) => c.parent === 0);
    const children = categories.filter((c) => c.parent !== 0);

    return topLevel.map((parent) => ({
      ...parent,
      children: children.filter(
        (c) => PARENT_MAP[c.parent] === parent.slug,
      ),
    }));
  }, [categories]);

  // Count products per category
  const categoryCounts = useMemo(() => {
    const counts = {};
    for (const cat of categories) {
      if (cat.parent === 0) {
        const childSlugs = categories
          .filter((c) => PARENT_MAP[c.parent] === cat.slug)
          .map((c) => c.slug);
        const allSlugs = [cat.slug, ...childSlugs];
        counts[cat.slug] = products.filter((p) =>
          p.categories.some((c) => allSlugs.includes(c.slug)),
        ).length;
      } else {
        counts[cat.slug] = products.filter((p) =>
          p.categories.some((c) => c.slug === cat.slug),
        ).length;
      }
    }
    return counts;
  }, [products, categories]);

  const filtered = useMemo(() => {
    let result = products;

    // Brand filter
    if (activeBrand) {
      result = result.filter((p) =>
        p.brands?.some((b) => b.slug === activeBrand),
      );
    }

    if (activeFilter !== "all") {
      const activeCat = categories.find((c) => c.slug === activeFilter);
      if (activeCat) {
        if (activeCat.parent === 0) {
          const childSlugs = categories
            .filter((c) => PARENT_MAP[c.parent] === activeCat.slug)
            .map((c) => c.slug);
          const allSlugs = [activeCat.slug, ...childSlugs];
          result = result.filter((p) =>
            p.categories.some((c) => allSlugs.includes(c.slug)),
          );
        } else {
          result = result.filter((p) =>
            p.categories.some((c) => c.slug === activeFilter),
          );
        }
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(q));
    }

    return result;
  }, [activeFilter, activeBrand, products, categories, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE,
  );

  // Animate cards on change
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".product-card");
    if (!cards?.length) return;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.03, ease: "power2.out" },
    );
  }, [paginated]);

  const handleFilterChange = (slug) => {
    setActiveFilter(slug);
    setCurrentPage(1);
  };

  // Page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2, 3, 4);
      if (currentPage > 5) {
        pages.push("...");
      }
      for (
        let i = Math.max(5, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        if (!pages.includes(i)) pages.push(i);
      }
      if (currentPage < totalPages - 3) {
        pages.push("...");
      }
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }
    return pages;
  };

  // Find active parent for sub-category expansion
  const activeParent = useMemo(() => {
    if (activeFilter === "all") return null;
    // Check if active filter IS a parent
    const asParent = categoryTree.find((c) => c.slug === activeFilter);
    if (asParent?.children.length > 0) return asParent.slug;
    // Check if active filter is a child
    for (const parent of categoryTree) {
      if (parent.children.some((c) => c.slug === activeFilter)) {
        return parent.slug;
      }
    }
    return expandedParent;
  }, [activeFilter, categoryTree, expandedParent]);

  return (
    <div className="min-h-screen bg-black pt-28 pb-20 px-4 sm:px-8 lg:px-16">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-[clamp(28px,5vw,42px)] font-bold text-white tracking-tight">
              {activeBrand
                ? products.find((p) => p.brands?.some((b) => b.slug === activeBrand))
                    ?.brands?.find((b) => b.slug === activeBrand)?.name || "All Products"
                : "All Products"}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-white/40 text-sm">
                {filtered.length} product{filtered.length !== 1 ? "s" : ""}
                {activeFilter !== "all" && " in this category"}
              </p>
              {activeBrand && (
                <button
                  onClick={() => setActiveBrand("")}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium
                    bg-[#e93d59]/15 text-[#e93d59] border border-[#e93d59]/20
                    hover:bg-[#e93d59]/25 transition-colors cursor-pointer"
                >
                  Brand filter
                  <span className="text-[10px]">✕</span>
                </button>
              )}
            </div>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-white/5
                text-sm text-white placeholder:text-white/30
                outline-none transition-all duration-300
                focus:border-white/25 focus:bg-white/8"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-10">
          {/* Top-level pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleFilterChange("all")}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium
                transition-all duration-300 cursor-pointer border whitespace-nowrap
                ${
                  activeFilter === "all"
                    ? "bg-[#e93d59] border-[#e93d59] text-white shadow-[0_4px_20px_rgba(233,61,89,0.25)]"
                    : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:border-white/20 hover:text-white"
                }`}
            >
              <Grid3X3 className="w-3.5 h-3.5" />
              All
              <span className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                activeFilter === "all" ? "bg-white/20" : "bg-white/8"
              }`}>
                {products.length}
              </span>
            </button>

            {categoryTree.map((cat) => {
              const isActive = activeFilter === cat.slug;
              const isParentOfActive = activeParent === cat.slug && activeFilter !== cat.slug;
              const hasChildren = cat.children.length > 0;
              const count = categoryCounts[cat.slug] || 0;
              return (
                <button
                  key={cat.slug}
                  onClick={() => {
                    handleFilterChange(cat.slug);
                    if (hasChildren) {
                      setExpandedParent(
                        expandedParent === cat.slug ? null : cat.slug,
                      );
                    }
                  }}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-medium
                    transition-all duration-300 cursor-pointer border whitespace-nowrap
                    ${
                      isActive
                        ? "bg-[#e93d59] border-[#e93d59] text-white shadow-[0_4px_20px_rgba(233,61,89,0.25)]"
                        : isParentOfActive
                          ? "bg-white/10 border-white/20 text-white"
                          : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:border-white/20 hover:text-white"
                    }`}
                >
                  {cat.name.trim()}
                  <span className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                    isActive ? "bg-white/20" : "bg-white/8"
                  }`}>
                    {count}
                  </span>
                  {hasChildren && (
                    <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${
                      activeParent === cat.slug ? "rotate-180" : ""
                    }`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Sub-category pills (only for active parent) */}
          {categoryTree
            .filter((p) => p.children.length > 0 && activeParent === p.slug)
            .map((parent) => (
              <div
                key={parent.slug}
                className="flex flex-wrap items-center gap-2 mt-3 pl-1
                  pt-3 border-t border-white/6"
              >
                <span className="text-[11px] font-medium tracking-wider uppercase text-white/25 mr-1">
                  {parent.name.trim()}
                </span>
                {parent.children.map((child) => {
                  const isActive = activeFilter === child.slug;
                  const count = categoryCounts[child.slug] || 0;
                  return (
                    <button
                      key={child.slug}
                      onClick={() => handleFilterChange(child.slug)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium
                        transition-all duration-300 cursor-pointer border whitespace-nowrap
                        ${
                          isActive
                            ? "bg-white/15 border-white/25 text-white"
                            : "bg-transparent border-white/8 text-white/45 hover:bg-white/5 hover:border-white/15 hover:text-white/70"
                        }`}
                    >
                      {child.name}
                      <span className="text-[10px] opacity-60">{count}</span>
                    </button>
                  );
                })}
              </div>
            ))}
        </div>

        {/* Product Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
        >
          {paginated.map((product) => (
            <div key={product.id} className="product-card bg-white rounded-xl">
              <Link
                to={`/products/${product.slug}`}
                className="flex flex-col items-center p-4 group"
              >
                <div className="w-full aspect-square flex items-center justify-center mb-4">
                  <img
                    src={`/products/${product.image}`}
                    alt={product.title}
                    loading="lazy"
                    className="max-w-[85%] max-h-[85%] object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-[#333] text-sm text-center font-medium leading-snug mb-4 min-h-[2.5rem]">
                  {product.title}
                </h3>
                <span className="inline-block bg-[#d9534f] text-white text-xs font-medium px-5 py-2 rounded hover:bg-[#c9302c] transition-colors">
                  Read more
                </span>
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-end gap-1 mt-10">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-9 h-9 flex items-center justify-center rounded border border-white/20 text-white/50 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer bg-transparent"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {getPageNumbers().map((page, i) =>
              page === "..." ? (
                <span
                  key={`ellipsis-${i}`}
                  className="w-9 h-9 flex items-center justify-center text-white/30 text-sm"
                >
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 flex items-center justify-center rounded text-sm font-medium transition-colors cursor-pointer ${
                    currentPage === page
                      ? "bg-[#4285f4] text-white border-none"
                      : "border border-white/20 text-white/60 hover:bg-white/10 bg-transparent"
                  }`}
                >
                  {page}
                </button>
              ),
            )}

            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages, p + 1))
              }
              disabled={currentPage === totalPages}
              className="w-9 h-9 flex items-center justify-center rounded border border-white/20 text-white/50 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer bg-transparent"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
