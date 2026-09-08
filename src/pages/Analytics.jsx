import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", revenue: 18000, users: 1200 },
  { month: "Feb", revenue: 21000, users: 1450 },
  { month: "Mar", revenue: 19500, users: 1380 },
  { month: "Apr", revenue: 24500, users: 1720 },
  { month: "May", revenue: 28000, users: 2100 },
  { month: "Jun", revenue: 31500, users: 2380 },
  { month: "Jul", revenue: 35200, users: 2650 },
  { month: "Aug", revenue: 38900, users: 2940 },
];

const stats = [
  { title: "Total Revenue", value: "$38,900", change: "+14.8%" },
  { title: "Active Users", value: "2,940", change: "+11.2%" },
  { title: "Sessions", value: "8,426", change: "+18.4%" },
  { title: "Conversion Rate", value: "6.8%", change: "+2.1%" },
];

const trafficSources = [
  { name: "Direct", percentage: 38 },
  { name: "Google", percentage: 31 },
  { name: "Social Media", percentage: 19 },
  { name: "Referral", percentage: 12 },
];

const funnel = [
  { name: "Visitors", value: 8426, percentage: 100 },
  { name: "Product Views", value: 5842, percentage: 69 },
  { name: "Add to Cart", value: 3218, percentage: 38 },
  { name: "Checkout", value: 1842, percentage: 22 },
  { name: "Purchase", value: 573, percentage: 6.8 },
];

const devices = [
  { name: "Desktop", percentage: 52, sessions: "4,382" },
  { name: "Mobile", percentage: 39, sessions: "3,286" },
  { name: "Tablet", percentage: 9, sessions: "758" },
];

function Analytics() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Analytics
          </h1>

          <p className="mt-1 text-slate-500">
            Track your business performance and growth.
          </p>
        </div>

        <select className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm outline-none">
          <option>Last 8 months</option>
          <option>Last 30 days</option>
          <option>Last 12 months</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-2xl bg-white p-6 shadow-sm"
          >
            <p className="text-sm font-medium text-slate-500">
              {stat.title}
            </p>

            <div className="mt-3 flex items-end justify-between">
              <h2 className="text-2xl font-bold text-slate-900">
                {stat.value}
              </h2>

              <span className="text-sm font-semibold text-emerald-600">
                {stat.change}
              </span>
            </div>

            <p className="mt-2 text-xs text-slate-400">
              vs. previous period
            </p>
          </div>
        ))}
      </div>

      {/* Main Chart */}
      <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            Revenue & User Growth
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Monthly performance overview
          </p>
        </div>

        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id="analyticsRevenue"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopOpacity={0.3} />
                  <stop offset="100%" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${value / 1000}k`}
              />

              <Tooltip
                formatter={(value) => [
                  `$${Number(value).toLocaleString()}`,
                  "Revenue",
                ]}
              />

              <Area
                type="monotone"
                dataKey="revenue"
                strokeWidth={3}
                fill="url(#analyticsRevenue)"
                fillOpacity={1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Traffic + Device */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Traffic Sources */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900">
              Traffic Sources
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Where your visitors come from
            </p>
          </div>

          <div className="space-y-5">
            {trafficSources.map((source) => (
              <div key={source.name}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">
                    {source.name}
                  </span>

                  <span className="text-sm font-semibold text-slate-900">
                    {source.percentage}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Analytics */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900">
              Device Analytics
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Sessions by device type
            </p>
          </div>

          <div className="space-y-5">
            {devices.map((device) => (
              <div key={device.name}>
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-slate-700">
                      {device.name}
                    </span>

                    <span className="ml-2 text-xs text-slate-400">
                      {device.sessions} sessions
                    </span>
                  </div>

                  <span className="text-sm font-semibold text-slate-900">
                    {device.percentage}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-slate-800"
                    style={{ width: `${device.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            Conversion Funnel
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Track users through the purchase journey
          </p>
        </div>

        <div className="space-y-4">
          {funnel.map((step) => (
            <div
              key={step.name}
              className="flex items-center gap-4"
            >
              <div className="w-28 text-sm font-medium text-slate-700">
                {step.name}
              </div>

              <div className="flex-1">
                <div className="h-10 overflow-hidden rounded-lg bg-slate-100">
                  <div
                    className="flex h-full items-center rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white"
                    style={{
                      width: `${Math.max(step.percentage, 8)}%`,
                    }}
                  >
                    {step.value.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="w-14 text-right text-sm font-semibold text-slate-600">
                {step.percentage}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Analytics;