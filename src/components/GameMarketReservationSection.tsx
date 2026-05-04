"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

type ReservationConfig = {
  eventName?: string;
  googleFormUrl?: string;
  googleFormEmbedUrl?: string;
  mailTo?: string;
};

type GameMarketReservationSectionProps = {
  basePath: string;
  borderColor: string;
  primaryColor: string;
  primaryDarkColor: string;
  titleColor: string;
  textColor: string;
  productNames: string[];
};

type FormValues = {
  name: string;
  contact: string;
  productName: string;
  quantity: string;
  visitTime: string;
};

const visitTimeOptions = ["開場直後", "午前中", "12:00-14:00頃", "14:00-16:00頃", "16:00以降", "未定"] as const;

const initialValues: FormValues = {
  name: "",
  contact: "",
  productName: "",
  quantity: "1",
  visitTime: "",
};

function buildReservationMailTo(mailTo: string, eventName: string, values: FormValues) {
  const subject = `【購入予約】${eventName}`;
  const body = [
    `${eventName}での購入予約をお願いします。`,
    "",
    `名前: ${values.name}`,
    `連絡先: ${values.contact}`,
    `ゲームの種類: ${values.productName}`,
    `個数: ${values.quantity}`,
    `当日の来場予定時間: ${values.visitTime}`,
  ].join("\n");

  return `mailto:${mailTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function GameMarketReservationSection({
  basePath,
  borderColor,
  primaryColor,
  primaryDarkColor,
  titleColor,
  textColor,
  productNames,
}: GameMarketReservationSectionProps) {
  const [config, setConfig] = useState<ReservationConfig | null>(null);
  const [hasError, setHasError] = useState(false);
  const [values, setValues] = useState<FormValues>({ ...initialValues, productName: productNames[0] ?? "" });
  const [submitted, setSubmitted] = useState(false);
  const configPath = useMemo(() => `${basePath}/content/game-market-reservation/config.json`, [basePath]);

  const eventName = config?.eventName || "ゲームマーケット";

  useEffect(() => {
    let cancelled = false;

    fetch(configPath, { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("reservation config not found");
        }

        const data = (await response.json()) as ReservationConfig;
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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!config?.mailTo) {
      return;
    }

    setSubmitted(true);
    window.location.href = buildReservationMailTo(config.mailTo, eventName, values);
  }

  return (
    <Paper
      id="game-market-reservation"
      sx={{
        mt: 4,
        p: { xs: 3, md: 4 },
        borderRadius: 4,
        border: `1px solid ${borderColor}`,
        backgroundColor: "#ffffff",
        boxShadow: "0 8px 30px rgba(20, 30, 60, 0.05)",
      }}
    >
      <Stack spacing={2.5}>
        <Stack spacing={0.8}>
          <Typography component="h2" sx={{ fontSize: { xs: 26, md: 34 }, fontWeight: 800, color: titleColor }}>
            ゲームマーケット2026春購入予約
          </Typography>
          <Typography sx={{ color: textColor, fontSize: { xs: 15, md: 16 }, lineHeight: 1.8 }}>
            当日のお取り置き希望を受け付けています。お名前、連絡先、ゲームの種類、個数、来場予定時間をご入力ください。
          </Typography>
        </Stack>

        {config === null && !hasError && <CircularProgress size={20} />}

        {hasError && (
          <Alert severity="warning">
            予約フォーム設定ファイルが見つかりません。`public/content/game-market-reservation/config.json` を確認してください。
          </Alert>
        )}

        {config?.googleFormEmbedUrl && (
          <Box sx={{ border: `1px solid ${borderColor}`, borderRadius: 2, overflow: "hidden", backgroundColor: "#fff" }}>
            <iframe
              title="ゲームマーケット購入予約フォーム"
              src={config.googleFormEmbedUrl}
              width="100%"
              height="760"
              style={{ border: 0, height: "min(760px, 75vh)" }}
            />
          </Box>
        )}

        {config?.googleFormUrl && (
          <Button
            href={config.googleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            sx={{
              width: "fit-content",
              backgroundColor: primaryColor,
              "&:hover": { backgroundColor: primaryDarkColor },
            }}
          >
            予約フォームを別タブで開く
          </Button>
        )}

        {!config?.googleFormEmbedUrl && !config?.googleFormUrl && config?.mailTo && (
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2.2}>
              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <TextField
                  label="名前"
                  name="name"
                  value={values.name}
                  onChange={(event) => setValues((current) => ({ ...current, name: event.target.value }))}
                  required
                  fullWidth
                />
                <TextField
                  label="連絡先"
                  name="contact"
                  value={values.contact}
                  onChange={(event) => setValues((current) => ({ ...current, contact: event.target.value }))}
                  required
                  fullWidth
                  helperText="メールアドレス、電話番号、SNSアカウントなど"
                />
              </Stack>

              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <TextField
                  select
                  label="ゲームの種類"
                  name="productName"
                  value={values.productName}
                  onChange={(event) => setValues((current) => ({ ...current, productName: event.target.value }))}
                  required
                  fullWidth
                >
                  {productNames.map((productName) => (
                    <MenuItem key={productName} value={productName}>
                      {productName}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="個数"
                  name="quantity"
                  type="number"
                  value={values.quantity}
                  onChange={(event) => setValues((current) => ({ ...current, quantity: event.target.value }))}
                  required
                  fullWidth
                  inputProps={{ min: 1, max: 20 }}
                />
                <TextField
                  select
                  label="当日の来場予定時間"
                  name="visitTime"
                  value={values.visitTime}
                  onChange={(event) => setValues((current) => ({ ...current, visitTime: event.target.value }))}
                  required
                  fullWidth
                >
                  {visitTimeOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} alignItems={{ xs: "stretch", sm: "center" }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    px: 4,
                    width: { xs: "100%", sm: "fit-content" },
                    backgroundColor: primaryColor,
                    "&:hover": { backgroundColor: primaryDarkColor },
                  }}
                >
                  予約内容を送信する
                </Button>
                {submitted && (
                  <Typography sx={{ color: textColor, fontSize: 14 }}>
                    メール作成画面が開きます。内容を確認して送信してください。
                  </Typography>
                )}
              </Stack>
            </Stack>
          </Box>
        )}
      </Stack>
    </Paper>
  );
}
