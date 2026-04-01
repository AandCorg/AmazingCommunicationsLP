import type { Metadata } from "next";
import LegalPageTemplate from "@/components/LegalPageTemplate";

export const metadata: Metadata = {
  title: "プライバシーポリシー | Amazing Communications",
  description: "Amazing Communicationsのプライバシーポリシーです。",
};

const sections = [
  {
    heading: "基本方針",
    body: [
      "株式会社A&Cコンサルティング（以下「当社」といいます。）は、当サイトを通じて取得する個人情報について、その重要性を認識し、個人情報の保護に関する法令その他の規範を遵守したうえで、適切に取り扱います。",
    ],
  },
  {
    heading: "取得する情報",
    body: [
      "当社は、お問い合わせフォームの送信時などに、お名前、メールアドレス、お問い合わせ内容その他ご提供いただいた情報を取得することがあります。",
    ],
  },
  {
    heading: "利用目的",
    body: [
      "取得した情報は、お問い合わせへの対応、当社サービスに関するご案内、必要なご連絡、サービス改善のための分析、その他これらに付随する目的の範囲で利用します。",
    ],
  },
  {
    heading: "第三者提供",
    body: [
      "当社は、法令に基づく場合を除き、ご本人の同意なく取得した個人情報を第三者に提供しません。",
    ],
  },
  {
    heading: "安全管理",
    body: [
      "当社は、個人情報への不正アクセス、漏えい、滅失またはき損の防止その他個人情報の安全管理のため、必要かつ適切な措置を講じます。",
    ],
  },
  {
    heading: "開示・訂正・削除等",
    body: [
      "ご本人から自己の個人情報について、開示、訂正、追加、削除、利用停止等のお申し出があった場合は、ご本人確認のうえ、法令に従って適切に対応します。",
    ],
  },
  {
    heading: "お問い合わせ窓口",
    body: [
      "本ポリシーに関するお問い合わせは、当サイトに掲載しているお問い合わせフォームまたは運営者情報記載の連絡先までご連絡ください。",
    ],
  },
  {
    heading: "改定",
    body: [
      "当社は、必要に応じて本ポリシーの内容を見直し、改善することがあります。改定後の内容は当サイト上に掲載した時点から効力を生じるものとします。",
    ],
  },
] as const;

export default function PrivacyPolicyPage() {
  return <LegalPageTemplate title="プライバシーポリシー" lead="当サイトにおける個人情報の取扱いについてご案内します。" sections={sections.map((section) => ({ ...section, body: [...section.body] }))} />;
}