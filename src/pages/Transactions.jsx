import { useEffect, useMemo, useState } from "react";
import transactions from "../data/transactions";

function Transactions() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTransaction, setSelectedTransaction] =
    useState(null);

  const transactionsPerPage = 4;

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        transaction.id.toLowerCase().includes(searchValue) ||
        transaction.customer
          .toLowerCase()
          .includes(searchValue) ||
        transaction.email
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        transaction.status === statusFilter;

      const matchesPayment =
        paymentFilter === "All" ||
        transaction.method === paymentFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPayment
      );
    });
  }, [search, statusFilter, paymentFilter]);

  // Reset pagination whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, paymentFilter]);

  // Close modal with Escape
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedTransaction(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const totalPages = Math.ceil(
    filteredTransactions.length / transactionsPerPage
  );

  const startIndex =
    (currentPage - 1) * transactionsPerPage;

  const paginatedTransactions =
    filteredTransactions.slice(
      startIndex,
      startIndex + transactionsPerPage
    );

  const getStatusClass = (status) => {
    if (status === "Completed") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Pending") {
      return "bg-yellow-100 text-yellow-700";
    }

    if (status === "Failed") {
      return "bg-red-100 text-red-700";
    }

    return "bg-slate-100 text-slate-600";
  };

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
            Transactions
          </h1>

          <p className="mt-1 text-slate-500">
            Monitor payments and transaction activity.
          </p>
        </div>

        <button className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
          Export Report
        </button>
      </div>

      {/* Summary Cards */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Revenue
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            $38,920
          </p>

          <p className="mt-2 text-sm text-green-600">
            +12.4% this month
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Transactions
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            1,240
          </p>

          <p className="mt-2 text-sm text-green-600">
            +8.7% this month
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Successful
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            96.4%
          </p>

          <p className="mt-2 text-sm text-green-600">
            +1.8% this month
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Avg. Transaction
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            $184.60
          </p>

          <p className="mt-2 text-sm text-green-600">
            +5.2% this month
          </p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="mt-6 rounded-2xl bg-white shadow-sm">
        {/* Filters */}
        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 lg:flex-row">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search transaction ID or customer..."
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
            />
          </div>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 outline-none focus:border-blue-500"
          >
            <option value="All">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
            <option value="Refunded">Refunded</option>
          </select>

          {/* Payment Method */}
          <select
            value={paymentFilter}
            onChange={(e) =>
              setPaymentFilter(e.target.value)
            }
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 outline-none focus:border-blue-500"
          >
            <option value="All">All Payment Methods</option>
            <option value="Card">Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Bank Transfer">
              Bank Transfer
            </option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-[1000px] w-full">
            <thead>
              <tr className="border-b border-slate-100 text-left">
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Transaction
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Customer
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Payment
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Amount
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Status
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Date
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {paginatedTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                >
                  {/* Transaction ID */}
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900">
                      {transaction.id}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Payment
                    </p>
                  </td>

                  {/* Customer */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                        {getInitials(transaction.customer)}
                      </div>

                      <div>
                        <p className="font-medium text-slate-900">
                          {transaction.customer}
                        </p>

                        <p className="text-sm text-slate-500">
                          {transaction.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Payment */}
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-700">
                      {transaction.payment}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {transaction.method}
                    </p>
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                    {transaction.amount}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                        transaction.status
                      )}`}
                    >
                      {transaction.status}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {transaction.date}
                  </td>

                  {/* View */}
                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        setSelectedTransaction(transaction)
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
          {filteredTransactions.length === 0 && (
            <div className="px-6 py-12 text-center">
              <p className="font-medium text-slate-900">
                No transactions found
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or filters.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex flex-col gap-4 border-t border-slate-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {filteredTransactions.length === 0
                ? 0
                : startIndex + 1}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-slate-700">
              {Math.min(
                startIndex + transactionsPerPage,
                filteredTransactions.length
              )}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {filteredTransactions.length}
            </span>{" "}
            transactions
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

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onClick={() => setSelectedTransaction(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Transaction Details
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {selectedTransaction.id}
                </p>
              </div>

              <button
                onClick={() => setSelectedTransaction(null)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {/* Transaction Content */}
            <div className="px-6 py-6">
              {/* Amount */}
              <div className="rounded-2xl bg-slate-50 p-5 text-center">
                <p className="text-sm text-slate-500">
                  Transaction Amount
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {selectedTransaction.amount}
                </p>

                <span
                  className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                    selectedTransaction.status
                  )}`}
                >
                  {selectedTransaction.status}
                </span>
              </div>

              {/* Customer */}
              <div className="mt-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                  {getInitials(
                    selectedTransaction.customer
                  )}
                </div>

                <div>
                  <p className="font-semibold text-slate-900">
                    {selectedTransaction.customer}
                  </p>

                  <p className="text-sm text-slate-500">
                    {selectedTransaction.email}
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Transaction ID
                  </p>

                  <p className="mt-2 font-semibold text-slate-900">
                    {selectedTransaction.id}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Payment Method
                  </p>

                  <p className="mt-2 font-semibold text-slate-900">
                    {selectedTransaction.payment}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Type
                  </p>

                  <p className="mt-2 font-semibold text-slate-900">
                    {selectedTransaction.method}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Date
                  </p>

                  <p className="mt-2 font-semibold text-slate-900">
                    {selectedTransaction.date}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end border-t border-slate-100 px-6 py-4">
              <button
                onClick={() => setSelectedTransaction(null)}
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

export default Transactions;