import { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      await login(form.username, form.password);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Signup failed. Try a different username.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[400px] bg-white border border-border rounded-xl p-8 shadow-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-textPrimary text-center">Sign Up</h2>

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
          type="email"
          placeholder="Email"
          className="w-full p-3 border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
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
          Sign Up
        </button>

        <p className="text-center text-sm text-textSecondary">
          Already have an account?{" "}
          <Link to="/login" className="text-primary underline hover:text-primaryDark">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
