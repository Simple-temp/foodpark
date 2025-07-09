import React from "react";
import { Box, Typography, Divider, Button, Paper } from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OrderDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const fooditems = useSelector((state) => state.cartState.cart.fooditem || []);
  const shippingaddress = useSelector(
    (state) => state.cartState.cart.shippingAddress || {}
  );
  const paymentmethod = useSelector(
    (state) => state.cartState.cart.paymentMethod || ""
  );

  const subtotal = fooditems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const VAT = 10;
  const TAX = 15;
  const DELIVERY = 20;
  const total = subtotal + VAT + TAX + DELIVERY;

  if (!fooditems.length) {
    return (
      <Box p={4}>
        <Typography variant="h6" color="error">
          Order not found!
        </Typography>
      </Box>
    );
  }

  return (
    <div className="container-width inner-order-details">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5" fontWeight="bold">
          Order Details
        </Typography>
      </Box>

      <Box display="flex" gap={4} flexWrap="wrap">
        {/* Left Side */}
        <Box flex={2} minWidth={300}>
          <Paper
            elevation={3}
            sx={{ p: 3, borderRadius: 2, backgroundColor: "transparent" }}
          >
            <Typography variant="h6" gutterBottom>
              Customer Details
            </Typography>
            <Typography>Name: {userInfo.name || "N/A"}</Typography>
            <Typography>Email: {userInfo.email || "N/A"}</Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
              Shipping Address
            </Typography>
            <Typography>Address: {shippingaddress.address || "N/A"}</Typography>
            <Typography>Road No: {shippingaddress.roadNo || "N/A"}</Typography>
            <Typography>
              House No: {shippingaddress.houseNo || "N/A"}
            </Typography>
            <Typography>
              Post Code: {shippingaddress.postCode || "N/A"}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
              Payment Method
            </Typography>
            <Typography>{paymentmethod || "N/A"}</Typography>
          </Paper>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Food Items
          </Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            {fooditems.map((item, index) => (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                gap={2}
                borderBottom="1px solid #ccc"
                pb={1}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
                <Typography flex={1}>{item.name}</Typography>
                <Typography>Qty: {item.quantity}</Typography>
                <Typography> {item.price * item.quantity}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Right Side */}
        <Box
          flex={1}
          sx={{
            backgroundColor: "#f9fafb",
            borderRadius: 2,
            p: 3,
            minWidth: 280,
            height: "fit-content",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h6" gutterBottom>
              Payment Summary
            </Typography>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Subtotal:</Typography>
              <Typography>{subtotal}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>VAT:</Typography>
              <Typography>{VAT}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Tax:</Typography>
              <Typography> {TAX}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Delivery:</Typography>
              <Typography> {DELIVERY}</Typography>
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
          </Box>

          <Box mt={4}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<PaymentIcon />}
              onClick={async () => {
                try {
                  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
                  const token = userInfo?.token;

                  const config = {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  };

                  const orderData = {
                    foodItem: fooditems,
                    shippingAddress: {
                      address: shippingaddress.address,
                      postCode: shippingaddress.postCode,
                      roadNo: shippingaddress.roadNo,
                      houseNo: shippingaddress.houseNo,
                    },
                    paymentMethod: paymentmethod,
                    itemPrice: subtotal,
                    totalPrice: total,
                  };

                  const response = await axios.post(
                    "http://localhost:3000/api/order/neworder",
                    orderData,
                    config
                  );

                  const orderId = response.data._id;

                  // Clear fooditems from Redux and localStorage
                  dispatch({ type: "CLEAR_FOODITEM" });
                  localStorage.removeItem("cart");

                  // Redirect to dynamic route
                  navigate(`/orderdetailsbyid/${orderId}`);
                } catch (error) {
                  console.error("Order creation failed:", error);
                  alert("Failed to create order");
                }
              }}
              sx={{
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
              Continue
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default OrderDetails;
