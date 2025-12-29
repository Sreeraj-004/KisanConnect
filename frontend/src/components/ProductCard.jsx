function ProductCard({ product }) {
  return (
    <div className="bg-white border border-green-200 rounded-lg shadow-sm p-4 relative w-[230px]">
      {/* Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-36 object-contain mb-4"
      />

      {/* Brand */}
      <p className="text-xs text-gray-500">{product.brand}</p>

      {/* Name */}
      <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
        {product.name}
      </h3>

      {/* Rating */}
      <div className="flex items-center gap-1 text-xs mt-2">
        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
          ★ {product.rating}
        </span>
        <span className="text-gray-500">
          {product.reviews} Ratings
        </span>
      </div>

      {/* Quantity */}
      <select className="w-full mt-3 px-3 py-2 border rounded-md text-sm">
        {product.units.map((unit, idx) => (
          <option key={idx}>{unit}</option>
        ))}
      </select>

      {/* Price */}
      <div className="mt-3 flex items-center gap-2">
        <span className="text-lg font-semibold text-primaryDark">
          ₹{product.price}
        </span>
        {product.mrp && (
          <span className="text-sm text-gray-400 line-through">
            ₹{product.mrp}
          </span>
        )}
      </div>

      {/* Add Button */}
      <button className="w-full mt-4 btn-primary-sm py-2">
        Add
      </button>
    </div>
  );
}

export default ProductCard;
