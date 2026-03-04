import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { getProductBySlug, products } from "@/data/products";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "商品が見つかりません",
    };
  }

  return {
    title: `${product.name} | Amazing Communications`,
    description: product.summary,
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const brandColors = {
    primary: "#e86a1f",
    pageBg: "#f7f8fb",
    heroBg: "#fbf7f2",
    cardBg: "#ffffff",
    border: "#e7e8ef",
    textMain: "#1c2430",
    textSub: "#5a6270",
  };
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <Box sx={{ backgroundColor: brandColors.pageBg, minHeight: "100vh", py: 6 }}>
      <Container maxWidth="lg" sx={{ pt: 1 }}>
        <Stack spacing={4}>
          <Button href={`${basePath}/`} variant="text" sx={{ width: "fit-content", px: 0, color: brandColors.textMain }}>
            商品一覧へ戻る
          </Button>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, md: 4 },
              borderRadius: 4,
              border: `1px solid ${brandColors.border}`,
              background: `linear-gradient(180deg, ${brandColors.heroBg} 0%, #ffffff 100%)`,
            }}
          >
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 7 }}>
                <Typography component="h1" sx={{ fontSize: { xs: "2rem", md: "2.7rem" }, fontWeight: 800, color: brandColors.textMain }}>
                  {product.name}
                </Typography>
                <Typography sx={{ mt: 1.5, mb: 2, color: brandColors.textSub }}>{product.tagline}</Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 2 }} useFlexGap flexWrap="wrap">
                  <Chip label={`対象年齢: ${product.age}`} />
                  <Chip label={`プレイ人数: ${product.players}`} />
                  <Chip label={`プレイ時間: ${product.playTime}`} />
                </Stack>
                <Stack spacing={1}>
                  {product.catchcopy.map((line) => (
                    <Typography
                      key={line}
                      sx={{ color: brandColors.primary, fontWeight: 700, fontSize: { xs: "1.15rem", md: "1.4rem" } }}
                    >
                      {line}
                    </Typography>
                  ))}
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, md: 5 }}>
                <Card
                  sx={{
                    position: "relative",
                    height: 320,
                    borderRadius: 3,
                    overflow: "hidden",
                    border: `1px solid ${brandColors.border}`,
                    boxShadow: "0 8px 30px rgba(20, 30, 60, 0.05)",
                  }}
                >
                  <Image
                    src={`${basePath}${product.images.keyVisual}`}
                    alt={`${product.name} メインビジュアル`}
                    fill
                    sizes="(max-width: 900px) 100vw, 40vw"
                    style={{ objectFit: "cover" }}
                  />
                </Card>
              </Grid>
            </Grid>
          </Paper>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 4,
                  backgroundColor: brandColors.cardBg,
                  border: `1px solid ${brandColors.border}`,
                }}
              >
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: brandColors.textMain }}>
                  商品説明
                </Typography>
                <Stack spacing={1.5}>
                  {product.description.map((line, index) => (
                    <Typography key={`${product.slug}-desc-${index}`} sx={{ color: brandColors.textSub }}>
                      {line}
                    </Typography>
                  ))}
                </Stack>
                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 700, color: brandColors.textMain }}>
                  内容物
                </Typography>
                <List dense>
                  {product.components.map((item) => (
                    <ListItem key={item} sx={{ py: 0.3, px: 0 }}>
                      <ListItemText primary={`・${item}`} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <Stack spacing={3}>
                <Paper
                  sx={{
                    p: 2.5,
                    borderRadius: 4,
                    backgroundColor: brandColors.cardBg,
                    border: `1px solid ${brandColors.border}`,
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 700, color: brandColors.textMain }}>
                    ゲームの流れ
                  </Typography>
                  <List dense>
                    {product.flow.map((step, index) => (
                      <ListItem key={`${product.slug}-step-${index}`} sx={{ py: 0.2, px: 0 }}>
                        <ListItemText primary={`${index + 1}. ${step}`} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>

                <Card
                  sx={{
                    position: "relative",
                    height: 250,
                    borderRadius: 4,
                    overflow: "hidden",
                    border: `1px solid ${brandColors.border}`,
                    boxShadow: "0 8px 30px rgba(20, 30, 60, 0.05)",
                  }}
                >
                  <Image
                    src={`${basePath}${product.images.gameFlow}`}
                    alt={`${product.name} ゲームフロー図`}
                    fill
                    sizes="(max-width: 900px) 100vw, 40vw"
                    style={{ objectFit: "cover" }}
                  />
                </Card>

                <Card
                  sx={{
                    position: "relative",
                    height: 250,
                    borderRadius: 4,
                    overflow: "hidden",
                    border: `1px solid ${brandColors.border}`,
                    boxShadow: "0 8px 30px rgba(20, 30, 60, 0.05)",
                  }}
                >
                  <Image
                    src={`${basePath}${product.images.packageDetail}`}
                    alt={`${product.name} パッケージ詳細`}
                    fill
                    sizes="(max-width: 900px) 100vw, 40vw"
                    style={{ objectFit: "cover" }}
                  />
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
