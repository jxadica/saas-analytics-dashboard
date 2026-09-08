import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const chartData = {
  "7D": [
    { name: "Mon", revenue: 3200 },
    { name: "Tue", revenue: 4100 },
    { name: "Wed", revenue: 3800 },
    { name: "Thu", revenue: 5200 },
    { name: "Fri", revenue: 4600 },
    { name: "Sat", revenue: 6100 },
    { name: "Sun", revenue: 5800 },
  ],

  "30D": [
    { name: "Week 1", revenue: 8200 },
    { name: "Week 2", revenue: 11400 },
    { name: "Week 3", revenue: 9800 },
    { name: "Week 4", revenue: 15600 },
  ],

  "90D": [
    { name: "Jun", revenue: 18400 },
    { name: "Jul", revenue: 22100 },
    { name: "Aug", revenue: 24560 },
  ],

  "12M": [
    { name: "Jan", revenue: 12400 },
    { name: "Feb", revenue: 14200 },
    { name: "Mar", revenue: 15800 },
    { name: "Apr", revenue: 17100 },
    { name: "May", revenue: 19400 },
    { name: "Jun", revenue: 18400 },
    { name: "Jul", revenue: 22100 },
    { name: "Aug", revenue: 24560 },
    { name: "Sep", revenue: 23800 },
    { name: "Oct", revenue: 26900 },
    { name: "Nov", revenue: 29100 },
    { name: "Dec", revenue: 32400 },
  ],
};

const periodLabels = {
  "7D": "Last 7 days",
  "30D": "Last 30 days",
  "90D": "Last 90 days",
  "12M": "Last 12 months",
};

function RevenueChart() {
  const [period, setPeriod] = useState("12M");

  const data = chartData[period];

  const totalRevenue = data.reduce(
    (total, item) => total + item.revenue,
    0
  );

  const averageRevenue = Math.round(
    totalRevenue / data.length
  );

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Revenue Overview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {periodLabels[period]}
          </p>
        </div>

        {/* Period Selector */}
        <div className="flex rounded-xl bg-slate-100 p-1">
          {Object.keys(chartData).map((option) => (
            <button
              key={option}
              onClick={() => setPeriod(option)}
              className={`rounded-lg px-3 py-2 text-xs font-semibold transition sm:px-4 ${
                period === option
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 flex flex-wrap gap-8">
        <div>
          <p className="text-sm text-slate-500">
            Total Revenue
          </p>

          <p className="mt-1 text-2xl font-bold text-slate-900">
            $
            {totalRevenue.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Average
          </p>

          <p className="mt-1 text-2xl font-bold text-slate-900">
            $
            {averageRevenue.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-8 h-[320px] w-full">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient
                id="revenueGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#3b82f6"
                  stopOpacity={0.3}
                />

                <stop
                  offset="100%"
                  stopColor="#3b82f6"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
            />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#94a3b8",
                fontSize: 12,
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#94a3b8",
                fontSize: 12,
              }}
              tickFormatter={(value) =>
                `$${value / 1000}k`
              }
            />

            <Tooltip
              formatter={(value) => [
                `$${Number(value).toLocaleString()}`,
                "Revenue",
              ]}
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow:
                  "0 10px 25px rgba(0,0,0,0.1)",
              }}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={3}
              fill="url(#revenueGradient)"
              activeDot={{
                r: 6,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RevenueChart;