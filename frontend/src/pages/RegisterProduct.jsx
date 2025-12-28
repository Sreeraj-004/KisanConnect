import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import dataset from "../static/dataset.json";
import { useState } from "react";

function RegisterProduct() {
  const [images, setImages] = useState([]);

  const [productName, setProductName] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [varieties, setVarieties] = useState([]);

  // ---- Combine fruits + vegetables for search ----
  const allProducts = [
    ...dataset.fruits,
    ...dataset.vegetables,
  ];

  // ---- Handle product typing ----
  const handleProductChange = (e) => {
    const value = e.target.value;
    setProductName(value);

    if (!value) {
      setSuggestions([]);
      setVarieties([]);
      return;
    }

    const matches = allProducts.filter(p =>
      p.name.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(matches);
  };

  // ---- When product selected ----
  const selectProduct = (product) => {
    setProductName(product.name);
    setVarieties(product.varieties || []);
    setSuggestions([]);
  };

  // ---- Image handling ----
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (images.length + selectedFiles.length > 3) {
      alert("You can upload a maximum of 3 images");
      return;
    }

    const newImages = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full min-h-screen bg-light">
      <Navbar title="Register Product" />

      <div className="mx-14 px-5 py-10">
        <div className="max-w-2xl mx-auto bg-white border border-green-200 rounded-lg shadow-sm">

          {/* Header */}
          <div className="px-6 py-4 bg-primaryDark text-white rounded-t-lg">
            <h1 className="text-2xl font-semibold">Product Registration</h1>
          </div>

          <form className="p-6 space-y-5">

            {/* Product Name */}
            <div className="relative">
              <label className="block text-sm font-medium mb-1">
                Product Name
              </label>

              <input
                type="text"
                value={productName}
                onChange={handleProductChange}
                placeholder="Eg: Banana"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary"
                required
              />

              {suggestions.length > 0 && (
                <ul className="absolute z-10 bg-white border w-full rounded-md mt-1 max-h-40 overflow-auto">
                  {suggestions.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => selectProduct(item)}
                      className="px-3 py-2 cursor-pointer hover:bg-green-100"
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Variety (dataset-driven) */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Variety
              </label>

              <select
                className="w-full px-3 py-2 border rounded-md bg-white focus:ring-2 focus:ring-primary"
                disabled={!varieties.length}
              >
                <option>Select variety</option>
                {varieties.map((v, i) => (
                  <option key={i}>{v}</option>
                ))}
              </select>
            </div>

            {/* Price + Unit */}
            <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium -mb-3">
                Price
                </label>
                <input
                type="number"
                placeholder="₹"
                className="input-field"
                required
                />
            </div>

            <div>
                <label className="block text-sm font-medium -mb-3">
                Price Unit
                </label>
                <select className="input-field" required>
                <option>kg</option>
                <option>dozen</option>
                <option>pcs</option>
                </select>
            </div>
            </div>

            {/* Quantity + Unit */}
            <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium -mb-3">
                Available Quantity
                </label>
                <input
                type="number"
                placeholder="Quantity"
                className="input-field"
                required
                />
            </div>

            <div>
                <label className="block text-sm font-medium -mb-3">
                Unit
                </label>
                <select className="input-field" required>
                <option>kg</option>
                <option>dozen</option>
                <option>pcs</option>
                </select>
            </div>
            </div>

            {/* Harvest Date */}
            <div>
            <label className="block text-sm font-medium -mb-3" required>
                Harvest Date
            </label>
            <input
                type="date"
                className="input-field"
            />
            </div>

            {/* Product Images */}
            <div>
            <label className="block text-sm font-medium mb-1">
                Product Photos (1–3 images)
            </label>
            <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                required
            />
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {images.map((img, i) => (
                  <div key={i} className="relative">
                    <img
                      src={img.preview}
                      className="h-24 w-full object-cover rounded"
                      alt="preview"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 bg-black text-white rounded-full px-2"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Submit */}
            <button type="submit" className="btn-primary">
              Register Product
            </button>

          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default RegisterProduct;
