import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button, TextField, Rating } from "@mui/material";

const recipes = [
  {
    id: 1,
    name: "Cheesy Chili Mac",
    price: "$12.99",
    available: true,
    image:
      "https://hips.hearstapps.com/hmg-prod/images/easy-dinner-recipes-chili-mac-and-cheese-6721330c2edff.jpg?crop=1xw:1xh;center,top&resize=980:*",
  },
  {
    id: 2,
    name: "Vibrant Veggie Bowl",
    price: "$10.99",
    available: false,
    image:
      "https://cdn.loveandlemons.com/wp-content/uploads/2019/09/dinner-ideas-2.jpg",
  },
  {
    id: 3,
    name: "Buzzfeed Dinner Special",
    price: "$11.49",
    available: true,
    image:
      "https://img.buzzfeed.com/buzzfeed-static/static/2022-03/5/0/asset/6201713e5c7e/sub-buzz-1009-1646440684-8.jpg?downsize=900:*&output-format=auto&output-quality=auto",
  },
  {
    id: 4,
    name: "Classic Beef & Broccoli",
    price: "$13.99",
    available: true,
    image:
      "https://www.simplyrecipes.com/thmb/kTh0yVR2KrJFnGQPNGe1UYIG1t8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Ground-Beef-Broccoli-LEAD-6-faafd703b949408ba35b3199cd5a22e9.jpg",
  },
  {
    id: 5,
    name: "Easy Chicken Delight",
    price: "$9.99",
    available: true,
    image:
      "https://hips.hearstapps.com/hmg-prod/images/easy-dinner-recipes-677efe8559104.png?crop=1.00xw:1.00xh;0,0&resize=640:*",
  },
  {
    id: 6,
    name: "Homestyle Curry Rice",
    price: "$10.49",
    available: false,
    image: "https://via.placeholder.com/400x300?text=Curry+Rice",
  },
  {
    id: 7,
    name: "Herbed Pasta Mix",
    price: "$8.99",
    available: true,
    image: "https://via.placeholder.com/400x300?text=Herbed+Pasta",
  },
];

const FoodById = () => {
  const { id } = useParams();
  const food = recipes.find((item) => item.id === parseInt(id));
  const [rating, setRating] = useState(4);
  const [review, setReview] = useState("");

  if (!food) {
    return (
      <div className="container-width">
        <Typography variant="h6">Food not found</Typography>
      </div>
    );
  }

  return (
    <div className="container-width for-cart">
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          mt: 4,
        }}
      >
        {/* Left Side - 60% */}
        <Box sx={{ flex: "0 0 60%" }}>
          <img
            src={food.image}
            alt={food.name}
            style={{
              width: 300,
              height: 300,
              borderRadius: "10px",
              objectFit: "cover",
            }}
          />

          <Box mt={2}>
            <Typography variant="subtitle1" gutterBottom>
              Rating:
            </Typography>
            <Rating
              name="food-rating"
              value={rating}
              onChange={(e, newValue) => setRating(newValue)}
            />
          </Box>

          <Box mt={3}>
            <TextField
              label="Write a review"
              multiline
              rows={3}
              fullWidth
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            <Button
              variant="outlined"
              sx={{
                mt: 2,
                color: "#4f46e5",
                borderColor: "#4f46e5",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#eef2ff",
                },
              }}
            >
              Submit Review
            </Button>
          </Box>
        </Box>

        {/* Right Side - 40% */}
        <Box
          sx={{
            flex: "0 0 35%",
            backgroundColor: "#f9fafb",
            p: 4,
            borderRadius: 2,
            border: "1px solid #ddd",
            height: "fit-content",
          }}
        >
          <Typography variant="h5" fontWeight={600} gutterBottom>
            {food.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={1}>
            A delicious meal specially crafted for your cravings.
          </Typography>
          <Typography variant="h6" color="primary">
            {food.price}
          </Typography>
          <Typography
            variant="body2"
            color={food.available ? "green" : "error"}
            mt={1}
            mb={2}
          >
            {food.available ? "Available" : "Out of stock"}
          </Typography>

          <Button
            fullWidth
            variant="outlined"
            disabled={!food.available}
            sx={{
              color: "#4f46e5",
              borderColor: "#4f46e5",
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#eef2ff",
              },
            }}
          >
            Add to Cart
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default FoodById;
