"use client";

import { useEffect, useMemo, useState } from "react";
import { Alert, CircularProgress, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";

type SalesInfoPanelProps = {
  slug: string;
  basePath: string;
  borderColor: string;
  titleColor: string;
  textColor: string;
};

export default function SalesInfoPanel({ slug, basePath, borderColor, titleColor, textColor }: SalesInfoPanelProps) {
  const [lines, setLines] = useState<string[] | null>(null);
  const [hasError, setHasError] = useState(false);

  const filePath = useMemo(() => `${basePath}/content/sales-info/${slug}.txt`, [basePath, slug]);

  useEffect(() => {
    let cancelled = false;

    fetch(filePath, { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("sales info not found");
        }

        const text = await response.text();
        const parsedLines = text
          .split(/\r?\n/)
          .map((line) => line.trim())
          .filter((line) => line.length > 0);

        if (!cancelled) {
          setLines(parsedLines);
          setHasError(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setHasError(true);
          setLines([]);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [filePath]);

  return (
    <Paper
      sx={{
        p: 2.5,
        borderRadius: 4,
        backgroundColor: "#ffffff",
        border: `1px solid ${borderColor}`,
      }}
    >
      <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 700, color: titleColor }}>
        販売・展開情報
      </Typography>

      {lines === null && <CircularProgress size={20} />}

      {hasError && (
        <Alert severity="info" sx={{ mt: 1 }}>
          現在お知らせできる情報はありません。
        </Alert>
      )}

      {!hasError && lines !== null && lines.length > 0 && (
        <List dense sx={{ py: 0 }}>
          {lines.map((line, index) => (
            <ListItem key={`${slug}-sales-info-${index}`} sx={{ py: 0.2, px: 0 }}>
              <ListItemText primary={`・${line}`} sx={{ color: textColor }} />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
}

