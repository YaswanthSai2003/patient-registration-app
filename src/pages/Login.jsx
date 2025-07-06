import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const validUsername = "admin";
    const validPassword = "nova123";

    if (username === validUsername && password === validPassword) {
      setError(false);
      navigate("/dashboard");
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-blue-200 font-sans">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-sm relative">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">
          Welcome to NovaMed Portal
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Username Field */}
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-500" />
            <input
              type={showPass ? "text" : "password"}
              placeholder="nova123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-3 text-gray-500 cursor-pointer"
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 text-red-700 border border-red-300 px-4 py-2 rounded text-sm text-center">
              Invalid username or password.
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Hint (optional) */}
        <div className="text-xs text-gray-500 text-center mt-4">
          Username: admin <br />
          Password: Nova123
        </div>
      </div>
    </div>
  );
}
