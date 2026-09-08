
import { useState } from "react";
import { Check, Save } from "lucide-react";

function Settings() {
  const [profile, setProfile] = useState({
    firstName: "Admin",
    lastName: "Manager",
    email: "admin@novalytics.com",
    phone: "+994 50 123 45 67",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    weeklyReports: true,
    marketingEmails: false,
  });

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [saved, setSaved] = useState(false);

  const handleProfileChange = (field, value) => {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }));

    setSaved(false);
  };

  const handleNotificationChange = (field) => {
    setNotifications((current) => ({
      ...current,
      [field]: !current[field],
    }));

    setSaved(false);
  };

  const handleSecurityChange = (field, value) => {
    setSecurity((current) => ({
      ...current,
      [field]: value,
    }));

    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Settings
          </h1>

          <p className="mt-1 text-slate-500">
            Manage your account and application preferences.
          </p>
        </div>

        <button
          onClick={handleSave}
          className={`flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition ${
            saved
              ? "bg-emerald-600"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {saved ? <Check size={18} /> : <Save size={18} />}

          {saved ? "Changes Saved" : "Save Changes"}
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Main Settings */}
        <div className="space-y-6 xl:col-span-2">

          {/* Profile */}
          <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
            <div className="border-b border-slate-100 pb-5">
              <h2 className="text-lg font-bold text-slate-900">
                Profile Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Update your personal information.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  First Name
                </label>

                <input
                  type="text"
                  value={profile.firstName}
                  onChange={(e) =>
                    handleProfileChange(
                      "firstName",
                      e.target.value
                    )
                  }
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Last Name
                </label>

                <input
                  type="text"
                  value={profile.lastName}
                  onChange={(e) =>
                    handleProfileChange(
                      "lastName",
                      e.target.value
                    )
                  }
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Email Address
                </label>

                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    handleProfileChange(
                      "email",
                      e.target.value
                    )
                  }
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Phone Number
                </label>

                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) =>
                    handleProfileChange(
                      "phone",
                      e.target.value
                    )
                  }
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500"
                />
              </div>
            </div>
          </section>

          {/* Notifications */}
          <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
            <div className="border-b border-slate-100 pb-5">
              <h2 className="text-lg font-bold text-slate-900">
                Notifications
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Choose which notifications you want to receive.
              </p>
            </div>

            <div className="divide-y divide-slate-100">
              <NotificationToggle
                title="Email Notifications"
                description="Receive notifications about important account activity."
                enabled={notifications.emailNotifications}
                onChange={() =>
                  handleNotificationChange(
                    "emailNotifications"
                  )
                }
              />

              <NotificationToggle
                title="Weekly Reports"
                description="Receive a weekly summary of your business analytics."
                enabled={notifications.weeklyReports}
                onChange={() =>
                  handleNotificationChange(
                    "weeklyReports"
                  )
                }
              />

              <NotificationToggle
                title="Marketing Emails"
                description="Receive product updates, tips, and promotional content."
                enabled={notifications.marketingEmails}
                onChange={() =>
                  handleNotificationChange(
                    "marketingEmails"
                  )
                }
              />
            </div>
          </section>

          {/* Security */}
          <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
            <div className="border-b border-slate-100 pb-5">
              <h2 className="text-lg font-bold text-slate-900">
                Security
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Update your password and account security.
              </p>
            </div>

            <div className="mt-6 space-y-5">
              <PasswordField
                label="Current Password"
                value={security.currentPassword}
                onChange={(value) =>
                  handleSecurityChange(
                    "currentPassword",
                    value
                  )
                }
              />

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <PasswordField
                  label="New Password"
                  value={security.newPassword}
                  onChange={(value) =>
                    handleSecurityChange(
                      "newPassword",
                      value
                    )
                  }
                />

                <PasswordField
                  label="Confirm New Password"
                  value={security.confirmPassword}
                  onChange={(value) =>
                    handleSecurityChange(
                      "confirmPassword",
                      value
                    )
                  }
                />
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">

          {/* Account */}
          <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-bold text-slate-900">
              Account
            </h2>

            <div className="mt-5 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600">
                AM
              </div>

              <div>
                <p className="font-semibold text-slate-900">
                  {profile.firstName} {profile.lastName}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {profile.email}
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">
                  Plan
                </span>

                <span className="rounded-lg bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-600">
                  Pro
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-slate-500">
                  Billing
                </span>

                <span className="text-sm font-semibold text-slate-900">
                  $49/month
                </span>
              </div>
            </div>
          </section>

          {/* Appearance */}
          <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-bold text-slate-900">
              Appearance
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Choose your preferred appearance.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                className="rounded-xl border-2 border-blue-500 bg-white p-3 text-left"
              >
                <div className="h-16 rounded-lg border border-slate-200 bg-slate-50 p-2">
                  <div className="h-2 w-8 rounded bg-slate-300" />
                  <div className="mt-2 h-2 w-12 rounded bg-slate-200" />
                  <div className="mt-2 h-6 rounded bg-white shadow-sm" />
                </div>

                <p className="mt-3 text-xs font-semibold text-slate-900">
                  Light
                </p>
              </button>

              <button
                className="rounded-xl border border-slate-200 bg-white p-3 text-left transition hover:border-slate-300"
              >
                <div className="h-16 rounded-lg bg-slate-900 p-2">
                  <div className="h-2 w-8 rounded bg-slate-700" />
                  <div className="mt-2 h-2 w-12 rounded bg-slate-700" />
                  <div className="mt-2 h-6 rounded bg-slate-800" />
                </div>

                <p className="mt-3 text-xs font-semibold text-slate-900">
                  Dark
                </p>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

/* Notification Toggle */

function NotificationToggle({
  title,
  description,
  enabled,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-5">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-slate-900">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>

      <button
        onClick={onChange}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          enabled ? "bg-blue-600" : "bg-slate-300"
        }`}
        aria-label={`Toggle ${title}`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

/* Password Field */

function PasswordField({ label, value, onChange }) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500"
      />
    </div>
  );
}

export default Settings;

