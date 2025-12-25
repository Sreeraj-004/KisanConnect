import { useNavigate } from "react-router-dom";
import { useState } from "react";

function FarmerSignup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="w-[460px] bg-white p-10 rounded-lg shadow-md border-l-8 border-green-700">

        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-bold text-green-800">
              Customer Registration
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Buy straight from farm
            </p>
          </div>
          <span className="text-xs text-gray-400">
            {step}/3
          </span>
        </div>

        {/* Animated Content Wrapper */}
        <div className="relative">

          {/* STEP 1 — Name */}
          <div className={`step-wrapper ${step === 1 ? "step-open" : "step-closed"}`}>
            <div className="step-content space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 border rounded-md
                focus:outline-none
                focus:ring-2 focus:ring-inset focus:ring-green-600"

              />

              <button
                onClick={() => setStep(2)}
                className="w-full bg-green-700 text-white py-2 rounded-md font-semibold hover:bg-green-800 transition"
              >
                Continue
              </button>
            </div>
          </div>

          {/* STEP 2 — Contact + Password */}
          <div className={`step-wrapper ${step === 2 ? "step-open" : "step-closed"}`}>
            <div className="step-content space-y-4">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-2 border rounded-md
                focus:outline-none
                focus:ring-2 focus:ring-inset focus:ring-green-600"

              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create Password"
                className="w-full px-4 py-2 border rounded-md
                focus:outline-none
                focus:ring-2 focus:ring-inset focus:ring-green-600"

                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-2 border rounded-md
                focus:outline-none
                focus:ring-2 focus:ring-inset focus:ring-green-600"

              />

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="w-1/3 border border-green-700 text-green-700 py-2 rounded-md"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="w-2/3 bg-green-700 text-white py-2 rounded-md font-semibold hover:bg-green-800 transition"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>

          {/* STEP 3 — Address */}
          <div className={`step-wrapper ${step === 3 ? "step-open" : "step-closed"}`}>
            <div className="step-content space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-md p-3 grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Village / Locality"
                  className="col-span-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 bg-white"
                />
                <input
                  type="text"
                  placeholder="District"
                  className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 bg-white"
                />
                <input
                  type="text"
                  placeholder="Pincode"
                  className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 bg-white"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="w-1/3 border border-green-700 text-green-700 py-2 rounded-md"
                >
                  Back
                </button>
                <button
                  className="w-2/3 bg-green-700 text-white py-2 rounded-md font-semibold hover:bg-green-800 transition"
                >
                  Register as Farmer
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 text-sm mt-6 ">
          Already registered?{" "}
          <span
            className="text-green-700 font-medium cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Sign in
          </span>
        </p>
        <p className="text-center text-gray-600 text-sm mt-1">
          Are you a farmer?{" "}
          <span
            className="text-green-700 font-medium cursor-pointer hover:underline"
            onClick={() => navigate("/farmer-signup")}
          >
            Sign up as Farmer<br></br>
          </span>
        </p>

      </div>
    </div>
  );
}

export default FarmerSignup;
