export default function HistoryList({ history, onDelete }) {
  if (history.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl shadow border border-gray-200">
        <p className="text-xl text-gray-500 font-medium">
          No explanations yet
        </p>
        <p className="mt-2 text-gray-400">
          Paste some code and click "Explain Code" to begin
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center md:text-left">
        Previous Explanations
      </h2>

      <div className="space-y-8">
        {history.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
              <div className="text-sm text-gray-500 font-medium">
                {item.time}
              </div>
              <button
                onClick={() => onDelete(index)}
                className="text-red-600 hover:text-red-800 font-medium text-sm flex items-center gap-1 transition"
              >
                Delete
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                  Code
                </h3>
                <pre className="bg-gray-900 text-green-300 p-5 rounded-xl text-sm overflow-x-auto leading-relaxed font-mono border border-gray-700 whitespace-pre-wrap">
                  {item.code}
                </pre>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                  AI Explanation
                </h3>
                <div className="prose prose-slate max-w-none text-gray-800">
                  {item.explanation.split("\n").map((line, i) => (
                    <p key={i} className="leading-relaxed">{line}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}