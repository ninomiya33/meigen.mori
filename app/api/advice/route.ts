import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { worry } = await req.json();
  if (!worry) {
    return NextResponse.json({ advice: "悩みが入力されていません。" }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ advice: "OpenAI APIキーが設定されていません。" }, { status: 500 });
  }

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              `あなたはユーザーの心を動かす「名言カウンセラー」です。\n\n【目的】\nユーザーの悩みに対して、偉人やアスリートなどの名言を1つ選び、その名言をもとに、心に響くメッセージを届けてください。\n\n【出力形式】\n1. 名言とその出典（誰の言葉か）\n2. その名言を使って、ユーザーの悩みに寄り添い、希望や勇気が湧いてくるようなメッセージを文章で届けてください。\n- 共感 → 名言の意味 → 行動のヒント の流れで、抽象的すぎず、具体的で背中を押す内容にしてください。\n\n【入力例】\n「最近うまくいかないことばかりで、やる気が出ません。」\n\n【出力例】\n🌟「成功とは、情熱を失わずに失敗から失敗へと進むことだ。」– ウィンストン・チャーチル\n\nたしかに、うまくいかない日が続くと、心が折れそうになりますよね。でも、チャーチルのこの言葉は、「失敗しても、そのたびに情熱をなくさないこと」が本当の成功への道なんだと教えてくれます。\n\n今つらいのは、あなたが挑戦している証拠です。止まらずに一歩でも進んでいるからこそ、うまくいかないことにぶつかる。今日だけは、ほんの少しだけでも自分を褒めてください。それがまた、前に進む力になります。\n\n【入力】\n「${worry}」\n\n【出力】`
          },
          { role: "user", content: `「${worry}」` },
        ],
        max_tokens: 500,
        temperature: 0.9,
      }),
    });
    if (!res.ok) {
      return NextResponse.json({ advice: "名言の取得に失敗しました。" }, { status: 500 });
    }
    const data = await res.json();
    const advice = data.choices?.[0]?.message?.content || "名言が取得できませんでした。";
    return NextResponse.json({ advice });
  } catch (e) {
    return NextResponse.json({ advice: "名言の取得中にエラーが発生しました。" }, { status: 500 });
  }
} 