"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function MonthlyVisitsChart({ data }: { data: Array<{ month: string; visits: number }> }) {
  return (
    <div
      className="p-6 rounded-[2.5em] border"
      style={{
        borderColor: "var(--border-subtle)",
        backgroundColor: "var(--bg-d)",
      }}
    >
      <h2 className="text-2xl font-youth font-bold mb-4" style={{ color: "var(--base)" }}>
        Monthly Visits
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
          <XAxis
            dataKey="month"
            stroke="var(--grey)"
            style={{ fontSize: "12px" }}
          />
          <YAxis
            stroke="var(--grey)"
            style={{ fontSize: "12px" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--bg-d)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "12px",
            }}
          />
          <Bar
            dataKey="visits"
            fill="var(--orange)"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

