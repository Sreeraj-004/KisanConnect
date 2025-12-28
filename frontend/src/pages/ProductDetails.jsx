import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Modal from "../components/Modal";



import img1 from "../static/img/img1.jpg";
import img2 from "../static/img/img2.jpg";
import img3 from "../static/img/img3.jpg";


function ProductDetails() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [stock, setStock] = useState(45);
  const [isAvailable, setIsAvailable] = useState(true);

  const images = [
    img1,
    img2,
    img3,
  ];

  const suggestedProducts = [
  {
    id: 1,
    name: "Potato",
    price: 29,
    mrp: 41,
    discount: "29% OFF",
    image: img1,
  },
  {
    id: 2,
    name: "Coriander Leaves",
    price: 130.72,
    mrp: 172,
    discount: "24% OFF",
    image: img2,
  },
  {
    id: 3,
    name: "Tomato - Hybrid",
    price: 20.52,
    mrp: 27,
    discount: "24% OFF",
    image: img3,
  },
];


  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [selectedPack, setSelectedPack] = useState("500g");

  return (
    <>
      <div className="w-full min-h-screen bg-light">
        <Navbar title="Product Details" />

        <div className="mx-14 px-5 py-8">

          {/* Breadcrumb */}
          <p className="text-sm text-gray-500 mb-4">
            Home / Vegetables / Fresh / Tomato
          </p>

          {/* Main Grid */}
          <div className="grid grid-cols-12 gap-8">

            {/* Image Section */}
            <div className="col-span-7 grid grid-cols-5 gap-4">

              {/* Thumbnails */}
              <div className="col-span-1 space-y-3">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="thumb"
                    onClick={() => setSelectedImage(img)}
                    className={`w-full h-16 object-cover rounded-md border cursor-pointer ${
                      selectedImage === img
                        ? "border-primaryDark"
                        : "border-gray-200"
                    }`}
                  />
                ))}
              </div>

              {/* Main Image */}
              <div className="col-span-4 border rounded-lg bg-white p-4">
                <img
                  src={selectedImage}
                  alt="product"
                  className="w-full h-[400px] object-cover rounded-md"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="col-span-5 bg-white border border-green-200 rounded-lg p-6">

              <h1 className="text-2xl font-semibold text-primary mb-1">
                Tomato – Local Fresh
              </h1>

              <p className="text-sm text-gray-500 mb-4">
                Direct from farmer · No middleman
              </p>

              {/* Price */}
              <div className="mb-4">
                <span className="text-2xl font-bold text-primaryDark">
                  ₹39
                </span>
              
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mb-6">
                <button className="btn-primary-sm py-3">
                  Add to basket
                </button>
                <button
                  className="btn-secondary-sm py-3"
                  onClick={() => setIsEditOpen(true)}
                >
                  Edit Product
                </button>
                {/* Modal */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Product"
      >
        <div className="space-y-4">

          {/* Product Name */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Product Name
            </label>
            <input
              type="text"
              value="Tomato – Local Fresh"
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
                alert("Product deleted (dummy)");
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
      </Modal>
              </div>

              {/* Pack Sizes */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Pack sizes
                </h3>

                <div className="space-y-3">
                  {[
                    { id: "250g", price: "₹19" },
                    { id: "500g", price: "₹39" },
                    { id: "1kg", price: "₹74" },
                    { id: "2kg", price: "₹138" },
                  ].map((pack) => (
                    <div
                      key={pack.id}
                      onClick={() => setSelectedPack(pack.id)}
                      className={`flex justify-between items-center p-3 border rounded-md cursor-pointer ${
                        selectedPack === pack.id
                          ? "border-primaryDark bg-light"
                          : "border-gray-200"
                      }`}
                    >
                      <span className="font-medium">
                        {pack.id}
                      </span>
                      <span className="text-primaryDark font-semibold">
                        {pack.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Farmer Details */}
        <div className="mx-14 px-5 pb-12 mt-12">
          <h2 className="text-xl font-semibold text-primary mb-6">
            Farmer Details
          </h2>

          <div className="bg-white border border-green-200 rounded-lg shadow-sm p-6 max-w-full">

            <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">

              <div>
                <p className="text-gray-500">Name</p>
                <p className="font-medium text-gray-800">
                  Ramesh Kumar
                </p>
              </div>

              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-medium text-gray-800">
                  ramesh@kissanconnect.com
                </p>
              </div>

              <div>
                <p className="text-gray-500">Phone Number</p>
                <p className="font-medium text-gray-800">
                  +91 98765 43210
                </p>
              </div>

              <div>
                <p className="text-gray-500">Village / Locality</p>
                <p className="font-medium text-gray-800">
                  Kuttanad
                </p>
              </div>

              <div>
                <p className="text-gray-500">District</p>
                <p className="font-medium text-gray-800">
                  Alappuzha
                </p>
              </div>

              <div>
                <p className="text-gray-500">ZIP Code</p>
                <p className="font-medium text-gray-800">
                  688001
                </p>
              </div>

            </div>
          </div>
        </div>


        {/* Suggested Products */}{/* Suggested Products */}
        <div className="mx-14 px-5 pb-12 mt-12">
          <h2 className="text-xl font-semibold text-primary mb-6">
            You may also like
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestedProducts.map((product) => (
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

                {/* Quantity selector (fake for now) */}
                <select className="w-full mt-2 px-3 py-2 border rounded-md text-sm">
                  <option>1 kg</option>
                  <option>500 g</option>
                  <option>250 g</option>
                </select>

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
                  <button className="flex-1 btn-primary-sm py-2">
                    Add
                  </button>
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

export default ProductDetails;
