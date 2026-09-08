import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import orders from "../data/orders";

function RecentOrders() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const ordersPerPage = 4;

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        order.id.toLowerCase().includes(searchValue) ||
        order.customer.toLowerCase().includes(searchValue) ||
        order.product.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  // Close modal with Escape
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedOrder(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const totalPages = Math.ceil(
    filteredOrders.length / ordersPerPage
  );

  const startIndex =
    (currentPage - 1) * ordersPerPage;

  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + ordersPerPage
  );

  const getStatusClass = (status) => {
    if (status === "Completed") {
      return "bg-emerald-100 text-emerald-700";
    }

    if (status === "Pending") {
      return "bg-amber-100 text-amber-700";
    }

    return "bg-red-100 text-red-700";
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("");
  };

  return (
    <>
      <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm sm:p-6">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Recent Orders
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Latest customer transactions
            </p>
          </div>

          <Link
            to="/transactions"
            className="text-sm font-semibold text-slate-700 transition hover:text-blue-600"
          >
            View all →
          </Link>
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-col gap-3 border-b border-slate-100 pb-5 sm:flex-row">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders..."
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 sm:flex-1"
          />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 outline-none transition focus:border-blue-500"
          >
            <option value="All">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Table */}
        <div className="mt-5 overflow-x-auto">
          <table className="min-w-[850px] w-full">
            <thead>
              <tr className="border-b border-slate-200 text-left">
                <th className="pb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Order
                </th>

                <th className="pb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Customer
                </th>

                <th className="pb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Product
                </th>

                <th className="pb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Date
                </th>

                <th className="pb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Amount
                </th>

                <th className="pb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Status
                </th>

                <th className="pb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {paginatedOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-slate-100 transition last:border-0 hover:bg-slate-50"
                >
                  {/* Order */}
                  <td className="py-4 text-sm font-semibold text-slate-900">
                    {order.id}
                  </td>

                  {/* Customer */}
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-600">
                        {getInitials(order.customer)}
                      </div>

                      <span className="text-sm text-slate-700">
                        {order.customer}
                      </span>
                    </div>
                  </td>

                  {/* Product */}
                  <td className="py-4 text-sm text-slate-500">
                    {order.product}
                  </td>

                  {/* Date */}
                  <td className="py-4 text-sm text-slate-500">
                    {order.date}
                  </td>

                  {/* Amount */}
                  <td className="py-4 text-sm font-semibold text-slate-900">
                    {order.amount}
                  </td>

                  {/* Status */}
                  <td className="py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="py-4">
                    <button
                      onClick={() =>
                        setSelectedOrder(order)
                      }
                      className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State */}
          {filteredOrders.length === 0 && (
            <div className="py-12 text-center">
              <p className="font-medium text-slate-900">
                No orders found
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or filter.
              </p>
            </div>
          )}
        </div>

        {/* Footer / Pagination */}
        <div className="mt-5 flex flex-col gap-4 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {filteredOrders.length === 0
                ? 0
                : startIndex + 1}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-slate-700">
              {Math.min(
                startIndex + ordersPerPage,
                filteredOrders.length
              )}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {filteredOrders.length}
            </span>{" "}
            orders
          </p>

          <div className="flex items-center gap-2">
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

      {/* Order Details Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Order Details
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {selectedOrder.id}
                </p>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-6 py-6">
              {/* Customer */}
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                  {getInitials(selectedOrder.customer)}
                </div>

                <div>
                  <p className="text-lg font-bold text-slate-900">
                    {selectedOrder.customer}
                  </p>

                  <p className="text-sm text-slate-500">
                    Customer
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="mt-6 rounded-xl bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-500">
                    Order Status
                  </p>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                      selectedOrder.status
                    )}`}
                  >
                    {selectedOrder.status}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Order ID
                  </p>

                  <p className="mt-2 font-semibold text-slate-900">
                    {selectedOrder.id}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Product
                  </p>

                  <p className="mt-2 font-semibold text-slate-900">
                    {selectedOrder.product}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Amount
                  </p>

                  <p className="mt-2 font-semibold text-slate-900">
                    {selectedOrder.amount}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Order Date
                  </p>

                  <p className="mt-2 font-semibold text-slate-900">
                    {selectedOrder.date}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end border-t border-slate-100 px-6 py-4">
              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RecentOrders;