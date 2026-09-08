
import { useEffect, useRef, useState } from "react";
import {
  Bell,
  Search,
  ChevronDown,
  X,
  User,
  ShoppingCart,
  CreditCard,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import customers from "../data/customers";
import orders from "../data/orders";
import transactions from "../data/transactions";

function Topbar() {
  const navigate = useNavigate();

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New customer registered",
      message: "Emma Wilson created an account.",
      time: "5 min ago",
      read: false,
    },
    {
      id: 2,
      title: "Payment received",
      message: "A payment of $920 was received.",
      time: "24 min ago",
      read: false,
    },
    {
      id: 3,
      title: "Weekly report ready",
      message: "Your analytics report is ready.",
      time: "2 hours ago",
      read: false,
    },
  ]);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }

      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(event.target)
      ) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const markNotificationAsRead = (id) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const handleNotificationClick = (notification) => {
    markNotificationAsRead(notification.id);
  };

  /*
    Build searchable results from shared data.
  */
  const searchResults = [];

  if (search.trim()) {
    const searchValue = search.toLowerCase().trim();

    customers.forEach((customer) => {
      const matches =
        customer.name.toLowerCase().includes(searchValue) ||
        customer.email.toLowerCase().includes(searchValue) ||
        customer.plan.toLowerCase().includes(searchValue);

      if (matches) {
        searchResults.push({
          type: "Customer",
          title: customer.name,
          subtitle: `${customer.email} · ${customer.plan} Plan`,
          path: "/customers",
          icon: User,
        });
      }
    });

    orders.forEach((order) => {
      const matches =
        order.id.toLowerCase().includes(searchValue) ||
        order.customer.toLowerCase().includes(searchValue) ||
        order.product.toLowerCase().includes(searchValue) ||
        order.status.toLowerCase().includes(searchValue);

      if (matches) {
        searchResults.push({
          type: "Order",
          title: order.id,
          subtitle: `${order.customer} · ${order.product} · ${order.amount}`,
          path: "/",
          icon: ShoppingCart,
        });
      }
    });

    transactions.forEach((transaction) => {
      const matches =
        transaction.id.toLowerCase().includes(searchValue) ||
        transaction.customer.toLowerCase().includes(searchValue) ||
        transaction.method.toLowerCase().includes(searchValue) ||
        transaction.type.toLowerCase().includes(searchValue) ||
        transaction.status.toLowerCase().includes(searchValue);

      if (matches) {
        searchResults.push({
          type: "Transaction",
          title: transaction.id,
          subtitle: `${transaction.customer} · ${transaction.amount} · ${transaction.status}`,
          path: "/transactions",
          icon: CreditCard,
        });
      }
    });
  }

  const visibleResults = searchResults.slice(0, 8);

  const handleSearchSelect = (result) => {
    navigate(result.path);
    setSearch("");
    setSearchOpen(false);
  };

  const clearSearch = () => {
    setSearch("");
    setSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Desktop Search */}
        <div
          ref={searchRef}
          className="relative hidden w-full max-w-md md:block"
        >
          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSearchOpen(true);
            }}
            onFocus={() => {
              if (search.trim()) {
                setSearchOpen(true);
              }
            }}
            placeholder="Search anything..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-10 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white"
          />

          {search && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              aria-label="Clear search"
            >
              <X size={15} />
            </button>
          )}

          {/* Search Results */}
          {searchOpen && search.trim() && (
            <div className="absolute left-0 right-0 top-full mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
              {visibleResults.length > 0 ? (
                <>
                  <div className="border-b border-slate-100 px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Search Results
                    </p>
                  </div>

                  <div className="max-h-[420px] overflow-y-auto p-2">
                    {visibleResults.map((result, index) => {
                      const Icon = result.icon;

                      return (
                        <button
                          key={`${result.type}-${result.title}-${index}`}
                          onClick={() => handleSearchSelect(result)}
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-slate-50"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                            <Icon size={17} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <p className="truncate text-sm font-semibold text-slate-900">
                                {result.title}
                              </p>

                              <span className="shrink-0 rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500">
                                {result.type}
                              </span>
                            </div>

                            <p className="mt-0.5 truncate text-xs text-slate-500">
                              {result.subtitle}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="px-5 py-10 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                    <Search size={21} />
                  </div>

                  <p className="mt-3 text-sm font-semibold text-slate-900">
                    No results found
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Try searching for a customer, order, or transaction.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Side */}
        <div className="ml-auto flex items-center gap-3">

          {/* Mobile Search */}
          <button
            onClick={() => setSearchOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 md:hidden"
            aria-label="Search"
          >
            <Search size={20} />
          </button>

          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() =>
                setNotificationsOpen((open) => !open)
              }
              className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              aria-label="Notifications"
            >
              <Bell size={20} />

              {unreadCount > 0 && (
                <span className="absolute right-2 top-2 flex h-2.5 min-w-2.5 items-center justify-center rounded-full bg-blue-600 ring-2 ring-white" />
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-3 w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Notifications
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      {unreadCount === 0
                        ? "You're all caught up"
                        : `You have ${unreadCount} unread ${
                            unreadCount === 1
                              ? "notification"
                              : "notifications"
                          }`}
                    </p>
                  </div>

                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                {/* Notifications */}
                <div>
                  {notifications.map((notification) => (
                    <button
                      key={notification.id}
                      onClick={() =>
                        handleNotificationClick(notification)
                      }
                      className={`flex w-full gap-3 border-b border-slate-100 px-5 py-4 text-left transition hover:bg-slate-50 ${
                        !notification.read
                          ? "bg-blue-50/40"
                          : "bg-white"
                      }`}
                    >
                      <div
                        className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                          notification.read
                            ? "bg-slate-100 text-slate-400"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        <Bell size={16} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p
                            className={`text-sm ${
                              notification.read
                                ? "font-medium text-slate-700"
                                : "font-semibold text-slate-900"
                            }`}
                          >
                            {notification.title}
                          </p>

                          {!notification.read && (
                            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                          )}
                        </div>

                        <p className="mt-1 text-xs text-slate-500">
                          {notification.message}
                        </p>

                        <p className="mt-2 text-xs text-slate-400">
                          {notification.time}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Footer */}
                <button
                  onClick={() => setNotificationsOpen(false)}
                  className="flex w-full items-center justify-center gap-2 px-5 py-4 text-sm font-semibold text-blue-600 transition hover:bg-slate-50"
                >
                  View all notifications

                  <ChevronDown
                    size={15}
                    className="-rotate-90"
                  />
                </button>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="hidden h-8 w-px bg-slate-200 sm:block" />

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen((open) => !open)}
              className="flex items-center gap-3 rounded-xl p-1.5 pr-2 transition hover:bg-slate-100"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                AM
              </div>

              <div className="hidden text-left sm:block">
                <p className="text-sm font-semibold text-slate-900">
                  Admin
                </p>

                <p className="text-xs text-slate-500">
                  Administrator
                </p>
              </div>

              <ChevronDown
                size={16}
                className={`hidden text-slate-400 transition sm:block ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">

                <div className="border-b border-slate-100 px-4 py-4">
                  <p className="font-semibold text-slate-900">
                    Admin
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    admin@novalytics.com
                  </p>
                </div>

                <div className="p-2">
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/settings");
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                  >
                    <User size={17} />
                    <span>Profile</span>
                  </button>

                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/settings");
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                  >
                    <span>Account Settings</span>
                  </button>
                </div>

                <div className="border-t border-slate-100 p-2">
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      {searchOpen && (
        <div
          ref={mobileSearchRef}
          className="border-t border-slate-100 px-4 py-3 md:hidden"
        >
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              autoFocus
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search anything..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-10 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
            />

            {search && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {search.trim() && (
            <div className="mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
              {visibleResults.length > 0 ? (
                <div className="max-h-[50vh] overflow-y-auto p-2">
                  {visibleResults.map((result, index) => {
                    const Icon = result.icon;

                    return (
                      <button
                        key={`${result.type}-${result.title}-mobile-${index}`}
                        onClick={() => handleSearchSelect(result)}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-slate-50"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                          <Icon size={17} />
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="truncate text-sm font-semibold text-slate-900">
                              {result.title}
                            </p>

                            <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500">
                              {result.type}
                            </span>
                          </div>

                          <p className="mt-0.5 truncate text-xs text-slate-500">
                            {result.subtitle}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="px-5 py-8 text-center">
                  <p className="text-sm font-semibold text-slate-900">
                    No results found
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Try another search.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Topbar;

