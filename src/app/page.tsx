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
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ContactSection from "@/components/ContactSection";
import SalesInfoPanel from "@/components/SalesInfoPanel";
import { products } from "@/data/products";

export default function HomePage() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const brandColors = {
    primary: "#e86a1f",
    primaryDark: "#bf4f11",
    pageBg: "#f7f8fb",
    heroBg: "#fbf7f2",
    cardBg: "#ffffff",
    border: "#e7e8ef",
    textMain: "#1c2430",
    textSub: "#5a6270",
  };

  return (
    <Box sx={{ backgroundColor: brandColors.pageBg, minHeight: "100vh", pb: 10 }}>
      <Container maxWidth="lg" sx={{ pt: 3 }}>
        <Paper
          elevation={0}
          sx={{
            mt: 1,
            px: { xs: 3, md: 7 },
            py: { xs: 5, md: 7 },
            borderRadius: 6,
            border: `1px solid ${brandColors.border}`,
            background: `linear-gradient(180deg, ${brandColors.heroBg} 0%, #ffffff 100%)`,
          }}
        >
          <Stack spacing={{ xs: 2.5, md: 2 }} alignItems="center" textAlign="center">
            <Box
              component="h1"
              sx={{
                m: 0,
                width: "100%",
                maxWidth: { xs: 320, sm: 460, md: 720 },
              }}
            >
              <Image
                src={`${basePath}/brand/AmazingCommunications_logo.png`}
                alt="Amazing Communications logo"
                width={1816}
                height={478}
                priority
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </Box>
            <Typography sx={{ mt: { xs: 0.5, md: 0 }, maxWidth: 820, color: brandColors.textSub, fontSize: { xs: 16, md: 20 } }}>
              対話と気づきを生むamazingな体験を届けます。
            </Typography>
            <Button href="#products" variant="contained" size="large" sx={{ mt: { xs: 0.5, md: 0 }, px: 4 }}>
              商品ラインアップを見る
            </Button>
          </Stack>
        </Paper>

        <Divider sx={{ my: 5 }} />

        <Box sx={{ mt: 4 }}>
          <SalesInfoPanel
            basePath={basePath}
            borderColor={brandColors.border}
            titleColor={brandColors.textMain}
            textColor={brandColors.textSub}
          />
        </Box>

        <Stack id="products" spacing={1} sx={{ mt: 4, mb: 3 }}>
          <Typography component="h2" sx={{ fontSize: { xs: 28, md: 38 }, fontWeight: 800, color: brandColors.textMain }}>
            Product lineup
          </Typography>
        </Stack>

        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
          {products.map((product) => (
            <Card
              key={product.slug}
              sx={{
                flex: 1,
                borderRadius: 4,
                border: `1px solid ${brandColors.border}`,
                backgroundColor: brandColors.cardBg,
                boxShadow: "0 8px 30px rgba(20, 30, 60, 0.05)",
              }}
            >
              <CardMedia sx={{ position: "relative", height: 280 }}>
                <Image
                  src={`${basePath}${product.images.keyVisual}`}
                  alt={`${product.name} key visual`}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </CardMedia>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" spacing={1} sx={{ mb: 1.8 }} flexWrap="wrap" useFlexGap>
                  <Chip label={product.age} size="small" />
                  <Chip label={product.players} size="small" />
                  <Chip label={product.playTime} size="small" />
                </Stack>
                <Typography variant="h5" sx={{ mb: 1, fontWeight: 800, color: brandColors.textMain }}>
                  {product.name}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1.2 }}>
                  {product.tagline}
                </Typography>
                <Typography variant="body2" sx={{ color: brandColors.textSub }}>
                  {product.summary}
                </Typography>
              </CardContent>
              <CardActions sx={{ px: 3, pb: 3 }}>
                <Button
                  href={`${basePath}/products/${product.slug}/`}
                  variant="contained"
                  sx={{
                    backgroundColor: brandColors.primary,
                    "&:hover": { backgroundColor: brandColors.primaryDark },
                  }}
                >
                  詳細を見る
                </Button>
              </CardActions>
            </Card>
          ))}
        </Stack>

        <ContactSection
          basePath={basePath}
          borderColor={brandColors.border}
          titleColor={brandColors.textMain}
        />
      </Container>
    </Box>
  );
}
