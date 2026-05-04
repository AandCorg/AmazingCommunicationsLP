"use client";

import { useEffect, useMemo, useState } from "react";
import { Alert, Box, Button, CircularProgress, Paper, Stack, Typography } from "@mui/material";

type ContactConfig = {
  googleFormUrl?: string;
  googleFormEmbedUrl?: string;
};

type ContactSectionProps = {
  basePath: string;
  borderColor: string;
  titleColor: string;
};

export default function ContactSection({ basePath, borderColor, titleColor }: ContactSectionProps) {
  const [config, setConfig] = useState<ContactConfig | null>(null);
  const [hasError, setHasError] = useState(false);
  const configPath = useMemo(() => `${basePath}/content/contact/config.json`, [basePath]);

  useEffect(() => {
    let cancelled = false;

    fetch(configPath, { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("contact config not found");
        }
        const data = (await response.json()) as ContactConfig;
        if (!cancelled) {
          setConfig(data);
          setHasError(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setConfig(null);
          setHasError(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [configPath]);

  return (
    <Paper
      sx={{
        mt: 6,
        p: { xs: 3, md: 4 },
        borderRadius: 4,
        border: `1px solid ${borderColor}`,
        backgroundColor: "#ffffff",
      }}
      id="contact"
    >
      <Stack spacing={2}>
        <Typography component="h2" sx={{ fontSize: { xs: 26, md: 34 }, fontWeight: 800, color: titleColor }}>
          お問い合わせ
        </Typography>

        {config === null && !hasError && <CircularProgress size={20} />}

        {hasError && <Alert severity="warning">お問い合わせフォーム設定ファイルが見つかりません。</Alert>}

        {config?.googleFormEmbedUrl && (
          <Box sx={{ border: `1px solid ${borderColor}`, borderRadius: 2, overflow: "hidden", backgroundColor: "#fff" }}>
            <iframe
              title="お問い合わせフォーム"
              src={config.googleFormEmbedUrl}
              width="100%"
              height="720"
              style={{ border: 0, height: "min(720px, 70vh)" }}
            />
          </Box>
        )}

        {config?.googleFormUrl && (
          <Button href={config.googleFormUrl} target="_blank" rel="noopener noreferrer" variant="contained" sx={{ width: "fit-content" }}>
            Googleフォームを別タブで開く
          </Button>
        )}
      </Stack>
    </Paper>
  );
}
