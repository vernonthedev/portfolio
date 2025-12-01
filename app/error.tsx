"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

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
            className="inline-flex p-4 rounded-2xl mb-4"
            style={{ backgroundColor: "var(--red)20" }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <AlertCircle className="w-8 h-8" style={{ color: "var(--red)" }} />
          </motion.div>

          <h1 className="text-3xl font-youth font-bold mb-2" style={{ color: "var(--base)" }}>
            Something went wrong!
          </h1>
          <p className="text-sm mb-6" style={{ color: "var(--grey)" }}>
            {error.message || "An unexpected error occurred"}
          </p>

          <motion.button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold"
            style={{
              background: "linear-gradient(135deg, var(--orange), var(--purple))",
              color: "var(--bg)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw className="w-5 h-5" />
            Try again
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

