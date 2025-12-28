import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import Modal from "../components/Modal";


import img1 from "../static/img/img1.jpg";
import img2 from "../static/img/img2.jpg";
import img3 from "../static/img/img3.jpg";

function Inventory() {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [stock, setStock] = useState(0);
    const [isAvailable, setIsAvailable] = useState(true);

  const products = [
    {
      id: 1,
      name: "Tomato – Local",
      image: img1,
      price: 39,
      mrp: 52,
      stock: "45 kg",
    },
    {
      id: 2,
      name: "Potato",
      image: img2,
      price: 29,
      mrp: 41,
      stock: "60 kg",
    },
    {
      id: 3,
      name: "Coriander Leaves",
      image: img3,
      price: 20,
      mrp: 27,
      stock: "120 bunches",
    },
    {
      id: 4,
      name: "Tomato – Local",
      image: img1,
      price: 39,
      mrp: 52,
      stock: "45 kg",
    },
    {
      id: 5,
      name: "Potato",
      image: img2,
      price: 29,
      mrp: 41,
      stock: "60 kg",
    },
    {
      id: 6,
      name: "Coriander Leaves",
      image: img3,
      price: 20,
      mrp: 27,
      stock: "120 bunches",
    },
  ];

  return (
    <>
      <div className="min-h-screen flex flex-col bg-light">
        <Navbar title="Inventory" />

        {/* Main Content */}
        <div className="flex-1 mx-14 px-5 pb-12 mt-12">

          {/* Page Title */}
          <h2 className="text-2xl font-semibold text-primary mb-6">
            Your Products
          </h2>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-green-200 rounded-lg shadow-sm p-4 relative"
              >

                {/* Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />

                {/* Name */}
                <h3 className="text-lg font-medium text-gray-800">
                  {product.name}
                </h3>

                {/* Stock */}
                <p className="text-sm text-gray-500 mt-1">
                  Stock: <span className="font-medium">{product.stock}</span>
                </p>

                {/* Price */}
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-lg font-semibold text-primaryDark">
                    ₹{product.price}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    ₹{product.mrp}
                  </span>
                </div>

                {/* Actions */}
                <div className="mt-4 flex gap-3">
                  <button
                    className="flex-1 btn-secondary-sm py-2"
                    onClick={() => {
                        setSelectedProduct(product);
                        setStock(product.stockValue); // numeric value
                        setIsAvailable(true);
                        setIsEditOpen(true);
                    }}
                    >
                    Edit Product
                    </button>
                    <Modal
                        isOpen={isEditOpen}
                        onClose={() => setIsEditOpen(false)}
                        title="Edit Product"
                        >
                        {selectedProduct && (
                            <div className="space-y-4">

                            {/* Product Name */}
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">
                                Product Name
                                </label>
                                <input
                                type="text"
                                value={selectedProduct.name}
                                disabled
                                className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-600"
                                />
                            </div>

                            {/* Inventory */}
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">
                                Current Inventory
                                </label>
                                <input
                                type="number"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md"
                                />
                            </div>

                            {/* Availability Toggle */}
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Product Available</span>
                                <button
                                type="button"
                                onClick={() => setIsAvailable(!isAvailable)}
                                className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                                    isAvailable ? "bg-primaryDark" : "bg-gray-300"
                                }`}
                                >
                                <span
                                    className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                                    isAvailable ? "translate-x-6" : "translate-x-0"
                                    }`}
                                />
                                </button>
                            </div>

                            {/* Footer Actions */}
                            <div className="flex justify-between items-center pt-4">

                                {/* Delete */}
                                <button
                                type="button"
                                className="text-red-600 text-sm hover:underline"
                                onClick={() => {
                                    alert(`Deleted ${selectedProduct.name} (dummy)`);
                                    setIsEditOpen(false);
                                }}
                                >
                                Delete Product
                                </button>

                                <div className="flex gap-3">
                                <button
                                    onClick={() => setIsEditOpen(false)}
                                    className="px-4 py-2 border rounded-md text-sm"
                                >
                                    Cancel
                                </button>

                                <button className="btn-primary-sm px-6 py-2">
                                    Save Changes
                                </button>
                                </div>
                            </div>

                            </div>
                        )}
                        </Modal>


                </div>

              </div>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Inventory;
