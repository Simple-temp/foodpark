import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  TextField,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Link } from "react-router-dom";

const BASE_URL = "http://localhost:3000";

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cartState.cart.fooditem || []);

  const [couponInput, setCouponInput] = useState("");
  const [couponData, setCouponData] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  // Fetch coupon data from backend
  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/cupon");
        setCouponData(data);
      } catch (error) {
        console.error("Coupon not found");
        console.log(error);
      }
    };
    fetchCoupon();
  }, []);

  const handleIncrease = (index) => {
    dispatch({ type: "INCREASE", payload: index });
  };

  const handleDecrease = (index) => {
    dispatch({ type: "DECREASE", payload: index });
  };

  const handleRemove = (index) => {
    dispatch({ type: "REMOVE_CART_ITEM", payload: index });
  };

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const vat = couponData ? (subtotal * couponData.vat) / 100 : 0;
  const tax = couponData ? (subtotal * couponData.tax) / 100 : 0;
  const delivery = couponData ? parseFloat(couponData.deliveryCharge || 0) : 0;

  const handleApplyCoupon = () => {
    if (
      couponData &&
      couponInput.trim().toLowerCase() === couponData.cupon.toLowerCase()
    ) {
      const discount = (subtotal * couponData.discount) / 100;
      setDiscountAmount(discount);
      setCouponApplied(true);
    } else {
      alert("Invalid or expired coupon code");
      setDiscountAmount(0);
      setCouponApplied(false);
    }
  };

  const total = (subtotal + vat + tax + delivery - discountAmount).toFixed(2);

  return (
    <div className="container-width">
      <Box sx={{ p: 4 }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {/* Cart Items */}
          <Box sx={{ flex: "0 0 65%" }}>
            <Typography variant="h5" gutterBottom>
              Your Cart
            </Typography>

            {items.length === 0 ? (
              <Typography>No items in the cart.</Typography>
            ) : (
              items.map((item, index) => (
                <Box
                  key={index}
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
                    src={
                      item.img?.startsWith("http")
                        ? item.img
                        : `${BASE_URL}${item.img}`
                    }
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
                    <Typography color="text.secondary">{item.price}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <IconButton onClick={() => handleDecrease(index)}>
                      <RemoveIcon />
                    </IconButton>
                    <Typography px={1}>{item.quantity}</Typography>
                    <IconButton onClick={() => handleIncrease(index)}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                  <Typography width={100} textAlign="right" fontWeight="bold">
                    {item.price * item.quantity}
                  </Typography>
                  <IconButton
                    onClick={() => handleRemove(index)}
                    sx={{ ml: 1 }}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </Box>
              ))
            )}
          </Box>

          {/* Cart Summary */}
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
              <Typography>{subtotal.toFixed(2)}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>VAT ({couponData?.vat || 0}%):</Typography>
              <Typography>{vat.toFixed(2)}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Tax ({couponData?.tax || 0}%):</Typography>
              <Typography>{tax.toFixed(2)}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Delivery:</Typography>
              <Typography>{delivery.toFixed(2)}</Typography>
            </Box>

            {/* Coupon Field */}
            <Box display="flex" gap={1} mb={1}>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Enter coupon"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                sx={{ flex: 1 }}
              />
              <Button
                onClick={handleApplyCoupon}
                disabled={couponApplied}
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
                {couponApplied ? "Applied" : "Apply"}
              </Button>
            </Box>

            {discountAmount > 0 && (
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Discount ({couponData?.discount}%):</Typography>
                <Typography color="green">
                  - {discountAmount.toFixed(2)}
                </Typography>
              </Box>
            )}

            <Divider sx={{ my: 1 }} />

            <Box
              display="flex"
              justifyContent="space-between"
              fontWeight="bold"
            >
              <Typography>Total:</Typography>
              <Typography>{total}</Typography>
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
