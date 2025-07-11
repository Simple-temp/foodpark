import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { Link } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:3000"; // adjust if needed

// Split array into chunks of `size` (e.g., 4 items per slide)
const chunkRecipes = (arr, size) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

const OurRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/food/getallfoods`);
        setRecipes(data);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  const slides = chunkRecipes(recipes, 4);

  return (
    <Box textAlign="center" sx={{ maxWidth: 1200, mx: "auto", py: 6 }}>
      <Typography
        variant="h4"
        gutterBottom
        color="primary"
        className="header-title-color"
      >
        Our Recipes
      </Typography>
      <Carousel autoPlay interval={2000} navButtonsAlwaysVisible animation="slide" height={260}>
        {slides.length > 0 ? (
          slides.map((slide, idx) => (
            <Box
              key={idx}
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={3}
              flexWrap="nowrap"
            >
              {slide.map((item) => (
                <Box
                  key={item._id || item.id}
                  sx={{
                    flex: "1 1 25%",
                    boxSizing: "border-box",
                    textAlign: "center",
                  }}
                >
                  <Link to={`/food/${item._id || item.id}`}>
                    <img
                      src={
                        item.img?.startsWith("http")
                          ? item.img
                          : `${BASE_URL}${item.img}` // prepend backend URL for relative paths
                      }
                      alt={item.name}
                      style={{
                        width: 200,
                        height: 200,
                        borderRadius: "5%",
                        objectFit: "cover",
                        display: "block",
                        margin: "0 auto",
                        cursor: "pointer",
                      }}
                    />
                  </Link>

                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    ${item.price}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                    {item.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          ))
        ) : (
          <Typography variant="body1">Loading recipes...</Typography>
        )}
      </Carousel>
    </Box>
  );
};

export default OurRecipes;
