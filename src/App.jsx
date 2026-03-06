import { useState, useEffect } from "react";
import CodeInput from "./components/CodeInput";
import HistoryList from "./components/HistoryList";
import { explainCodeAPI } from "./services/mistralApi";

export default function App() {
  const [history, setHistory] = useState([]);
  const [currentExplanation, setCurrentExplanation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  
  const [showHistory, setShowHistory] = useState(false);

  // Load history
  useEffect(() => {
    const saved = localStorage.getItem("codeHistory");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  // Save history
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem("codeHistory", JSON.stringify(history));
    }
  }, [history]);

  const handleExplain = async () => {
    if (!code.trim()) {
      alert("Please enter some code first");
      return;
    }
    setLoading(true);
    setCurrentExplanation(null);

    try {
      const explanation = await explainCodeAPI(code);
      const newItem = {
        code: code,
        explanation,
        time: new Date().toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
      };

      setHistory((prev) => [newItem, ...prev]);
      setCurrentExplanation(explanation);
    } catch (err) {
      console.error(err);
      alert("Failed to get explanation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setCode("");
    setCurrentExplanation(null);           // ← clears right panel too
  };

  const handleDelete = (index) => {
    setHistory((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleHistory = () => {
    setShowHistory((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-10 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            AI Code Explainer
          </h1>
          <p className="mt-3 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Paste any code → Get clear, accurate, human-like explanations instantly
          </p>
        </header>

        {/* Main content - two columns on large screens */}
        <div className="grid lg:grid-cols-2 gap-6 xl:gap-10">
          {/* Left column - Input */}
          <div className="order-1">
            <CodeInput
              code={code}
              setCode={setCode}
              onExplain={handleExplain}
              onClear={handleClear}
              loading={loading}
            />
          </div>

          {/* Right column - Result */}
          <div className="order-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden flex flex-col min-h-[420px] lg:min-h-[440px]">
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-4 text-white">
                <h2 className="text-xl font-semibold">
                  {loading
                    ? "Generating explanation..."
                    : currentExplanation
                    ? "Current Explanation"
                    : "Explanation Area"}
                </h2>
              </div>

              <div className="p-6 flex-1 overflow-y-auto bg-gray-50/40">
                {loading ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
                  </div>
                ) : currentExplanation ? (
                  <div className="space-y-7">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">
                        Submitted Code
                      </h3>
                      <pre className="bg-gray-900 text-green-300/95 p-5 rounded-xl text-sm font-mono border border-gray-700 shadow-inner overflow-x-auto whitespace-pre-wrap leading-relaxed">
                        {code}
                      </pre>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">
                        Detailed Explanation
                      </h3>
                      <div className="prose prose-slate max-w-none text-gray-800">
                        {currentExplanation.split("\n").map((line, i) => (
                          <p key={i} className="leading-relaxed mb-2">{line}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500">
                    <svg className="w-20 h-20 mb-6 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-lg font-medium">Paste code and click "Explain Code"</p>
                    <p className="mt-2 text-sm">Your explanation will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* History Controls - always visible, more prominent */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 sm:gap-6">
          <div className="text-gray-700 font-medium">
            {history.length === 0 ? (
              <span className="text-gray-400 italic">No saved explanations yet</span>
            ) : (
              <span className="text-gray-800">
                {history.length} saved explanation{history.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          <button
            onClick={toggleHistory}
            className={`
              group flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-sm
              border-2
              ${showHistory 
                ? "bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700" 
                : "bg-white text-indigo-700 border-indigo-300 hover:bg-indigo-50 hover:border-indigo-400"}
            `}
          >
            {showHistory ? "Hide History" : "Show History"}
            {history.length > 0 && (
              <span className="ml-1.5 px-2.5 py-0.5 text-xs font-bold rounded-full bg-white/20 text-white">
                {history.length}
              </span>
            )}
            <svg 
              className={`w-5 h-5 transition-transform duration-200 ${showHistory ? "rotate-180" : ""}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* History section - appears below when toggled */}
        {showHistory && (
          <div className="mt-8 animate-fade-in">
            {history.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center text-gray-500 border border-gray-200 shadow-sm">
                No history to show yet. Start explaining some code!
              </div>
            ) : (
              <HistoryList history={history} onDelete={handleDelete} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}