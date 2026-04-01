import type { Metadata } from "next";
import LegalPageTemplate from "@/components/LegalPageTemplate";

export const metadata: Metadata = {
  title: "利用規約 | Amazing Communications",
  description: "Amazing Communicationsの利用規約です。",
};

const sections = [
  {
    heading: "情報の正確性について",
    body: [
      "当サイトに掲載する情報については、できる限り正確な内容となるよう努めますが、その正確性、完全性、有用性、最新性等を保証するものではありません。",
    ],
  },
  {
    heading: "著作権・転載について",
    body: [
      "当サイトに掲載している文章、画像、デザインその他のコンテンツの著作権等は当社または正当な権利者に帰属します。法令で認められる場合を除き、無断で転載、複製、改変、配布等を行うことを禁止します。",
    ],
  },
] as const;

export default function TermsPage() {
  return <LegalPageTemplate title="利用規約" lead="当サイトをご利用いただく際の条件についてご案内します。" sections={sections.map((section) => ({ ...section, body: [...section.body] }))} />;
}