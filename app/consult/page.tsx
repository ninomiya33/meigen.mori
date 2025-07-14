'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function Consult() {
  const router = useRouter();
  const [worry, setWorry] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!worry.trim()) return;
    setLoading(true);
    // クエリパラメータで悩みを渡して/adviceへ遷移
    router.push(`/advice?worry=${encodeURIComponent(worry)}`);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a1931] via-[#183a3a] to-[#274046]">
      {/* 星のエフェクト */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg width="100%" height="100%" className="absolute inset-0">
          <circle cx="15%" cy="25%" r="2" fill="#fff" opacity="0.8" />
          <circle cx="35%" cy="50%" r="1.5" fill="#fff" opacity="0.7" />
          <circle cx="60%" cy="15%" r="2.5" fill="#fff" opacity="0.9" />
          <circle cx="85%" cy="70%" r="1.2" fill="#fff" opacity="0.6" />
          <circle cx="55%" cy="85%" r="1.8" fill="#fff" opacity="0.8" />
          <circle cx="95%" cy="35%" r="1.3" fill="#fff" opacity="0.7" />
        </svg>
        <svg width="100%" height="180" className="absolute bottom-0 left-0 w-full" style={{zIndex:1}}>
          <ellipse cx="40" cy="160" rx="20" ry="40" fill="#183a3a" />
          <ellipse cx="120" cy="170" rx="30" ry="50" fill="#274046" />
          <ellipse cx="200" cy="150" rx="25" ry="45" fill="#183a3a" />
          <ellipse cx="350" cy="170" rx="40" ry="60" fill="#274046" />
          <ellipse cx="600" cy="160" rx="30" ry="50" fill="#183a3a" />
          <ellipse cx="800" cy="170" rx="35" ry="55" fill="#274046" />
        </svg>
      </div>
      <main className="relative z-10 flex flex-col items-center gap-8 w-full max-w-md px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg text-center mb-2">
          悩みを相談する
        </h2>
        <form className="bg-white/80 rounded-2xl shadow-xl p-6 flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
          <label htmlFor="worry" className="text-[#183a3a] font-semibold text-lg">
            今の悩みを教えてください
          </label>
          <textarea
            id="worry"
            name="worry"
            rows={5}
            className="rounded-xl border border-[#b2f7ef] p-3 text-[#183a3a] focus:outline-none focus:ring-2 focus:ring-[#b2f7ef] resize-none text-base"
            placeholder="例：人間関係で悩んでいます..."
            required
            value={worry}
            onChange={e => setWorry(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-[#b2f7ef] text-[#183a3a] rounded-full px-6 py-3 text-lg font-semibold shadow-md hover:bg-[#7de2d1] transition-colors mt-2 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "送信中..." : "相談する"}
          </button>
        </form>
        <Link href="/album" className="bg-[#bfa14a] text-white rounded-full px-6 py-2 text-base font-semibold shadow hover:bg-[#d4c07a] transition-colors mt-2">
          森のアルバムを見る
        </Link>
        <Link href="/" className="text-[#b2f7ef] underline text-sm mt-4">トップへ戻る</Link>
      </main>
    </div>
  );
} 