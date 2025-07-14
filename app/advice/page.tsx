'use client';
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useConsultHistory } from "../../hooks/useConsultHistory";

function splitAdvice(advice: string) {
  // 🌟や✨など名言前の絵文字を除去
  const cleaned = advice.replace(/^\s*[🌟✨⭐️]+\s*/gm, "");
  const match = cleaned.match(/^(「.*?」[\s\S]*?–.*?)(?:\n+|\r+)([\s\S]*)$/);
  if (match) {
    return { quote: match[1], explanation: match[2] };
  }
  return { quote: cleaned, explanation: "" };
}

export default function Advice() {
  const searchParams = useSearchParams();
  const worry = searchParams.get("worry") || "";
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);
  const { addHistory } = useConsultHistory();

  useEffect(() => {
    if (!worry) return;
    const fetchAdvice = async () => {
      setLoading(true);
      setError("");
      setAdvice("");
      setShowExplanation(false);
      try {
        const res = await fetch("/api/advice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ worry }),
        });
        if (!res.ok) throw new Error("APIエラー");
        const data = await res.json();
        setAdvice(data.advice);
        // ここで履歴保存
        const { quote, explanation } = splitAdvice(data.advice);
        addHistory({
          id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
          worry,
          quote,
          comment: explanation,
          date: new Date().toISOString(),
        });
        setTimeout(() => setShowExplanation(true), 2000);
      } catch (e) {
        setError("アドバイスの取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };
    fetchAdvice();
  }, [worry, addHistory]);

  const { quote, explanation } = splitAdvice(advice);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a1931] via-[#183a3a] to-[#274046]">
      {/* 星と森のエフェクト（控えめに） */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg width="100%" height="100%" className="absolute inset-0">
          <circle cx="20%" cy="30%" r="1.5" fill="#fff" opacity="0.5" />
          <circle cx="40%" cy="60%" r="1" fill="#fff" opacity="0.4" />
          <circle cx="75%" cy="20%" r="1.8" fill="#fff" opacity="0.5" />
          <circle cx="85%" cy="65%" r="1" fill="#fff" opacity="0.3" />
          <circle cx="60%" cy="90%" r="1.2" fill="#fff" opacity="0.4" />
        </svg>
        <svg width="100%" height="180" className="absolute bottom-0 left-0 w-full" style={{zIndex:1}}>
          <ellipse cx="60" cy="160" rx="20" ry="40" fill="#183a3a" />
          <ellipse cx="140" cy="170" rx="30" ry="50" fill="#274046" />
          <ellipse cx="220" cy="150" rx="25" ry="45" fill="#183a3a" />
          <ellipse cx="370" cy="170" rx="40" ry="60" fill="#274046" />
          <ellipse cx="650" cy="160" rx="30" ry="50" fill="#183a3a" />
          <ellipse cx="850" cy="170" rx="35" ry="55" fill="#274046" />
        </svg>
      </div>
      <main className="relative z-10 flex flex-col items-center gap-8 w-full max-w-md px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg text-center mb-2">
          アドバイス
        </h2>
        <div className="bg-white/80 rounded-3xl shadow-lg p-7 flex flex-col gap-6 w-full border border-[#183a3a]/10">
          <div className="text-[#2d4739] text-base mb-2">
            <span className="font-semibold">あなたの悩み：</span>
            <span>{worry}</span>
          </div>
          {loading && <div className="text-[#2d4739]">アドバイスを生成中...</div>}
          {error && <div className="text-red-500">{error}</div>}
          {!loading && !error && quote && (
            <div className="text-[#bfa14a] text-2xl font-bold whitespace-pre-line text-center transition-all duration-700 tracking-wide">
              {quote}
            </div>
          )}
          {!loading && !error && explanation && (
            <div
              className={`text-[#2d4739] whitespace-pre-line mt-2 transition-opacity duration-1000 leading-relaxed text-lg ${showExplanation ? 'opacity-100' : 'opacity-0'}`}
              style={{background: 'rgba(255,255,255,0.5)', borderRadius: '1.5rem', padding: '1.2rem 1rem'}}
            >
              {explanation}
            </div>
          )}
        </div>
        <Link href="/consult" className="text-[#b2f7ef] underline text-base mt-4">もう一度相談する</Link>
        <Link href="/" className="text-[#b2f7ef] underline text-base mt-1">トップへ戻る</Link>
      </main>
    </div>
  );
} 