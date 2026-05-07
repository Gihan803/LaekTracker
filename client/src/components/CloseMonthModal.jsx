import React from "react";

const CloseMonthModal = ({ isOpen, onClose, onConfirm, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-scale-in">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xl shrink-0">
              ⚠️
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Close Current Month?
            </h2>
          </div>
          <p className="text-slate-600 mb-6">
            Are you sure you want to close the current month? This will permanently move all your active expenses to a saved record and clear your dashboard for a fresh start.
          </p>

          <div className="flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : null}
              {loading ? "Closing..." : "Yes, Close Month"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CloseMonthModal;
