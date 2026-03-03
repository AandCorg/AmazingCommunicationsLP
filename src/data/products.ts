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
  catchcopy: string[];
  theme: ProductTheme;
  images: {
    keyVisual: string;
    packageDetail: string;
    gameFlow: string;
  };
  components: string[];
  flow: string[];
  description: string[];
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
    catchcopy: ["ダイスを振り", "資源を集め", "嘘を見抜け"],
    theme: {
      primary: "#1d6b52",
      secondary: "#c6a15b",
      background: "#f3efe1",
      cardBackground: "#fffaf0",
    },
    images: {
      keyVisual: "/products/hattarishokai/box-front.png",
      packageDetail: "/products/hattarishokai/box-back.png",
      gameFlow: "/products/hattarishokai/game-flow.png",
    },
    components: [
      "資源カード x 47枚",
      "見習い印カード",
      "配役カード",
      "得点チップ",
      "サイコロ x 1個",
      "ダイスカップ x 1個",
      "説明書",
    ],
    flow: [
      "時計回りで順番に手番を行う。",
      "サイコロを振る。",
      "出目に応じて、対応する資源を1枚獲得する。",
      "申告内容は自由に嘘をついてよい。",
      "「出目宝石だけど金が出た」など、獲得資源が出目と合わない発言が強制ブラフになる。",
    ],
    description: [
      "ハッタリ商会は、限られた資源を巡って交渉と見抜き合いを繰り返すボードゲームです。",
      "ダイスの出目を起点にしながら、あえて嘘を混ぜた申告で相手を揺さぶることができます。",
      "短時間で心理戦の駆け引きを楽しめるため、初めてのメンバーでも盛り上がりやすい設計です。",
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
