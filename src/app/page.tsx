"use client";

import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";

export default function HomePage() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My MUI x Next.js Site
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              サンプルページ
            </Typography>
            <Typography variant="body1">
              これは MUI コンポーネントを使ったサンプルです。Next.js の static
              site generation (SSG) により事前生成されます。
            </Typography>
          </CardContent>
          <CardActions>
            <Button component={Link} href="/about" variant="contained">
              Aboutページへ
            </Button>
          </CardActions>
        </Card>
      </Container>
    </>
  );
}
