
import { useMemo, useState } from "react";

const trafficData = {
  "7D": [
    { source: "Direct", visitors: 1240, percentage: 36 },
    { source: "Google", visitors: 1080, percentage: 31 },
    { source: "Social Media", visitors: 720, percentage: 21 },
    { source: "Referral", visitors: 410, percentage: 12 },
  ],
  "30D": [
    { source: "Direct", visitors: 3240, percentage: 38 },
    { source: "Google", visitors: 2640, percentage: 31 },
    { source: "Social Media", visitors: 1610, percentage: 19 },
    { source: "Referral", visitors: 1020, percentage: 12 },
  ],
  "90D": [
    { source: "Direct", visitors: 8420, percentage: 37 },
    { source: "Google", visitors: 7160, percentage: 32 },
    { source: "Social Media", visitors: 4180, percentage: 18 },
    { source: "Referral", visitors: 2960, percentage: 13 },
  ],
  "12M": [
    { source: "Direct", visitors: 34280, percentage: 38 },
    { source: "Google", visitors: 27940, percentage: 31 },
    { source: "Social Media", visitors: 17120, percentage: 19 },
    { source: "Referral", visitors: 10840, percentage: 12 },
  ],
};

const periodLabels = {
  "7D": "Last 7 days",
  "30D": "Last 30 days",
  "90D": "Last 90 days",
  "12M": "Last 12 months",
};

function TrafficSources() {
  const [period, setPeriod] = useState("30D");

  const data = trafficData[period];

  const totalVisitors = useMemo(() => {
    return data.reduce((total, item) => total + item.visitors, 0);
  }, [data]);

  const topSource = data.reduce((highest, current) =>
    current.visitors > highest.visitors ? current : highest
  );

  const sourceIcons = {
    Direct: "↗",
    Google: "G",
    "Social Media": "◎",
    Referral: "↔",
  };

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Traffic Sources
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {periodLabels[period]}
          </p>
        </div>

        {/* Period Selector */}
        <div className="flex rounded-xl bg-slate-100 p-1">
          {Object.keys(trafficData).map((option) => (
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

      {/* Summary */}
      <div className="mt-6 flex items-end justify-between">
        <div>
          <p className="text-sm text-slate-500">Total Visitors</p>

          <p className="mt-1 text-2xl font-bold text-slate-900">
            {totalVisitors.toLocaleString()}
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-slate-500">Top Source</p>

          <p className="mt-1 text-sm font-bold text-blue-600">
            {topSource.source}
          </p>
        </div>
      </div>

      {/* Sources */}
      <div className="mt-7 space-y-6">
        {data.map((item) => (
          <div key={item.source}>
            <div className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-600">
                  {sourceIcons[item.source]}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {item.source}
                  </p>

                  <p className="mt-0.5 text-xs text-slate-500">
                    {item.visitors.toLocaleString()} visitors
                  </p>
                </div>
              </div>

              <p className="shrink-0 text-sm font-bold text-slate-900">
                {item.percentage}%
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-blue-500 transition-all duration-500"
                style={{
                  width: `${item.percentage}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-7 border-t border-slate-100 pt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">
            Showing traffic breakdown
          </span>

          <span className="font-semibold text-slate-700">
            {data.length} sources
          </span>
        </div>
      </div>
    </div>
  );
}

export default TrafficSources;
