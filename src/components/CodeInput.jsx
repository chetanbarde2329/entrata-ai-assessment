export default function CodeInput({
  code,
  setCode,
  onExplain,
  onClear,
  loading,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4 text-white flex items-center justify-between">
        <h2 className="text-xl font-semibold">Enter Your Code</h2>
        <span className="text-xs bg-gray-700 px-3 py-1 rounded-full">
          Python • JavaScript
        </span>
      </div>

      <div className="p-6">
        <textarea
          className="w-full h-10 md:h-[250px] p-5 border border-gray-300 rounded-xl font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50"
          placeholder="// Paste or write your code here...\n// Click 'Explain Code' to get instant breakdown"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
        />

        <div className="mt-6 flex flex-wrap justify-end gap-4">
          <button
            onClick={onClear}
            disabled={loading || (!code.trim() && !loading)}
            className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl border border-gray-300 hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Clear
          </button>

          <button
            onClick={onExplain}
            disabled={loading || !code.trim()}
            className={`
              min-w-[160px] px-8 py-3 font-medium rounded-xl shadow-md transition-all duration-200
              flex items-center justify-center gap-2
              ${
                loading
                  ? "bg-indigo-400 cursor-not-allowed text-white"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-4 focus:ring-indigo-300"
              }
            `}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                  />
                </svg>
                Explaining...
              </>
            ) : (
              "Explain Code"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
