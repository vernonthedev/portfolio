export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-youth font-bold mb-2" style={{ color: "var(--base)" }}>
          Settings
        </h1>
        <p className="text-sm" style={{ color: "var(--grey)" }}>
          Configure your admin settings
        </p>
      </div>

      <div
        className="p-6 rounded-[2.5em] border"
        style={{
          borderColor: "var(--border-subtle)",
          backgroundColor: "var(--bg-d)",
        }}
      >
        <p style={{ color: "var(--grey)" }}>Settings panel coming soon...</p>
      </div>
    </div>
  );
}

