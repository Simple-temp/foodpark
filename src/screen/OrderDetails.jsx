import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Divider,
  Button,
  Chip,
} from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";

// Dummy Orders
const dummyOrders = [
  {
    id: "1",
    isDelivered: false,
    isPaid: false,
    paymentMethod: "Stripe",
    shippingAddress: "123 Main Street, City",
    totalPrice: 200,
  },
  {
    id: "2",
    isDelivered: false,
    isPaid: false,
    paymentMethod: "Cash on Delivery",
    shippingAddress: "456 Side Street, City",
    totalPrice: 150,
  },
];

const OrderDetails = () => {
  const { id } = useParams(); // get ID from URL
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const foundOrder = dummyOrders.find((order) => order.id === id);
    setSelectedOrder(foundOrder);
  }, [id]);

  if (!selectedOrder) {
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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Order Details</Typography>
      </Box>

      <Box display="flex" gap={4}>
        {/* Left Side */}
        <Box flex={2}>
          <Typography variant="h6">Order ID: {selectedOrder.id}</Typography>
          <Typography>
            Delivery Status:{" "}
            <Chip
              label={selectedOrder.isDelivered ? "Delivered" : "Pending"}
              color={selectedOrder.isDelivered ? "success" : "error"}
              size="small"
            />
          </Typography>
          <Typography>
            Payment Status:{" "}
            <Chip
              label={selectedOrder.isPaid ? "Paid" : "Unpaid"}
              color={selectedOrder.isPaid ? "success" : "error"}
              size="small"
            />
          </Typography>
          <Typography>Payment Method: {selectedOrder.paymentMethod}</Typography>
          <Typography>Shipping Address: {selectedOrder.shippingAddress}</Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            Food Items
          </Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            {[1, 2, 3].map((_, i) => (
              <Box
                key={i}
                display="flex"
                alignItems="center"
                gap={2}
                borderBottom="1px solid #ccc"
                pb={1}
              >
                <img
                  src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg"
                  alt="food"
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
                <Typography flex={1}>Demo Food {i + 1}</Typography>
                <Typography>Qty: {i + 1}</Typography>
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
            <Box display="flex" justifyContent="space-between" fontWeight="bold">
              <Typography>Total:</Typography>
              <Typography>{selectedOrder.totalPrice + 10 + 15 + 20}</Typography>
            </Box>
          </Box>

          <Box mt={4}>
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
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default OrderDetails;
