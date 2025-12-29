import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

import img1 from "../static/img/img1.jpg";
import img2 from "../static/img/img2.jpg";
import img3 from "../static/img/img3.jpg";
import img4 from "../static/img/img3.jpg";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function ProductHome() {
  const products = [
    {
      id: 1,
      brand: "Tata",
      name: "Vacuum Evaporated Iodised Salt",
      image: img1,
      rating: 4.1,
      reviews: 67140,
      units: ["2 kg"],
      price: 58,
      mrp: null,
      discount: null,
    },
    {
      id: 2,
      brand: "Fortune",
      name: "Soya Health Refined Soyabean Oil",
      image: img2,
      rating: 4.3,
      reviews: 13765,
      units: ["870 g - Pouch"],
      price: 160,
      mrp: null,
      discount: null,
    },
    {
      id: 3,
      brand: "Fortune",
      name: "Premium Kachi Ghani Pure Mustard Oil",
      image: img3,
      rating: 4.2,
      reviews: 3906,
      units: ["1 L - PET Bottle"],
      price: 137.43,
      mrp: 155,
      discount: "11% OFF",
    },
    {
      id: 4,
      brand: "bb Popular",
      name: "Sugar / Sakkare",
      image: img4,
      rating: 4.0,
      reviews: 41764,
      units: ["5 kg"],
      price: 255.5,
      mrp: 300,
      discount: "15% OFF",
    },
  ];

  return (
    <>
      <div className="min-h-screen flex flex-col bg-light">
        <Navbar />

        {/* Top Filter Bar */}
        <div className="mx-14 mt-6 flex justify-between items-center gap-6">

        {/* Left: Category Buttons */}
        <div className="flex gap-4">
            {["Vegetables", "Fruits"].map((cat, idx) => (
            <button
                key={idx}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition ${
                idx === 0
                    ? "bg-primaryDark text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
            >
                {cat}
            </button>
            ))}
        </div>

        {/* Right: Search Bar */}
        <div className="relative w-72">
            <input
            type="text"
            placeholder="Search products…"
            className="w-full pl-4 pr-10 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
            </span>
        </div>

        </div>

        {/* Smart Basket */}
        <div className="mx-14 mt-2 px-5 py-10 border border-s-2 bg-green-50">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              My Smart Basket
            </h2>
            <span className="text-sm text-primary cursor-pointer">
              View All
            </span>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-4 ">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default ProductHome;