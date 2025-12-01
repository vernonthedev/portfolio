import { getAnalyticsStats, getMonthlyVisits } from "@/lib/analytics";
import { prisma } from "@/lib/prisma";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { MonthlyVisitsChart } from "@/components/admin/MonthlyVisitsChart";

export default async function AdminDashboard() {
  const [stats, monthlyVisits, recentLogs] = await Promise.all([
    getAnalyticsStats(30),
    getMonthlyVisits(),
    prisma.auditLog.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: { user: { select: { username: true } } },
    }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-youth font-bold mb-2" style={{ color: "var(--base)" }}>
          Dashboard
        </h1>
        <p className="text-sm" style={{ color: "var(--grey)" }}>
          Overview of your portfolio analytics and activity
        </p>
      </div>

      <DashboardStats stats={stats} />
      <MonthlyVisitsChart data={monthlyVisits} />

      <div
        className="p-6 rounded-[2.5em] border"
        style={{
          borderColor: "var(--border-subtle)",
          backgroundColor: "var(--bg-d)",
        }}
      >
        <h2 className="text-2xl font-youth font-bold mb-4" style={{ color: "var(--base)" }}>
          Recent Activity
        </h2>
        <div className="space-y-2">
          {recentLogs.map((log) => (
            <div
              key={log.id}
              className="p-4 rounded-xl border"
              style={{
                borderColor: "var(--border-subtle)",
                backgroundColor: "var(--bg)",
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold" style={{ color: "var(--base)" }}>
                    {log.user.username}
                  </span>
                  <span className="text-sm ml-2" style={{ color: "var(--grey)" }}>
                    {log.action} {log.entityType}
                  </span>
                </div>
                <span className="text-xs" style={{ color: "var(--grey)" }}>
                  {new Date(log.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

