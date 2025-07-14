"use client";
import { useEffect, useState } from "react";
import { useConsultHistory } from "../../hooks/useConsultHistory";
import { HistoryItem } from "../../types/history";
import { getForestStage } from "../../hooks/forestStage";

// 履歴アイコンのランダム配置用
function getRandomPosition(idx: number, total: number) {
  // 森の中のエリア（%）を分割し、各履歴にランダムな位置を割り当て
  const angle = (idx / total) * Math.PI * 2 + Math.random() * 0.3;
  const radius = 35 + Math.random() * 25; // 35〜60%の円周上
  const x = 50 + Math.cos(angle) * radius;
  const y = 50 + Math.sin(angle) * radius * 0.7; // 楕円で森っぽく
  return { left: `${x}%`, top: `${y}%` };
}

export default function AlbumPage() {
  const { fetchHistory, clearHistory } = useConsultHistory();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selected, setSelected] = useState<HistoryItem | null>(null);

  useEffect(() => {
    setHistory(fetchHistory());
  }, [fetchHistory]);

  const forestStage = getForestStage(history.length);

  // 森のビジュアル（背景＋履歴アイコン）
  const renderForestMap = () => (
    <div className="relative w-full max-w-md h-[420px] mx-auto mb-8 bg-gradient-to-b from-[#1a2233] to-[#2d3a4d] rounded-3xl shadow-lg overflow-hidden">
      {/* 森の背景（SVG） */}
      <svg width="100%" height="100%" viewBox="0 0 400 420" className="absolute inset-0 w-full h-full">
        <ellipse cx="200" cy="390" rx="180" ry="40" fill="#183a3a" />
        <ellipse cx="100" cy="410" rx="60" ry="20" fill="#274046" />
        <ellipse cx="300" cy="410" rx="70" ry="25" fill="#274046" />
        {/* 星 */}
        <circle cx="60" cy="60" r="3" fill="#fff" opacity="0.7" />
        <circle cx="340" cy="80" r="2.5" fill="#fff" opacity="0.6" />
        <circle cx="200" cy="40" r="2.8" fill="#fff" opacity="0.8" />
        <circle cx="120" cy="120" r="2" fill="#fff" opacity="0.5" />
        <circle cx="280" cy="130" r="2.2" fill="#fff" opacity="0.7" />
      </svg>
      {/* 履歴アイコンを森の中に配置 */}
      {history.map((item, idx) => {
        const stage = getForestStage(history.length - idx);
        const pos = getRandomPosition(idx, history.length);
        return (
          <button
            key={item.id}
            style={{ position: "absolute", ...pos, zIndex: 2, transform: "translate(-50%, -50%)" }}
            className="focus:outline-none group"
            onClick={() => setSelected(item)}
            aria-label="思い出を見る"
          >
            <span className="text-3xl drop-shadow-lg group-hover:scale-125 transition-transform duration-200">
              {stage.icon}
            </span>
          </button>
        );
      })}
    </div>
  );

  // モーダルで詳細表示
  const renderModal = () => selected && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full relative animate-fadein">
        <button className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-gray-600" onClick={() => setSelected(null)} aria-label="閉じる">×</button>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">{getForestStage(history.indexOf(selected) >= 0 ? history.length - history.indexOf(selected) : 1).icon}</span>
          <span className="text-xs text-gray-500">{new Date(selected.date).toLocaleString()}</span>
        </div>
        <div className="font-bold text-lg text-[#183a3a] mb-1">{selected.worry}</div>
        <div className="font-bold mb-2" style={{ color: '#bfa14a' }}>{selected.quote}</div>
        <div className="text-gray-800 whitespace-pre-line leading-relaxed">{selected.comment}</div>
      </div>
      <style jsx global>{`
        @keyframes fadein { 0% { opacity: 0; transform: scale(0.95);} 100% { opacity: 1; transform: scale(1);} }
        .animate-fadein { animation: fadein 0.3s; }
      `}</style>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a2233] to-[#2d3a4d] flex flex-col items-center py-8">
      <div className="w-full max-w-md flex flex-col items-center mb-6">
        <div className="text-2xl font-bold text-gold-400 mb-2">森のアルバム</div>
        <div className="text-lg font-bold text-gold-400 mt-2">{forestStage.name}</div>
        <div className="text-sm text-gray-300 mb-2">{forestStage.message}</div>
        <button
          className="mb-4 px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          onClick={() => { clearHistory(); setHistory([]); }}
        >
          履歴をすべて削除
        </button>
      </div>
      {/* 森の中に思い出が点在するビジュアル */}
      {renderForestMap()}
      {/* モーダルで詳細表示 */}
      {renderModal()}
      <div className="mt-10">
        <a href="/" className="bg-[#b2f7ef] text-[#183a3a] rounded-full px-8 py-3 text-lg font-semibold shadow hover:bg-[#7de2d1] transition-colors">
          トップページに戻る
        </a>
      </div>
    </div>
  );
} 