import type { Metadata } from "next";
import LegalPageTemplate from "@/components/LegalPageTemplate";

export const metadata: Metadata = {
  title: "免責事項 | Amazing Communications",
  description: "Amazing Communicationsの免責事項です。",
};

const sections = [
  {
    heading: "商品情報について",
    body: [
      "当サイトに掲載しているボードゲームの内容、仕様、価格等は、予告なく変更される場合があります。最新の情報は販売ページやご案内内容をご確認ください。",
    ],
  },
  {
    heading: "購入判断について",
    body: [
      "商品の購入、利用、導入等に関する最終的な判断は、お客様ご自身の責任において行っていただくものとします。当サイトの情報に基づいて生じた損害等について、当社は責任を負いかねます。",
    ],
  },
] as const;

export default function DisclaimerPage() {
  return <LegalPageTemplate title="免責事項" lead="当サイトの情報利用にあたっての注意事項です。" sections={sections.map((section) => ({ ...section, body: [...section.body] }))} />;
}