import { useMemo, useState } from "react";

import StatCard from "../components/StatCard";
import RevenueChart from "../components/RevenueChart";
import RecentOrders from "../components/RecentOrders";
import CustomerGrowth from "../components/CustomerGrowth";
import TrafficSources from "../components/TrafficSources";

const dashboardData = {
  Today: {
    revenue: "$1,840",
    customers: "42",
    orders: "68",
    conversion: "5.2%",
    revenueChange: "+8.4%",
    customerChange: "+5.1%",
    orderChange: "+11.2%",
    conversionChange: "+0.8%",
  },

  "7 Days": {
    revenue: "$8,420",
    customers: "284",
    orders: "312",
    conversion: "5.8%",
    revenueChange: "+10.2%",
    customerChange: "+7.4%",
    orderChange: "+12.8%",
    conversionChange: "+1.2%",
  },

  "30 Days": {
    revenue: "$24,560",
    customers: "1,120",
    orders: "1,240",
    conversion: "6.1%",
    revenueChange: "+12.4%",
    customerChange: "+8.1%",
    orderChange: "+14.6%",
    conversionChange: "+1.5%",
  },

  "12 Months": {
    revenue: "$286,420",
    customers: "4,280",
    orders: "14,820",
    conversion: "6.8%",
    revenueChange: "+18.7%",
    customerChange: "+15.2%",
    orderChange: "+21.4%",
    conversionChange: "+2.1%",
  },
};

function Dashboard() {
  const [dateRange, setDateRange] = useState("30 Days");

  const data = useMemo(() => {
    return dashboardData[dateRange];
  }, [dateRange]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Dashboard
          </h1>

          <p className="mt-1 text-slate-500">
            Welcome back. Here's what's happening with your business.
          </p>
        </div>

        {/* Date Range */}
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 sm:w-auto"
        >
          <option value="Today">Today</option>
          <option value="7 Days">Last 7 Days</option>
          <option value="30 Days">Last 30 Days</option>
          <option value="12 Months">Last 12 Months</option>
        </select>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={data.revenue}
          change={data.revenueChange}
          
        />

        <StatCard
          title="Customers"
          value={data.customers}
          change={data.customerChange}
          
        />

        <StatCard
          title="Orders"
          value={data.orders}
          change={data.orderChange}
          
        />

        <StatCard
          title="Conversion Rate"
          value={data.conversion}
          change={data.conversionChange}
          
        />
      </div>

      {/* Revenue */}
      <div className="mt-6">
        <RevenueChart />
      </div>

      {/* Recent Orders */}
      <div className="mt-6">
        <RecentOrders />
      </div>

      {/* Analytics */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CustomerGrowth />
        <TrafficSources />
      </div>
    </div>
  );
}

export default Dashboard;