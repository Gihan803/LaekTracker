const Insights = () => {
  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900">Insights</h1>
        <p className="text-sm text-slate-500 mt-1">
          Smart analysis and leak detection
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center shadow-sm">
        <div className="text-6xl mb-6">💡</div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">
          Smart Features Coming Soon
        </h2>
        <p className="text-slate-500 max-w-md mx-auto">
          We're analyzing your spending patterns. Soon you'll be able to see detailed charts, category breakdowns, and smart alerts about potential expense leaks.
        </p>
      </div>
    </div>
  );
};

export default Insights;
