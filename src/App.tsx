import { useState } from 'react';
import { cbseData } from './data';
import { getLiveAIHint } from './aiService';

export default function App() {
  const [selectedChapter, setSelectedChapter] = useState(cbseData.chapters[0]);
  const [hintStep, setHintStep] = useState(0);
  const [aiHintText, setAiHintText] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);

  const handleGetAIHint = async (questionText: string, level: number) => {
    setLoadingAI(true);
    setHintStep(level);
    const aiResponse = await getLiveAIHint(questionText, level);
    setAiHintText(aiResponse);
    setLoadingAI(false);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-100 flex flex-col shadow-lg">
      {/* Header */}
      <header className="bg-indigo-600 text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-lg">⚡ Board10X AI Agent</h1>
          <span className="bg-indigo-800 text-xs px-2 py-1 rounded text-indigo-200">10th CBSE</span>
        </div>
        <p className="text-xs text-indigo-200 mt-1">10-Year PYQ Analysis + Live Gemini AI Hints</p>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        {/* Chapter Selection */}
        <div className="mb-4">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Select Chapter</label>
          <select 
            className="w-full mt-1 p-2 bg-white border border-slate-300 rounded-lg text-sm font-semibold text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => {
              const chap = cbseData.chapters.find((ch: any) => ch.id === parseInt(e.target.value));
              if (chap) setSelectedChapter(chap);
              setHintStep(0);
              setAiHintText('');
            }}
          >
            {cbseData.chapters.map((ch: any) => (
              <option key={ch.id} value={ch.id}>{ch.name}</option>
            ))}
          </select>
        </div>

        {/* 10-Year Trend Analysis Box */}
        <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg mb-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-amber-800">🔥 10-Year CBSE Trend:</span>
            <span className="text-xs font-extrabold text-red-600 bg-red-100 px-2 py-0.5 rounded">{selectedChapter.probability}</span>
          </div>
          <p className="text-xs text-amber-700 mt-1">{selectedChapter.frequency}</p>
        </div>

        {/* Question List */}
        <h2 className="text-sm font-bold text-slate-700 mb-2">High-Probability Questions:</h2>
        {selectedChapter.questions.map((q: any) => (
          <div key={q.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-4">
            <div className="flex justify-between items-start mb-2">
              <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-200">{q.tag}</span>
              <span className="text-xs font-semibold text-slate-400">{q.marks} Marks</span>
            </div>
            <p className="text-sm font-medium text-slate-800 mb-3">{q.question}</p>

            {/* Interactive AI Hint Agent */}
            <div className="border-t pt-3 mt-2 bg-slate-50 -mx-4 -mb-4 p-4 rounded-b-xl">
              <p className="text-xs font-bold text-indigo-600 mb-2 flex items-center gap-1">
                🤖 Live Gemini AI Agent:
              </p>

              {/* Loading State */}
              {loadingAI && (
                <div className="p-3 bg-indigo-50 text-indigo-700 text-xs rounded-lg mb-2 animate-pulse font-medium">
                  🤖 AI Agent is generating smart hint for CBSE Board...
                </div>
              )}

              {/* Live AI Hint Display */}
              {!loadingAI && hintStep > 0 && hintStep < 3 && (
                <div className="p-3 bg-blue-50 border border-blue-200 text-blue-900 text-xs rounded-lg mb-2 shadow-sm font-medium">
                  {aiHintText || q[`hint${hintStep}`]}
                </div>
              )}

              {/* Full Answer Display */}
              {hintStep === 3 && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs rounded-lg mb-2 font-mono whitespace-pre-line">
                  <strong>Answer:</strong><br />{q.answer}
                </div>
              )}

              {/* Trigger Buttons */}
              <div className="flex gap-2 mt-3">
                {hintStep < 2 && (
                  <button 
                    onClick={() => handleGetAIHint(q.question, hintStep + 1)}
                    className="flex-1 bg-indigo-600 text-white text-xs font-semibold py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    {hintStep === 0 ? "Ask AI for Hint 1 💡" : "Ask AI for Hint 2 🔍"}
                  </button>
                )}

                {hintStep >= 2 && hintStep < 3 && (
                  <button 
                    onClick={() => setHintStep(3)}
                    className="flex-1 bg-emerald-600 text-white text-xs font-semibold py-2 rounded-lg hover:bg-emerald-700 transition"
                  >
                    Show Full Solution ✅
                  </button>
                )}

                {hintStep > 0 && (
                  <button 
                    onClick={() => { setHintStep(0); setAiHintText(''); }}
                    className="bg-slate-200 text-slate-600 text-xs px-3 py-2 rounded-lg"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Footer */}
      <footer className="p-3 text-center text-xs text-slate-400 bg-white border-t">
        Powered by Google Gemini AI • CBSE 10th Prep
      </footer>
    </div>
  );
}