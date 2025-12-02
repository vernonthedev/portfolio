import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "var(--bg)" }}>
      <div className="max-w-md w-full text-center">
        <div
          className="p-8 rounded-[2.5em] border"
          style={{
            borderColor: "var(--border-subtle)",
            backgroundColor: "var(--bg-d)",
          }}
        >
          <h1 className="text-3xl font-youth font-bold mb-2" style={{ color: "var(--base)" }}>
            404 - Page Not Found
          </h1>
          <p className="text-sm mb-6" style={{ color: "var(--grey)" }}>
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold" style={{ background: "linear-gradient(135deg, var(--orange), var(--purple))", color: "var(--bg)" }}>
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
