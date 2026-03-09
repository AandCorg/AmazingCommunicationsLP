"use client";

import { useEffect, useMemo, useState } from "react";
import { Alert, CircularProgress, Link, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";

type SalesInfoPanelProps = {
  basePath: string;
  borderColor: string;
  titleColor: string;
  textColor: string;
};

type SalesInfoEntry = {
  dateLabel: string;
  dateValue: number;
  content: string;
  url?: string;
};

function parseDateToValue(raw: string): number {
  const normalized = raw.trim();
  const jpMatch = normalized.match(/^(\d{4})年\s*(\d{1,2})月\s*(\d{1,2})日$/);

  if (jpMatch) {
    const [, y, m, d] = jpMatch;
    return Date.UTC(Number(y), Number(m) - 1, Number(d));
  }

  const parsed = Date.parse(normalized);
  return Number.isNaN(parsed) ? Number.NEGATIVE_INFINITY : parsed;
}

function parseLine(line: string): SalesInfoEntry | null {
  const parts = line.split("|").map((part) => part.trim());

  if (parts.length < 2) {
    return null;
  }

  const [dateLabel, content, url] = parts;
  if (!dateLabel || !content) {
    return null;
  }

  const hasUrl = url && /^https?:\/\//i.test(url);
  return {
    dateLabel,
    dateValue: parseDateToValue(dateLabel),
    content,
    url: hasUrl ? url : undefined,
  };
}

export default function SalesInfoPanel({ basePath, borderColor, titleColor, textColor }: SalesInfoPanelProps) {
  const [entries, setEntries] = useState<SalesInfoEntry[] | null>(null);
  const [hasError, setHasError] = useState(false);

  const filePath = useMemo(() => `${basePath}/content/sales-info/brand.txt`, [basePath]);

  useEffect(() => {
    let cancelled = false;

    fetch(filePath, { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("sales info not found");
        }

        const text = await response.text();
        const parsedEntries = text
          .split(/\r?\n/)
          .map((line) => line.trim())
          .filter((line) => line.length > 0);

        const sortedLatestEntries = parsedEntries
          .map((line, index) => ({ parsed: parseLine(line), index }))
          .filter((item): item is { parsed: SalesInfoEntry; index: number } => item.parsed !== null)
          .sort((a, b) => {
            if (a.parsed.dateValue === b.parsed.dateValue) {
              return a.index - b.index;
            }
            return b.parsed.dateValue - a.parsed.dateValue;
          })
          .slice(0, 5)
          .map((item) => item.parsed);

        if (!cancelled) {
          setEntries(sortedLatestEntries);
          setHasError(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setHasError(true);
          setEntries([]);
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

      {entries === null && <CircularProgress size={20} />}

      {hasError && (
        <Alert severity="info" sx={{ mt: 1 }}>
          現在お知らせできる情報はありません。
        </Alert>
      )}

      {!hasError && entries !== null && entries.length > 0 && (
        <List dense sx={{ py: 0 }}>
          {entries.map((entry, index) => (
            <ListItem key={`brand-sales-info-${index}`} sx={{ py: 0.2, px: 0 }}>
              <ListItemText
                primary={
                  <>
                    ・{entry.dateLabel}{" "}
                    {entry.url ? (
                      <Link href={entry.url} target="_blank" rel="noopener noreferrer" underline="hover" color="inherit">
                        {entry.content}
                      </Link>
                    ) : (
                      entry.content
                    )}
                  </>
                }
                sx={{ color: textColor }}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
}
