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
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <Box sx={{ backgroundColor: product.theme.background, minHeight: "100vh", py: 6 }}>
      <Container maxWidth="lg">
        <Stack spacing={4}>
          <Button href={`${basePath}/`} sx={{ width: "fit-content", px: 0 }}>
            商品一覧へ戻る
          </Button>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, md: 3 },
              borderRadius: 3,
              border: `2px solid ${product.theme.secondary}`,
              backgroundColor: product.theme.cardBackground,
            }}
          >
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 7 }}>
                <Typography component="h1" sx={{ fontSize: { xs: "2rem", md: "2.7rem" }, fontWeight: 800 }}>
                  {product.name}
                </Typography>
                <Typography sx={{ mt: 1.5, mb: 2 }}>{product.tagline}</Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 2 }} useFlexGap flexWrap="wrap">
                  <Chip label={`対象年齢: ${product.age}`} />
                  <Chip label={`プレイ人数: ${product.players}`} />
                  <Chip label={`プレイ時間: ${product.playTime}`} />
                </Stack>
                <Stack spacing={1}>
                  {product.catchcopy.map((line) => (
                    <Typography
                      key={line}
                      sx={{ color: product.theme.primary, fontWeight: 700, fontSize: { xs: "1.15rem", md: "1.4rem" } }}
                    >
                      {line}
                    </Typography>
                  ))}
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, md: 5 }}>
                <Card sx={{ position: "relative", height: 320, borderRadius: 2, overflow: "hidden" }}>
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
              <Paper sx={{ p: 3, borderRadius: 3, backgroundColor: product.theme.cardBackground }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
                  商品説明
                </Typography>
                <Stack spacing={1.5}>
                  {product.description.map((line, index) => (
                    <Typography key={`${product.slug}-desc-${index}`}>{line}</Typography>
                  ))}
                </Stack>
                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 700 }}>
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
                <Paper sx={{ p: 2, borderRadius: 3, backgroundColor: product.theme.cardBackground }}>
                  <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 700 }}>
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

                <Card sx={{ position: "relative", height: 250, borderRadius: 3, overflow: "hidden" }}>
                  <Image
                    src={`${basePath}${product.images.gameFlow}`}
                    alt={`${product.name} ゲームフロー資料`}
                    fill
                    sizes="(max-width: 900px) 100vw, 40vw"
                    style={{ objectFit: "cover" }}
                  />
                </Card>

                <Card sx={{ position: "relative", height: 250, borderRadius: 3, overflow: "hidden" }}>
                  <Image
                    src={`${basePath}${product.images.packageDetail}`}
                    alt={`${product.name} パッケージ裏面`}
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
