import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import fetchWrapper from "../api/fetchWrapper";

/**
 * Interface for login response data
 */
interface LoginResponse {
  message?: string;
  user?: { id: number; email: string; isAdmin: boolean };
}

/**
 * LoginForm component handles user authentication
 * @returns JSX.Element
 */
const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      const response: LoginResponse = await fetchWrapper("movies/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.message === "Login successful") {
        toast.success("Login successful");
        console.log(response.user);
        console.log(JSON.stringify(response.user!.isAdmin));
        localStorage.setItem("isadmin", JSON.stringify(response.user!.isAdmin));
        navigate("/movies");
      } else {
        toast.error(response.message || "Login failed");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen trasparent trasparent">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-4 p-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Sign In
        </h2>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition-colors duration-200"
            required
            aria-label="Email address"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition-colors duration-200"
            required
            aria-label="Password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gray-700 text-white font-medium py-2 px-4 
            rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 
            focus:ring-blue-500 focus:ring-offset-2 transition-colors 
            duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
