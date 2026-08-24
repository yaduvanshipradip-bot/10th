import { useState } from 'react';
import { cbseData, SubjectItem, ChapterItem, QuestionItem } from './data';
import { getLiveAIHint } from './aiService';

const categories = [
  "🎯 All Types",
  "🔘 MCQs (1 Mark)",
  "🧩 Assertion & Reason",
  "📖 Case Study (4 Marks)",
  "📝 Short Qs (2-3 Marks)",
  "🏆 Long Qs (5 Marks)"
];

export default function App() {
  const [screen, setScreen] = useState<'setup' | 'qlist' | 'qdetail'>('setup');

  const [selectedSubject, setSelectedSubject] = useState<SubjectItem>(cbseData[0]);
  const [selectedChapter, setSelectedChapter] = useState<ChapterItem>(cbseData[0].chapters[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionItem | null>(null);

  const [hintStep, setHintStep] = useState<number>(0);
  const [aiHintText, setAiHintText] = useState<string>('');
  const [loadingAI, setLoadingAI] = useState<boolean>(false);

  // FLUSH STATE ON SUBJECT CHANGE (Zero Mixing!)
  const handleSubjectChange = (sub: SubjectItem) => {
    setSelectedSubject(sub);
    setSelectedChapter(sub.chapters[0]);
    setSelectedQuestion(null);
    setHintStep(0);
    setAiHintText('');
  };

  // FLUSH STATE ON CHAPTER CHANGE
  const handleChapterChange = (chap: ChapterItem) => {
    setSelectedChapter(chap);
    setSelectedQuestion(null);
    setHintStep(0);
    setAiHintText('');
  };

  const handleStartPractice = () => {
    setSelectedQuestion(null);
    setHintStep(0);
    setAiHintText('');
    setScreen('qlist');
  };

  const handleSelectQuestion = (q: QuestionItem) => {
    setSelectedQuestion(q);
    setHintStep(0);
    setAiHintText('');
    setScreen('qdetail');
  };

  const handleGetAIHint = async (level: number) => {
    if (!selectedQuestion) return;
    setLoadingAI(true);
    setHintStep(level);
    const aiResponse = await getLiveAIHint(selectedQuestion.question, level);
    setAiHintText(aiResponse);
    setLoadingAI(false);
  };

  const isMCQCategory = selectedCategory.includes("MCQ") || selectedCategory.includes("Assertion");

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans shadow-2xl">

      {/* HEADER */}
      <header className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-white p-4 sticky top-0 z-20 shadow-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {screen !== 'setup' && (
              <button 
                onClick={() => setScreen(screen === 'qdetail' ? 'qlist' : 'setup')}
                className="bg-white/20 hover:bg-white/30 p-1.5 rounded-lg text-xs font-bold transition"
              >
                ⬅ Back
              </button>
            )}
            <h1 className="font-extrabold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-white">
              ⚡ Board10X
            </h1>
          </div>
          <span className="bg-amber-400 text-slate-950 font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase shadow">
            CBSE 2025
          </span>
        </div>
      </header>

      {/* PAGE 1: SETUP SCREEN */}
      {screen === 'setup' && (
        <main className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <div className="text-center my-3">
              <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs px-3 py-1 rounded-full font-semibold">
                🎯 10-Year CBSE Board PYQ Agent
              </span>
              <h2 className="text-xl font-bold mt-2 text-white">Target Your Board Marks</h2>
              <p className="text-xs text-slate-400 mt-1">Authentic Chapter Questions & AI Hints</p>
            </div>

            {/* Step 1: Subject */}
            <div className="mb-4 mt-6">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">1. Select Subject</label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {cbseData.map((sub) => (
                  <button
                    key={sub.subjectId}
                    onClick={() => handleSubjectChange(sub)}
                    className={`p-3 rounded-xl border text-left font-bold text-xs transition flex items-center justify-between ${
                      selectedSubject.subjectId === sub.subjectId
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 border-indigo-400 text-white shadow-lg scale-[1.02]'
                        : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {sub.subjectName}
                    {selectedSubject.subjectId === sub.subjectId && <span>✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Chapter */}
            <div className="mb-4">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">2. Select Chapter</label>
              <select 
                className="w-full mt-2 p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={selectedChapter.id}
                onChange={(e) => {
                  const chap = selectedSubject.chapters.find((ch) => ch.id === parseInt(e.target.value));
                  if (chap) handleChapterChange(chap);
                }}
              >
                {selectedSubject.chapters.map((ch) => (
                  <option key={ch.id} value={ch.id}>{ch.name}</option>
                ))}
              </select>
            </div>

            {/* Step 3: Category */}
            <div className="mb-6">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">3. Select Question Type</label>
              <div className="grid grid-cols-1 gap-2 mt-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`p-2.5 rounded-xl border text-left font-semibold text-xs transition ${
                      selectedCategory === cat
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                        : 'bg-slate-800/50 border-slate-700/60 text-slate-400'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleStartPractice}
            className="w-full py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-slate-950 font-extrabold text-sm rounded-xl shadow-xl transition transform active:scale-95 text-center flex items-center justify-center gap-2"
          >
            🚀 Get Chapter Questions ➔
          </button>
        </main>
      )}

      {/* PAGE 2: QUESTION LIST SCREEN */}
      {screen === 'qlist' && (
        <main className="flex-1 p-4">
          <div className="bg-slate-800/90 border border-slate-700/80 p-3 rounded-xl mb-4 text-xs">
            <div className="text-slate-400 font-medium flex items-center gap-1">
              <span>{selectedSubject.subjectName}</span> • <span>{selectedCategory}</span>
            </div>
            <div className="text-amber-400 font-bold text-sm mt-0.5">{selectedChapter.name}</div>
          </div>

          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            High-Probability Board Questions:
          </h3>

          {selectedChapter.questions.map((q, index) => (
            <div
              key={q.id}
              onClick={() => handleSelectQuestion(q)}
              className="bg-slate-800 hover:bg-slate-750 border border-slate-700/80 hover:border-purple-500/50 p-4 rounded-xl mb-3 cursor-pointer transition shadow-md active:scale-[0.99] flex flex-col justify-between"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-extrabold px-2 py-0.5 rounded">
                  Q{index + 1} • {q.tag}
                </span>
                <span className="text-amber-400 font-bold text-xs">{q.marks} Marks</span>
              </div>

              <p className="text-xs font-semibold text-slate-200 leading-relaxed mb-2">
                {q.question}
              </p>

              {/* Show MCQ Options ONLY IF Question has options */}
              {q.options && Array.isArray(q.options) && (
                <div className="grid grid-cols-2 gap-1.5 my-2">
                  {q.options.map((opt, i) => (
                    <div key={i} className="bg-slate-900/60 border border-slate-700/50 text-[10px] text-slate-300 p-1.5 rounded truncate">
                      {opt}
                    </div>
                  ))}
                </div>
              )}

              <div className="text-right mt-2 text-[11px] font-bold text-indigo-400 flex items-center justify-end gap-1">
                Solve with AI Hints ➔
              </div>
            </div>
          ))}
        </main>
      )}

      {/* PAGE 3: QUESTION DETAIL & AI HINT SCREEN */}
      {screen === 'qdetail' && selectedQuestion && (
        <main className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                {selectedQuestion.tag}
              </span>
              <span className="text-slate-400 text-xs font-semibold">{selectedQuestion.marks} Marks</span>
            </div>

            {/* Question Card */}
            <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl mb-4 shadow-lg">
              <p className="text-sm font-semibold text-slate-100 leading-relaxed whitespace-pre-line mb-3">
                {selectedQuestion.question}
              </p>

              {/* MCQ Options */}
              {selectedQuestion.options && Array.isArray(selectedQuestion.options) && (
                <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-slate-700/60">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Options:</span>
                  {selectedQuestion.options.map((opt, i) => (
                    <div key={i} className="bg-slate-900/90 border border-slate-700 text-xs text-slate-200 p-2.5 rounded-lg hover:border-indigo-500 transition">
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* AI Agent Area */}
            <div className="bg-slate-800/80 border border-indigo-500/30 p-4 rounded-xl mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-base">🤖</span>
                <span className="text-xs font-extrabold text-indigo-300">Live Gemini AI Tutor:</span>
              </div>

              {loadingAI && (
                <div className="p-3 bg-indigo-950/60 border border-indigo-800/50 text-indigo-300 text-xs rounded-lg mb-3 animate-pulse">
                  🤖 AI Agent is thinking... Generating hint according to CBSE marking scheme...
                </div>
              )}

              {!loadingAI && hintStep >= 1 && hintStep < 3 && (
                <div className="p-3 bg-indigo-950/80 border border-indigo-700/60 text-indigo-200 text-xs rounded-lg mb-3 leading-relaxed shadow-inner">
                  <strong className="text-amber-400 block mb-1">💡 Hint {hintStep}:</strong>
                  {aiHintText || (selectedQuestion as any)[`hint${hintStep}`]}
                </div>
              )}

              {hintStep === 3 && (
                <div className="p-3 bg-emerald-950/80 border border-emerald-700/60 text-emerald-200 text-xs rounded-lg mb-3 leading-relaxed font-mono whitespace-pre-line shadow-inner">
                  <strong className="text-emerald-400 block mb-1">✅ Complete CBSE Board Solution:</strong>
                  {selectedQuestion.answer}
                </div>
              )}

              <div className="flex flex-col gap-2 mt-4">
                {hintStep === 0 && (
                  <button 
                    onClick={() => handleGetAIHint(1)}
                    className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs rounded-lg shadow-md hover:from-indigo-500 hover:to-purple-500 transition"
                  >
                    💡 Ask AI for Hint 1
                  </button>
                )}

                {hintStep === 1 && (
                  <button 
                    onClick={() => handleGetAIHint(2)}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs rounded-lg shadow-md hover:from-purple-500 hover:to-pink-500 transition"
                  >
                    🔍 Still Confused? Ask AI for Hint 2
                  </button>
                )}

                {hintStep === 2 && (
                  <button 
                    onClick={() => setHintStep(3)}
                    className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs rounded-lg shadow-md hover:from-emerald-500 hover:to-teal-500 transition"
                  >
                    ✅ Reveal Complete Solution
                  </button>
                )}

                {hintStep > 0 && (
                  <button 
                    onClick={() => { setHintStep(0); setAiHintText(''); }}
                    className="w-full py-2 bg-slate-700/60 text-slate-400 text-xs font-semibold rounded-lg hover:bg-slate-700"
                  >
                    🔄 Try Again (Reset Hints)
                  </button>
                )}
              </div>
            </div>
          </div>

          <button 
            onClick={() => setScreen('qlist')}
            className="w-full py-3 bg-slate-800 border border-slate-700 text-slate-300 font-bold text-xs rounded-xl text-center"
          >
            📋 Back to Question List
          </button>
        </main>
      )}

      {/* FOOTER */}
      <footer className="p-3 text-center text-[10px] text-slate-500 bg-slate-950 border-t border-slate-800">
        Board10X AI Agent • Powered by Google Gemini AI
      </footer>
    </div>
  );
}