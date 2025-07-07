import React from "react";
import { Box, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";

const recipes = [
  {
    name: "Cheesy Chili Mac",
    price: "$12.99",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/easy-dinner-recipes-chili-mac-and-cheese-6721330c2edff.jpg?crop=1xw:1xh;center,top&resize=980:*",
  },
  {
    name: "Vibrant Veggie Bowl",
    price: "$10.99",
    image: "https://cdn.loveandlemons.com/wp-content/uploads/2019/09/dinner-ideas-2.jpg",
  },
  {
    name: "Buzzfeed Dinner Special",
    price:
      "$11.49",
    image:
      "https://img.buzzfeed.com/buzzfeed-static/static/2022-03/5/0/asset/6201713e5c7e/sub-buzz-1009-1646440684-8.jpg?downsize=900:*&output-format=auto&output-quality=auto",
  },
  {
    name: "Classic Beef & Broccoli",
    price: "$13.99",
    image:
      "https://www.simplyrecipes.com/thmb/kTh0yVR2KrJFnGQPNGe1UYIG1t8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Ground-Beef-Broccoli-LEAD-6-faafd703b949408ba35b3199cd5a22e9.jpg",
  },
  {
    name: "Easy Chicken Delight",
    price: "$9.99",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/easy-dinner-recipes-677efe8559104.png?crop=1.00xw:1.00xh;0,0&resize=640:*",
  },
  {
    name: "Homestyle Curry Rice",
    price: "$10.49",
    image: "https://via.placeholder.com/400x300?text=Curry+Rice",
  },
  {
    name: "Herbed Pasta Mix",
    price: "$8.99",
    image: "https://via.placeholder.com/400x300?text=Herbed+Pasta",
  },
];

// Split into chunks of 4 for each carousel slide
const chunkRecipes = (arr, size) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

const OurRecipes = () => {
  const slides = chunkRecipes(recipes, 4);

  return (
    <Box textAlign="center" sx={{ maxWidth: 1200, mx: "auto", py: 6 }}>
      <Typography variant="h4" gutterBottom color="primary" className="header-title-color">
        Our Recipes
      </Typography>
      <Carousel autoPlay interval={2000} navButtonsAlwaysVisible animation="slide">
        {slides.map((slide, idx) => (
          <Box
            key={idx}
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={3}
            flexWrap="nowrap"
          >
            {slide.map((item, i) => (
              <Box
                key={i}
                sx={{
                  flex: "1 1 25%",
                  boxSizing: "border-box",
                  textAlign: "center",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    objectFit: "cover",
                    display: "block",
                    margin: "0 auto",
                  }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {item.price}
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                  {item.name}
                </Typography>
              </Box>
            ))}
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default OurRecipes;
