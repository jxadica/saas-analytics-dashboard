import { useMemo, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const growthData = {
  "7D": [
    { name: "Mon", customers: 34 },
    { name: "Tue", customers: 42 },
    { name: "Wed", customers: 38 },
    { name: "Thu", customers: 51 },
    { name: "Fri", customers: 47 },
    { name: "Sat", customers: 63 },
    { name: "Sun", customers: 58 },
  ],
  "30D": [
    { name: "Week 1", customers: 182 },
    { name: "Week 2", customers: 248 },
    { name: "Week 3", customers: 214 },
    { name: "Week 4", customers: 296 },
  ],
  "90D": [
    { name: "Jun", customers: 684 },
    { name: "Jul", customers: 842 },
    { name: "Aug", customers: 1120 },
  ],
  "12M": [
    { name: "Jan", customers: 420 },
    { name: "Feb", customers: 510 },
    { name: "Mar", customers: 620 },
    { name: "Apr", customers: 710 },
    { name: "May", customers: 790 },
    { name: "Jun", customers: 684 },
    { name: "Jul", customers: 842 },
    { name: "Aug", customers: 1120 },
  ],
};

const periodLabels = {
  "7D": "Last 7 days",
  "30D": "Last 30 days",
  "90D": "Last 90 days",
  "12M": "Last 12 months",
};

function CustomerGrowth() {
  const [period, setPeriod] = useState("30D");

  const data = growthData[period];

  const totalCustomers = useMemo(() => {
    return data.reduce((total, item) => total + item.customers, 0);
  }, [data]);

  const averageCustomers = Math.round(totalCustomers / data.length);

  const growthPercentage = {
    "7D": "+8.4%",
    "30D": "+12.6%",
    "90D": "+18.2%",
    "12M": "+24.8%",
  };

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Customer Growth
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {periodLabels[period]}
          </p>
        </div>

        {/* Period Selector */}
        <div className="flex rounded-xl bg-slate-100 p-1">
          {Object.keys(growthData).map((option) => (
            <button
              key={option}
              onClick={() => setPeriod(option)}
              className={`rounded-lg px-2.5 py-2 text-xs font-semibold transition sm:px-3 ${
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

      {/* Metrics */}
      <div className="mt-6 flex flex-wrap items-end gap-8">
        <div>
          <p className="text-sm text-slate-500">Total Customers</p>

          <div className="mt-1 flex items-center gap-2">
            <p className="text-2xl font-bold text-slate-900">
              {totalCustomers.toLocaleString()}
            </p>

            <span className="rounded-lg bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-600">
              {growthPercentage[period]}
            </span>
          </div>
        </div>

        <div>
          <p className="text-sm text-slate-500">Average</p>

          <p className="mt-1 text-2xl font-bold text-slate-900">
            {averageCustomers.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-6 h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 5,
              left: -25,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient
                id="customerGrowthGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#3b82f6"
                  stopOpacity={0.25}
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
            />

            <Tooltip
              formatter={(value) => [
                `${Number(value).toLocaleString()}`,
                "Customers",
              ]}
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              }}
            />

            <Area
              type="monotone"
              dataKey="customers"
              stroke="#3b82f6"
              strokeWidth={3}
              fill="url(#customerGrowthGradient)"
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

export default CustomerGrowth;