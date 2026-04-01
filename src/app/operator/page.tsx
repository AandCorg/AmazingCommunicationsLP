import type { Metadata } from "next";
import LegalPageTemplate from "@/components/LegalPageTemplate";

export const metadata: Metadata = {
  title: "運営者情報 | Amazing Communications",
  description: "Amazing Communicationsの運営者情報です。",
};

const sections = [
  {
    heading: "運営者",
    body: ["株式会社A&Cコンサルティング"],
  },
  {
    heading: "連絡先",
    body: ["info@aandcjapan.com"],
  },
] as const;

export default function OperatorPage() {
  return <LegalPageTemplate title="運営者情報" lead="当サイトの運営者情報を掲載しています。" sections={sections.map((section) => ({ ...section, body: [...section.body] }))} />;
}