import Image from "next/image";
import {
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
  return (
    <Box sx={{ backgroundColor: "#f6f2e8", minHeight: "100vh", py: 8 }}>
      <Container maxWidth="lg">
        <Stack spacing={2} sx={{ mb: 6 }}>
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 700,
              letterSpacing: "0.03em",
            }}
          >
            商品ラインアップ
          </Typography>
          <Typography variant="h6" color="text.secondary">
            ボードゲームを中心に、商品ごとに世界観と遊び方が伝わる紹介ページを展開します。
          </Typography>
        </Stack>

        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
          {products.map((product) => (
            <Card
              key={product.slug}
              sx={{
                flex: 1,
                borderRadius: 3,
                border: `2px solid ${product.theme.secondary}`,
                backgroundColor: product.theme.cardBackground,
              }}
            >
              <CardMedia sx={{ position: "relative", height: 280 }}>
                <Image
                  src={product.images.keyVisual}
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
                  href={`/products/${product.slug}`}
                  variant="contained"
                  sx={{
                    backgroundColor: product.theme.primary,
                    "&:hover": { backgroundColor: product.theme.primary },
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
