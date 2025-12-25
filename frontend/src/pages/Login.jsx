import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="w-[420px] bg-white p-10 rounded-lg shadow-md border-l-8 border-r-8 border-green-700">

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-green-800 text-center">
            Welcome Back
          </h2>
          <p className="text-center text-gray-600 text-sm mt-1">
            Sign in to your account
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
          />

          <button className="w-full bg-green-700 text-white py-2 rounded-md font-semibold hover:bg-green-800 transition">
            Sign In
          </button>
        </div>

        {/* Footer Links */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Don’t have an account?{" "}
          <span
            className="text-green-700 font-medium cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Create account
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
