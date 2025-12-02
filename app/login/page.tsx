"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, User, LogIn, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "var(--bg)" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div
          className="p-8 rounded-[2.5em] border"
          style={{
            borderColor: "var(--border-subtle)",
            backgroundColor: "var(--bg-d)",
          }}
        >
          <div className="text-center mb-8">
            <motion.div
              className="inline-flex p-4 rounded-2xl mb-4"
              style={{ background: "linear-gradient(135deg, var(--orange), var(--purple))" }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Lock className="w-8 h-8" style={{ color: "var(--bg)" }} />
            </motion.div>
            <h1 className="text-3xl font-youth font-bold mb-2" style={{ color: "var(--base)" }}>
              Admin Login
            </h1>
            <p className="text-sm" style={{ color: "var(--grey)" }}>
              Enter your credentials to access the admin panel
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "var(--base)" }}>
                Username
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: "var(--grey)" }} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl border"
                  style={{
                    borderColor: "var(--border-subtle)",
                    backgroundColor: "var(--bg)",
                    color: "var(--base)",
                  }}
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "var(--base)" }}>
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: "var(--grey)" }} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-12 py-3 rounded-xl border"
                  style={{
                    borderColor: "var(--border-subtle)",
                    backgroundColor: "var(--bg)",
                    color: "var(--base)",
                  }}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  style={{ color: "var(--grey)" }}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl border-2"
                style={{
                  backgroundColor: "var(--red)20",
                  borderColor: "var(--red)50",
                  color: "var(--red)",
                }}
              >
                {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
              style={{
                background: loading
                  ? "var(--grey)"
                  : "linear-gradient(135deg, var(--orange), var(--purple))",
                color: "var(--bg)",
              }}
              whileHover={!loading ? { scale: 1.02 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Login
                </>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

