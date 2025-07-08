import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button, TextField, Rating } from "@mui/material";
import { useDispatch } from "react-redux";

const recipes = [
  {
    id: 1,
    name: "Cheesy Chili Mac",
    img: "https://hips.hearstapps.com/hmg-prod/images/easy-dinner-recipes-chili-mac-and-cheese-6721330c2edff.jpg?crop=1xw:1xh;center,top&resize=980:*",
    quantity: 1,
    price: 12.99,
    des: "Delicious Cheesy Chili Mac prepared with love.",
    rating: 4.5,
    review: 120,
    stock: 10,
    available: true,
  },
  {
    id: 2,
    name: "Vibrant Veggie Bowl",
    img: "https://cdn.loveandlemons.com/wp-content/uploads/2019/09/dinner-ideas-2.jpg",
    quantity: 1,
    price: 10.99,
    des: "Delicious Vibrant Veggie Bowl prepared with love.",
    rating: 4.2,
    review: 89,
    stock: 0, // unavailable
    available: true,
  },
  {
    id: 3,
    name: "Buzzfeed Dinner Special",
    img: "https://img.buzzfeed.com/buzzfeed-static/static/2022-03/5/0/asset/6201713e5c7e/sub-buzz-1009-1646440684-8.jpg?downsize=900:*&output-format=auto&output-quality=auto",
    quantity: 1,
    price: 11.49,
    des: "Delicious Buzzfeed Dinner Special prepared with love.",
    rating: 4.7,
    review: 150,
    stock: 8,
    available: true,
  },
  {
    id: 4,
    name: "Classic Beef & Broccoli",
    img: "https://www.simplyrecipes.com/thmb/kTh0yVR2KrJFnGQPNGe1UYIG1t8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Ground-Beef-Broccoli-LEAD-6-faafd703b949408ba35b3199cd5a22e9.jpg",
    quantity: 1,
    price: 13.99,
    des: "Delicious Classic Beef & Broccoli prepared with love.",
    rating: 4.6,
    review: 95,
    stock: 12,
    available: true,
  },
  {
    id: 5,
    name: "Easy Chicken Delight",
    img: "https://hips.hearstapps.com/hmg-prod/images/easy-dinner-recipes-677efe8559104.png?crop=1.00xw:1.00xh;0,0&resize=640:*",
    quantity: 1,
    price: 9.99,
    des: "Delicious Easy Chicken Delight prepared with love.",
    rating: 4.3,
    review: 70,
    stock: 9,
    available: true,
  },
  {
    id: 6,
    name: "Homestyle Curry Rice",
    img: "https://via.placeholder.com/400x300?text=Curry+Rice",
    quantity: 1,
    price: 10.49,
    des: "Delicious Homestyle Curry Rice prepared with love.",
    rating: 4.1,
    review: 60,
    stock: 0, // unavailable
    available: true,
  },
  {
    id: 7,
    name: "Herbed Pasta Mix",
    img: "https://via.placeholder.com/400x300?text=Herbed+Pasta",
    quantity: 1,
    price: 8.99,
    des: "Delicious Herbed Pasta Mix prepared with love.",
    rating: 4.4,
    review: 78,
    stock: 11,
    available: true,
  },
];

const FoodById = () => {
  const { id } = useParams();
  const food = recipes.find((item) => item.id === parseInt(id));
  const [rating, setRating] = useState(4);
  const [review, setReview] = useState("");
  const dispatch = useDispatch();

const handleAddToCart = () => {
  const cartItem = {
    ...food,
  };
  dispatch({ type: "ADD_TO_CART", payload: cartItem });
};

  if (!food) {
    return (
      <div className="container-width">
        <Typography variant="h6">Food not found</Typography>
      </div>
    );
  }

  return (
    <div className="container-width for-cart">
      <Box display="flex" flexWrap="wrap" gap={4} mt={4}>
        {/* Left Side */}
        <Box flex="0 0 60%">
          <img
            src={food.img}
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

        {/* Right Side */}
        <Box
          flex="0 0 35%"
          bgcolor="#f9fafb"
          p={4}
          borderRadius={2}
          border="1px solid #ddd"
          height="fit-content"
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
            onClick={handleAddToCart}
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
