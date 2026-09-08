import { useState } from "react";
import { Menu } from "lucide-react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="min-h-screen lg:ml-64">
        {/* Mobile Header */}
        <div className="flex h-16 items-center border-b border-slate-200 bg-white px-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          <h1 className="ml-3 text-lg font-bold text-slate-900">
            Nova<span className="text-blue-600">lytics</span>
          </h1>
        </div>

        <Topbar />

        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;