import { getAnalyticsStats, getMonthlyVisits } from "@/lib/analytics";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { MonthlyVisitsChart } from "@/components/admin/MonthlyVisitsChart";

export const dynamic = 'force-dynamic';

export default async function AdminAnalyticsPage() {
  const [stats, monthlyVisits] = await Promise.all([
    getAnalyticsStats(30),
    getMonthlyVisits(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-youth font-bold mb-2" style={{ color: "var(--base)" }}>
          Analytics
        </h1>
        <p className="text-sm" style={{ color: "var(--grey)" }}>
          Track your portfolio performance and engagement
        </p>
      </div>

      <DashboardStats stats={stats} />
      <MonthlyVisitsChart data={monthlyVisits} />
    </div>
  );
}

