function StatCard({ title, value, change }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      
      <p className="text-sm font-medium text-slate-500">
        {title}
      </p>

      <h2 className="mt-2 text-3xl font-bold text-slate-900">
        {value}
      </h2>

      <p className="mt-2 text-sm font-medium text-green-600">
        {change} from last month
      </p>

    </div>
  );
}

export default StatCard;