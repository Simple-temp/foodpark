import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography, Divider, Button, Chip } from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../../StripeCheckout"; // your new component

const stripePromise = loadStripe(
  "pk_test_51Rj2rD4SL7UU1QZPGxMD5bprm3f8tZlxK6TVEIhXAP7fDxn47X8CV4sQtBLyXaeYo7rIEsx53e3i66KlQ6YRxagM00JHRRsvO2"
);

const BASE_URL = "http://localhost:3000";

const OrderDetailsById = () => {
  const { id } = useParams(); // get ID from URL
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderById = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const token = userInfo?.token;

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          `http://localhost:3000/api/order/orderbyid/${id}`,
          config
        );

        setSelectedOrder(response.data);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderById();
  }, [id]);

  if (loading) {
    return (
      <Box p={4}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (!selectedOrder) {
    return (
      <Box p={4}>
        <Typography variant="h6" color="error">
          Order not found!
        </Typography>
      </Box>
    );
  }

  const {
    isDelivered,
    isPaid,
    paymentMethod,
    shippingAddress,
    totalPrice,
    foodItem,
  } = selectedOrder;

  return (
    <div className="container-width inner-order-details">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">Order Details</Typography>
      </Box>

      <Box display="flex" gap={4} flexWrap="wrap">
        {/* Left Side */}
        <Box flex={2} minWidth={300}>
          <Typography variant="h6">Order ID: {id}</Typography>
          <Typography>
            Delivery Status:{" "}
            <Chip
              label={isDelivered ? "Delivered" : "Pending"}
              color={isDelivered ? "success" : "error"}
              size="small"
            />
          </Typography>
          <Typography>
            Payment Status:{" "}
            <Chip
              label={isPaid ? "Paid" : "Unpaid"}
              color={isPaid ? "success" : "error"}
              size="small"
            />
          </Typography>
          <Typography>Payment Method: {paymentMethod}</Typography>
          <Typography>
            Shipping Address: {shippingAddress?.address}, Road No:{" "}
            {shippingAddress?.roadNo}, House No: {shippingAddress?.houseNo},
            Postal Code: {shippingAddress?.postalCode}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            Food Items
          </Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            {foodItem.map((item, i) => (
              <Box
                key={i}
                display="flex"
                alignItems="center"
                gap={2}
                borderBottom="1px solid #ccc"
                pb={1}
                sx={{ px: 1 }}
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
                  }}
                />
                <Box flex={1}>
                  <Typography fontWeight="bold">{item.name}</Typography>
                  <Typography variant="body2">Qty: {item.quantity}</Typography>
                  <Typography variant="body2">Price: ${item.price}</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    Total: ${item.price * item.quantity}
                  </Typography>
                </Box>
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
            height: "fit-content",
            minWidth: 280,
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
              <Typography>VAT:</Typography>
              <Typography>10</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Tax:</Typography>
              <Typography>15</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Delivery:</Typography>
              <Typography>20</Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box
              display="flex"
              justifyContent="space-between"
              fontWeight="bold"
            >
              <Typography>Total:</Typography>
              <Typography>{totalPrice + 10 + 15 + 20}</Typography>
            </Box>
          </Box>

          {/* <Box mt={4}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<PaymentIcon />}
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
              Pay with Stripe
            </Button>
          </Box> */}
          <Box mt={4}>
            {isPaid ? (
              <Chip label="Paid with Stripe" color="success" />
            ) : (
              <Elements stripe={stripePromise}>
                <StripeCheckout
                  amount={totalPrice}
                  orderId={id}
                  onSuccess={() => window.location.reload()}
                />
              </Elements>
            )}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default OrderDetailsById;
