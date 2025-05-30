import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form.username, form.password);
      navigate(from, { replace: true });
    } catch {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[400px] bg-white border border-border rounded-xl p-8 shadow-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-textPrimary text-center">Login</h2>

        {error && <p className="text-sm text-error text-center">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded font-semibold hover:bg-primaryDark transition"
        >
          Login
        </button>

        <p className="text-center text-sm text-textSecondary">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-primary underline hover:text-primaryDark">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
