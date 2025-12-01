import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "var(--bg)" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center"
      >
        <div
          className="p-8 rounded-[2.5em] border"
          style={{
            borderColor: "var(--border-subtle)",
            backgroundColor: "var(--bg-d)",
          }}
        >
          <motion.div
            className="text-9xl font-youth font-bold mb-4"
            style={{ color: "var(--orange)" }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            404
          </motion.div>

          <h1 className="text-3xl font-youth font-bold mb-2" style={{ color: "var(--base)" }}>
            Page Not Found
          </h1>
          <p className="text-sm mb-6" style={{ color: "var(--grey)" }}>
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="flex gap-4 justify-center">
            <motion.a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold"
              style={{
                background: "linear-gradient(135deg, var(--orange), var(--purple))",
                color: "var(--bg)",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home className="w-5 h-5" />
              Go Home
            </motion.a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

