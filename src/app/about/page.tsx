import { Container, Typography, Box } from "@mui/material";

export default function AboutPage() {
  return (
    <Container sx={{ mt: 6 }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          About
        </Typography>
        <Typography variant="body1">
          このページは MUI と Next.js(App Router) で作成したサンプルの About ページです。
        </Typography>
      </Box>
    </Container>
  );
}
