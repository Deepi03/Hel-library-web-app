/* eslint-disable prettier/prettier */
import {
  Box,
  Container,
  Grid,
  IconButton,
  Link,
  Typography
} from "@mui/material"
import { LinkedIn, GitHub, Work, Copyright } from "@mui/icons-material"

export const Footer = () => {
  return (
    <div>
      <Box
        sx={{
          width: "100%",
          height: "auto",
          backgroundColor: "white",
          paddingTop: "1rem",
          paddingBottom: "1rem"
        }}
      >
        <Container maxWidth="lg">
          <Grid container direction="column" alignItems="center">
            <Grid item xs={12}>
              <Typography color="black" variant="h5">
                <Copyright fontSize="small" />
                Deepika Malini Rajasekar
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography color="#212121" variant="subtitle1">
                <Link
                  href="https://www.linkedin.com/in/deepika-rajasekar/"
                  variant="body2"
                  target="_blank"
                  color="#212121"
                >
                  <LinkedIn />
                </Link>
                <Link
                  href="https://github.com/Deepi03"
                  variant="body2"
                  target="_blank"
                  color="#212121"
                >
                  <GitHub />
                </Link>
                <Link
                  href="https://deepiport.netlify.app/"
                  variant="body2"
                  target="_blank"
                  color="#212121"
                >
                  <Work />
                </Link>
              </Typography>
              <Typography></Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  )
}
