// 履歴数に応じて森の成長段階を返す
export function getForestStage(count: number) {
  if (count <= 0) {
    return {
      icon: "🌱",
      name: "苗木の森",
      message: "まだ始まったばかりの森です。思い出を増やして森を育てましょう。"
    };
  } else if (count <= 2) {
    return {
      icon: "🌿",
      name: "若木の森",
      message: "森が少し成長しました。これからが楽しみです。"
    };
  } else if (count <= 5) {
    return {
      icon: "🌳",
      name: "大樹の森",
      message: "森が立派に育っています。たくさんの思い出が根付いています。"
    };
  } else {
    return {
      icon: "🌲",
      name: "神秘の森",
      message: "森がとても豊かになりました。素敵な思い出がいっぱいです。"
    };
  }
} 