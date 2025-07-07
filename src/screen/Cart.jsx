import React, { useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Box, Typography, IconButton, Button, Divider, TextField } from "@mui/material";
import { Link } from "react-router-dom";

const Cart = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Chicken Biryani",
      price: 250,
      quantity: 1,
      image:
        "https://www.cubesnjuliennes.com/wp-content/uploads/2020/07/Chicken-Biryani-Recipe.jpg",
    },
    {
      id: 2,
      name: "Beef Burger",
      price: 180,
      quantity: 2,
      image:
        "https://www.andy-cooks.com/cdn/shop/articles/20240831035110-andy-20cooks-20-20juicy-20beef-20burger-20recipe.jpg?v=1725428158",
    },
  ]);

  const handleIncrease = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const vat = 10;
  const tax = 15;
  const delivery = 20;
  const total = subtotal + vat + tax + delivery;

  return (
    <div className="container-width">
      <Box sx={{ p: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
          }}
        >
          {/* Left Side */}
          <Box sx={{ flex: "0 0 65%" }}>
            <Typography variant="h5" gutterBottom>
              Your Cart
            </Typography>

            {items.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  border: "1px solid #eee",
                  borderRadius: 2,
                  p: 2,
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: "cover",
                    borderRadius: 8,
                    marginRight: 16,
                  }}
                />
                <Box flex={1}>
                  <Typography fontWeight="bold">{item.name}</Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <IconButton onClick={() => handleDecrease(item.id)}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography px={1}>{item.quantity}</Typography>
                  <IconButton onClick={() => handleIncrease(item.id)}>
                    <AddIcon />
                  </IconButton>
                </Box>
                <Typography width={100} textAlign="right">
                  {item.price * item.quantity}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Right Side */}
          <Box
            sx={{
              flex: "0 0 30%",
              backgroundColor: "#f9fafb",
              borderRadius: 2,
              p: 3,
              height: "fit-content",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Summary
            </Typography>

            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Subtotal:</Typography>
              <Typography> {subtotal}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>VAT:</Typography>
              <Typography> {vat}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Tax:</Typography>
              <Typography> {tax}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography>Delivery:</Typography>
              <Typography> {delivery}</Typography>
            </Box>
            {/* Coupon Input and Button */}
            <Box display="flex" gap={1} mb={2}>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Enter coupon"
                sx={{ flex: 1 }}
              />
              <Button
                variant="outlined"
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
                Apply Coupon
              </Button>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box
              display="flex"
              justifyContent="space-between"
              fontWeight="bold"
            >
              <Typography>Total:</Typography>
              <Typography> {total}</Typography>
            </Box>

            <Link to="/shippingaddressandpayment">
              <Button
                fullWidth
                variant="outlined"
                sx={{
                  mt: 3,
                  borderColor: "#6366f1",
                  color: "#6366f1",
                  fontWeight: "bold",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#eef2ff",
                    borderColor: "#4f46e5",
                  },
                }}
              >
                Next
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Cart;
