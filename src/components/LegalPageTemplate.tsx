import { Box, Button, Container, Divider, Paper, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

type LegalSection = {
  heading: string;
  body: ReactNode[];
};

type LegalPageTemplateProps = {
  title: string;
  lead?: string;
  sections: LegalSection[];
};

export default function LegalPageTemplate({ title, lead, sections }: LegalPageTemplateProps) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <Box sx={{ backgroundColor: "#f7f8fb", minHeight: "100vh", py: { xs: 4, md: 7 } }}>
      <Container maxWidth="md">
        <Stack spacing={3}>
          <Button href={`${basePath}/`} variant="text" sx={{ width: "fit-content", px: 0, color: "#1c2430" }}>
            トップへ戻る
          </Button>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 4,
              border: "1px solid #e7e8ef",
              backgroundColor: "#ffffff",
            }}
          >
            <Stack spacing={3}>
              <Stack spacing={1.5}>
                <Typography component="h1" sx={{ fontSize: { xs: 30, md: 40 }, fontWeight: 800, color: "#1c2430" }}>
                  {title}
                </Typography>
                {lead && <Typography sx={{ color: "#5a6270", lineHeight: 1.8 }}>{lead}</Typography>}
              </Stack>

              {sections.map((section, index) => (
                <Box key={section.heading}>
                  {index > 0 && <Divider sx={{ mb: 3 }} />}
                  <Stack spacing={1.5}>
                    <Typography component="h2" sx={{ fontSize: 22, fontWeight: 700, color: "#1c2430" }}>
                      {section.heading}
                    </Typography>
                    {section.body.map((paragraph, paragraphIndex) => (
                      <Typography key={`${section.heading}-${paragraphIndex}`} sx={{ color: "#5a6270", lineHeight: 1.9, whiteSpace: "pre-line" }}>
                        {paragraph}
                      </Typography>
                    ))}
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}