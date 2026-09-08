import { useEffect, useMemo, useState } from "react";
import customers from "../data/customers";

function Customers() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const customersPerPage = 4;

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch =
        customer.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        customer.email
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        customer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  // Reset pagination when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  // Close modal with Escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedCustomer(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const totalPages = Math.ceil(
    filteredCustomers.length / customersPerPage
  );

  const startIndex =
    (currentPage - 1) * customersPerPage;

  const paginatedCustomers = filteredCustomers.slice(
    startIndex,
    startIndex + customersPerPage
  );

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("");
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Customers
          </h1>

          <p className="mt-1 text-slate-500">
            Manage and monitor your customer base.
          </p>
        </div>

        <button className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
          + Add Customer
        </button>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Customers
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            4,280
          </p>

          <p className="mt-2 text-sm text-green-600">
            +8.1% this month
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Active Customers
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            3,842
          </p>

          <p className="mt-2 text-sm text-green-600">
            89.8% of total
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            New Customers
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            284
          </p>

          <p className="mt-2 text-sm text-green-600">
            +12.4% this month
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Avg. Customer Value
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            $2,184
          </p>

          <p className="mt-2 text-sm text-green-600">
            +5.2% this month
          </p>
        </div>
      </div>

      {/* Customer Table */}
      <div className="mt-6 rounded-2xl bg-white shadow-sm">
        {/* Filters */}
        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row">
          <div className="flex-1">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customers..."
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 outline-none focus:border-blue-500"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Results */}
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full">
            <thead>
              <tr className="border-b border-slate-100 text-left">
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Customer
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Plan
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Status
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Revenue
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Joined
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {paginatedCustomers.map((customer) => (
                <tr
                  key={customer.email}
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                >
                  {/* Customer */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                        {getInitials(customer.name)}
                      </div>

                      <div>
                        <p className="font-medium text-slate-900">
                          {customer.name}
                        </p>

                        <p className="text-sm text-slate-500">
                          {customer.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Plan */}
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">
                    {customer.plan}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        customer.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>

                  {/* Revenue */}
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                    {customer.revenue}
                  </td>

                  {/* Joined */}
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {customer.joined}
                  </td>

                  {/* Action */}
                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        setSelectedCustomer(customer)
                      }
                      className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State */}
          {filteredCustomers.length === 0 && (
            <div className="px-6 py-12 text-center">
              <p className="font-medium text-slate-900">
                No customers found
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or filter.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex flex-col gap-4 border-t border-slate-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {filteredCustomers.length === 0
                ? 0
                : startIndex + 1}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-slate-700">
              {Math.min(
                startIndex + customersPerPage,
                filteredCustomers.length
              )}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {filteredCustomers.length}
            </span>{" "}
            customers
          </p>

          <div className="flex items-center gap-2">
            {/* Previous */}
            <button
              onClick={() =>
                setCurrentPage((page) =>
                  Math.max(page - 1, 1)
                )
              }
              disabled={currentPage === 1}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {Array.from(
                { length: totalPages },
                (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() =>
                      setCurrentPage(index + 1)
                    }
                    className={`h-9 w-9 rounded-lg text-sm font-medium transition ${
                      currentPage === index + 1
                        ? "bg-blue-600 text-white"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {index + 1}
                  </button>
                )
              )}
            </div>

            {/* Next */}
            <button
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(page + 1, totalPages)
                )
              }
              disabled={
                currentPage === totalPages ||
                totalPages === 0
              }
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onClick={() => setSelectedCustomer(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Customer Details
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Customer account information
                </p>
              </div>

              <button
                onClick={() => setSelectedCustomer(null)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {/* Customer Profile */}
            <div className="px-6 py-6">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600">
                  {getInitials(selectedCustomer.name)}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {selectedCustomer.name}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {selectedCustomer.email}
                  </p>

                  <span
                    className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      selectedCustomer.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {selectedCustomer.status}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Plan
                  </p>

                  <p className="mt-2 font-semibold text-slate-900">
                    {selectedCustomer.plan}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Total Revenue
                  </p>

                  <p className="mt-2 font-semibold text-slate-900">
                    {selectedCustomer.revenue}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Joined
                  </p>

                  <p className="mt-2 font-semibold text-slate-900">
                    {selectedCustomer.joined}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Customer ID
                  </p>

                  <p className="mt-2 font-semibold text-slate-900">
                    #{selectedCustomer.email
                      .split("@")[0]
                      .slice(0, 8)
                      .toUpperCase()}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end border-t border-slate-100 px-6 py-4">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Customers;