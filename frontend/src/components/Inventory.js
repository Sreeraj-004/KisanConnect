import React from 'react';
import { useNavigate } from 'react-router-dom';

function InventoryCard() {
  const navigate = useNavigate();
  return (
    <div className="border border-primaryDark rounded-lg bg-white shadow-sm">

      {/* Header */}
      <div className="px-4 py-3 bg-primaryDark flex items-center justify-between text-white rounded-t-lg">
        <h2 className="text-lg font-semibold">Inventory</h2>

        <button className="ml-auto btn-primary-sm text-sm"
            onClick={() => navigate("/register-product")}>
          Add new product
        </button>
        <button className="ml-1 btn-secondary-sm text-sm"
            onClick={() => navigate("/inventory")}>
          View more
        </button>
      </div>

      {/* Content */}
      <div className="p-4 text-sm space-y-2">
        <div className="flex justify-between">
          <span>Tomatoes</span>
          <span>45 kg</span>
        </div>
        <div className="flex justify-between">
          <span>Banana</span>
          <span>120 pcs</span>
        </div>
        <div className="flex justify-between">
          <span>Coconut</span>
          <span>60 pcs</span>
        </div>
      </div>
    </div>
  );
}

export default InventoryCard;
