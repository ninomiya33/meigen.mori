import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a1931] via-[#183a3a] to-[#274046]">
      {/* 星のエフェクト */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* 星をランダムに配置（SVGやdivで仮配置） */}
        <svg width="100%" height="100%" className="absolute inset-0">
          <circle cx="10%" cy="20%" r="2" fill="#fff" opacity="0.8" />
          <circle cx="30%" cy="40%" r="1.5" fill="#fff" opacity="0.7" />
          <circle cx="70%" cy="10%" r="2.5" fill="#fff" opacity="0.9" />
          <circle cx="80%" cy="60%" r="1.2" fill="#fff" opacity="0.6" />
          <circle cx="50%" cy="80%" r="1.8" fill="#fff" opacity="0.8" />
          <circle cx="90%" cy="30%" r="1.3" fill="#fff" opacity="0.7" />
        </svg>
        {/* 森のシルエット（SVGで仮配置） */}
        <svg width="100%" height="180" className="absolute bottom-0 left-0 w-full" style={{zIndex:1}}>
          <ellipse cx="20" cy="160" rx="20" ry="40" fill="#183a3a" />
          <ellipse cx="80" cy="170" rx="30" ry="50" fill="#274046" />
          <ellipse cx="160" cy="150" rx="25" ry="45" fill="#183a3a" />
          <ellipse cx="300" cy="170" rx="40" ry="60" fill="#274046" />
          <ellipse cx="500" cy="160" rx="30" ry="50" fill="#183a3a" />
          <ellipse cx="700" cy="170" rx="35" ry="55" fill="#274046" />
        </svg>
      </div>
      {/* メインコンテンツ */}
      <main className="relative z-10 flex flex-col items-center gap-8">
        <h1 className="text-3xl sm:text-5xl font-bold text-white drop-shadow-lg text-center mb-2">
          名言の森へようこそ
        </h1>
        <p className="text-lg sm:text-2xl text-[#b2f7ef] text-center mb-6">
          偉人たちの言葉が、あなたの一歩を応援します
        </p>
        <Link href="/consult" className="bg-[#b2f7ef] text-[#183a3a] rounded-full px-8 py-4 text-xl font-semibold shadow-lg hover:bg-[#7de2d1] transition-colors">
          悩みを相談する
        </Link>
        <Link href="/album" className="bg-[#bfa14a] text-white rounded-full px-6 py-2 text-base font-semibold shadow hover:bg-[#d4c07a] transition-colors mt-4">
          森のアルバムを見る
        </Link>
      </main>
    </div>
  );
}
