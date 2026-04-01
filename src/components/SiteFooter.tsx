import { Box, Container, Stack, Typography } from "@mui/material";

type FooterLink = {
  href: string;
  label: string;
};

const footerLinks: FooterLink[] = [
  { href: "/privacy-policy/", label: "プライバシーポリシー" },
  { href: "/operator/", label: "運営者情報" },
  { href: "/terms/", label: "利用規約" },
  { href: "/disclaimer/", label: "免責事項" },
];

export default function SiteFooter() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <Box component="footer" sx={{ borderTop: "1px solid #e7e8ef", backgroundColor: "#ffffff", mt: "auto" }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1, sm: 3 }} useFlexGap>
            {footerLinks.map((link) => (
              <Typography
                key={link.href}
                component="a"
                href={`${basePath}${link.href}`}
                sx={{ color: "#5a6270", fontSize: 14, transition: "color 0.2s ease", "&:hover": { color: "#e86a1f" } }}
              >
                {link.label}
              </Typography>
            ))}
          </Stack>
          <Typography sx={{ color: "#8a90a0", fontSize: 13 }}>
            © {new Date().getFullYear()} Amazing Communications
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}