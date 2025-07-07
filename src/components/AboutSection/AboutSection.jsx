import { Grid, Box, Typography } from "@mui/material";

const AboutSection = () => {
  return (
    <div className="earch-container">
      <Box textAlign="center" px={2}>
        <Typography variant="h4" gutterBottom className="header-title-color">
          About Our Food & Restaurant
        </Typography>
        <Typography variant="body1" gutterBottom>
          Discover our passion for fresh ingredients and exceptional service.
        </Typography>

        <Grid container spacing={4} alignItems="center" mt={2}>
          {/* Left side - Info (40%) */}
          <Grid item xs={12} md={5}>
            <Box textAlign="left">
              <Typography variant="h5" gutterBottom className="header-title-color-h4">
                Tradition Meets Taste
              </Typography>
              <Typography variant="body2">
                We blend tradition with innovation to bring you unforgettable
                flavors.
              </Typography>
            </Box>
          </Grid>

          {/* Right side - Image (60%) */}
          <Grid item xs={12} md={7}>
            <img
              src="https://www.truefoodkitchen.com/wp-content/uploads/2025/05/Ultimate-Feast_Catering_2025_97-scaled.jpg"
              alt="Restaurant"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: 500,
                borderRadius: 12,
                objectFit: "cover",
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default AboutSection;
