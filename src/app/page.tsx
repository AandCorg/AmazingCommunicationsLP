import Image from "next/image";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { products } from "@/data/products";

export default function HomePage() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const brandColors = {
    pageBackground: "#fff7ef",
    cardBackground: "#fffdf9",
    cardBorder: "#f2b366",
    primary: "#e86a1f",
    accent: "#9a3f0b",
  };

  return (
    <Box sx={{ backgroundColor: brandColors.pageBackground, minHeight: "100vh", py: 8 }}>
      <Container maxWidth="lg">
        <Stack spacing={2} sx={{ mb: 5 }}>
          <Typography
            component="p"
            sx={{ color: brandColors.accent, fontWeight: 700, letterSpacing: "0.08em" }}
          >
            Amazing Communications
          </Typography>
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 700,
              letterSpacing: "0.03em",
              color: "#1f1f1f",
            }}
          >
            商品ラインアップ
          </Typography>
          <Typography variant="h6" color="text.secondary">
            ボードゲームを中心に、商品ごとに世界観と遊び方が伝わる紹介ページを展開します。
          </Typography>
        </Stack>
        <Alert
          severity="info"
          sx={{
            mb: 4,
            border: `1px solid ${brandColors.cardBorder}`,
            backgroundColor: "#fff2e4",
            "& .MuiAlert-icon": { color: brandColors.primary },
          }}
        >
          想像を超えて、人を繋げる。Amazing Communicationsの体験設計を商品ごとに紹介します。
        </Alert>

        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
          {products.map((product) => (
            <Card
              key={product.slug}
              sx={{
                flex: 1,
                borderRadius: 3,
                border: `2px solid ${brandColors.cardBorder}`,
                backgroundColor: brandColors.cardBackground,
              }}
            >
              <CardMedia sx={{ position: "relative", height: 280 }}>
                <Image
                  src={`${basePath}${product.images.keyVisual}`}
                  alt={`${product.name} キービジュアル`}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </CardMedia>
              <CardContent>
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <Chip label={product.age} size="small" />
                  <Chip label={product.players} size="small" />
                  <Chip label={product.playTime} size="small" />
                </Stack>
                <Typography variant="h5" sx={{ mb: 1, fontWeight: 700 }}>
                  {product.name}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1.5 }}>
                  {product.tagline}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.summary}
                </Typography>
              </CardContent>
              <CardActions sx={{ px: 2, pb: 2 }}>
                <Button
                  href={`${basePath}/products/${product.slug}/`}
                  variant="contained"
                  sx={{
                    backgroundColor: brandColors.primary,
                    "&:hover": { backgroundColor: "#d35e18" },
                  }}
                >
                  商品ページを見る
                </Button>
              </CardActions>
            </Card>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
