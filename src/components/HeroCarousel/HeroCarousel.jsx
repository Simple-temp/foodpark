
import { Box, Typography, Button } from "@mui/material";
import Carousel from "react-material-ui-carousel";

const heroSlides = [
  {
    title: "Special Dish of the Day",
    subtitle: "Enjoy our chef’s exclusive recipe crafted with love and tradition.",
    image: "https://static.toiimg.com/photo/74984407.cms?width=500&resizemode=4&imgsize=1699947",
  },
  {
    title: "Comfort in Every Bite",
    subtitle: "Hearty Indian dinners ready in minutes — quick, tasty, and satisfying.",
    image: "https://cdn.veganrecipeclub.org.uk/wp-content/uploads/2021/01/indian_dinner_convenience_style-1568x1046.jpg",
  },
  {
    title: "Unlock Flavor with Spices",
    subtitle: "Infuse your meals with the magic of hand-picked Indian masalas.",
    image: "https://ashokmasale.com/wp-content/uploads/2024/08/19854556e085267e0a724203875148dd-1024x600.jpg",
  },
];

const HeroCarousel = () => {
  return (
    <Box
      sx={{
        mt: 3,
        maxWidth: "1200px",
        mx: "auto",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Carousel
        animation="fade"
        interval={2000}
        indicators
        navButtonsAlwaysVisible
        swipe
      >
        {heroSlides.map((slide, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: "#e3f2fd",
              p: 4,
              height: { xs: "auto", md: 500 },
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "space-between",
              gap: 4,
              borderRadius: 2,
            }}
          >
            {/* Text Section */}
            <Box
              sx={{
                width: { xs: "100%", md: "40%" },
                textAlign: { xs: "center", md: "left" },
              }}
            >
              <Typography variant="h4" gutterBottom>
                {slide.title}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {slide.subtitle}
              </Typography>
              <Button variant="contained" color="primary" className="button-color">
                Order Now
              </Button>
            </Box>

            {/* Image Section */}
            <Box
              sx={{
                width: { xs: "100%", md: "60%" },
                height: { xs: 300, md: "100%" },
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <img
                src={slide.image}
                alt={slide.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </Box>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default HeroCarousel;
