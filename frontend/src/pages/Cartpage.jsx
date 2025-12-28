import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import img1 from "../static/img/img1.jpg";
import img2 from "../static/img/img2.jpg";

function Cart() {
  const cartItems = [
    {
      id: 1,
      name: "Tomato – Local Fresh",
      quantity: "1 kg",
      price: 39,
      image: img1,
    },
    {
      id: 2,
      name: "Potato",
      quantity: "500 g",
      price: 29,
      image: img2,
    },
    {
      id: 4,
      name: "Potato",
      quantity: "500 g",
      price: 29,
      image: img2,
    },
    {
      id: 3,
      name: "Potato",
      quantity: "500 g",
      price: 29,
      image: img2,
    },
  ];

  return (
    <>
      <div className="w-full min-h-screen bg-light">
        <Navbar title="Your Cart" />

        <div className="mx-14 px-5 py-8 ">

          <div className="grid grid-cols-12 gap-8">

            {/* Cart Items */}
            <div className="col-span-8 bg-white border border-green-200 rounded-lg  shadow-sm">

              {/* Header */}
              <div className="px-6 py-4 border-b bg-primaryDark text-white rounded-t-lg">
                <h1 className="text-xl font-semibold">
                  Shopping Cart
                </h1>
              </div>

              {/* Items */}
              <div className="divide-y">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-6 p-6"
                  >
                    {/* Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-md border"
                    />

                    {/* Details */}
                    <div className="flex-1">
                      <h2 className="text-lg font-medium text-gray-800">
                        {item.name}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {item.quantity}
                      </p>

                      <div className="mt-3 flex items-center gap-4">
                        {/* Quantity */}
                        <div className="flex items-center border rounded-md">
                          <button className="px-3 py-1 text-lg">−</button>
                          <span className="px-4">1</span>
                          <button className="px-3 py-1 text-lg">+</button>
                        </div>

                        {/* Remove */}
                        <button className="text-sm text-red-600 hover:underline">
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-lg font-semibold text-primaryDark">
                      ₹{item.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="col-span-4 bg-white border border-green-200 rounded-lg shadow-sm h-fit">

              <div className="px-6 py-4 bg-primaryDark text-white rounded-t-lg">
                <h2 className="text-lg font-semibold">
                  Order Summary
                </h2>
              </div>

              <div className="p-6 space-y-4 text-sm">

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹68</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="text-green-600">Free</span>
                </div>

                <hr />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-primaryDark">₹68</span>
                </div>

                <button className="btn-primary-sm py-4 w-full mt-6">
                  Proceed to Checkout
                </button>

              </div>
            </div>

          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Cart;
