
const SellerDashboard = () => {
  const stats = [
    { label: "Total Products", value: "42", note: "+5 this week" },
    { label: "Total Sales", value: "$1,284", note: "+12.4% this month" },
    { label: "Pending Orders", value: "8", note: "2 need attention" },
    { label: "Followers", value: "1.2k", note: "+87 this month" },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-linear-to-br from-sky-50 via-white to-cyan-100 p-5 md:p-7">
        <h2 className="text-xl font-bold text-slate-800 md:text-2xl">
          Seller Command Center
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Track your product performance, manage transactions, and monitor
          growth from one place.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <article
            key={item.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase">
              {item.label}
            </p>
            <p className="mt-3 text-2xl font-bold text-slate-800">
              {item.value}
            </p>
            <p className="mt-1 text-xs text-emerald-600">{item.note}</p>
          </article>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-800">
              Recent Transactions
            </h3>
            <span className="text-xs text-slate-500">Last 7 days</span>
          </div>
          <div className="mt-4 space-y-3">
            {["Premium Pack", "Background Set", "Portrait Bundle"].map(
              (name, idx) => (
                <div
                  key={name}
                  className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-700">{name}</p>
                    <p className="text-xs text-slate-500">
                      Order #{1000 + idx}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-slate-800">
                    ${(idx + 1) * 24}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>

        <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-base font-semibold text-slate-800">
            Quick Actions
          </h3>
          <div className="mt-4 grid gap-2">
            <button className="rounded-xl border border-slate-200 px-3 py-2 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50">
              Add new product
            </button>
            <button className="rounded-xl border border-slate-200 px-3 py-2 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50">
              Review pending orders
            </button>
            <button className="rounded-xl border border-slate-200 px-3 py-2 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50">
              Update store profile
            </button>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default SellerDashboard;
