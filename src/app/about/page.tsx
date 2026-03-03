import { Box, Button, Container, Stack, Typography } from "@mui/material";

export default function AboutPage() {
  return (
    <Container sx={{ py: 8 }}>
      <Stack spacing={2}>
        <Typography variant="h3" component="h1">
          About
        </Typography>
        <Typography>
          Amazing Communicationsは、体験型のコミュニケーションコンテンツやボードゲーム商品を企画しています。
        </Typography>
        <Typography>
          このサイトでは、商品ごとの世界観とルール概要を分かりやすく確認できます。
        </Typography>
        <Box sx={{ pt: 2 }}>
          <Button href="/" variant="contained">
            商品一覧へ
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}
