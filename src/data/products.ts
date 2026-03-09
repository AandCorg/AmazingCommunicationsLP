export type ProductTheme = {
  primary: string;
  secondary: string;
  background: string;
  cardBackground: string;
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  age: string;
  players: string;
  playTime: string;
  theme: ProductTheme;
  images: {
    keyVisual: string;
    sideVisual: string;
  };
  components: string[];
  flow: string[];
  description: string[];
  story: string[];
};

export const products: Product[] = [
  {
    slug: "hattarishokai",
    name: "ハッタリ商会",
    tagline: "ダイスを振り、資源を集め、嘘を見抜け。",
    summary: "信用なき見習い商人から始まる、ブラフと資源集めの心理戦ゲーム。",
    age: "12才以上",
    players: "3-5人",
    playTime: "約20-25分",
    theme: {
      primary: "#1d6b52",
      secondary: "#c6a15b",
      background: "#f3efe1",
      cardBackground: "#fffaf0",
    },
    images: {
      keyVisual: "/products/hattarishokai/box-front.png",
      sideVisual: "/products/hattarishokai/box-back.png",
    },
    components: [
      "サイコロ × 1個",
      "ダイスカップ",
      "資源カード × 49枚",
      "得点チップ(1点、5点、10点)",
      "見習い札カード×5枚",
      "配役カード×5枚",
    ],
    flow: [
      "① サイコロを振る\n手番プレイヤーはサイコロを振り、\n出目に応じた資源を宣言します。\nただし、宣言は嘘でもOKです。",
      "② ダウト\n他のプレイヤーは\n「それは嘘だ！」と思ったらダウトできます。\n・嘘だった → ダウト成功\n・本当だった → ダウト失敗\n※嘘をついてダウトをされなかった場合はサイコロの出た目の得点を得る",
      "③ 信用を獲得\nダウトに成功すると、\n見習い札カードを破棄できます。\nこれであなたは\n一人前の商人になります。",
      "④ 資源を集める\nダウトされなかった場合、\n宣言した資源カードを獲得します。",
      "⑤ 取引を成立させる\n資源を組み合わせて役を作ると得点を獲得。",
      "⑥ 勝利条件\n先に20点に到達したプレイヤーが勝利。",
    ],
    description: [
      "信用なき見習い商人から始まる、",
      "ブラフと資源集めの心理戦ゲーム。",
    ],
    story: [
      "プレイヤーは、商人の見習いとなります。",
      "見習いの間は、市場から十分な信用を得ておらず、大きな取引（＝役を作って得点化）を行うことはできません。その証として、各プレイヤーは見習い札カードを持った状態でゲームを開始します。",
      "サイコロによって資源を獲得し、ときには嘘や虚偽申告を交えながら取引を重ね、他の商人の嘘を見抜く（ダウトに成功する）ことで信用を獲得してください。",
      "嘘を見抜いた商人は見習い札カードを破棄し、一人前の商人として正式な取引を行えるようになります。",
      "信用を得た後は、集めた資源を組み合わせて取引ルート（＝役）を成立させ、富（得点）を積み上げていきます。",
      "市場では正直な取引だけでなく、見抜かれなければ利益となる裏取引（嘘）も存在します。",
      "短期的な利益を狙うか、信用を積み上げるか——",
      "判断はすべてあなた次第です。",
      "最も早く目標得点に到達し、最大の富を築いた商人が勝者となります。",
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
