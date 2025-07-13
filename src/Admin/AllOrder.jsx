import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Button,
  Chip,
  IconButton,
  Modal,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import PaymentIcon from "@mui/icons-material/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../../StripeCheckout";

const BASE_URL = "http://localhost:3000";

const AllOrder = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = userInfo?.token;

      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/order/getorders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleOpenDetails = async (order) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;

    try {
      const response = await axios.get(
        `http://localhost:4000/api/order/orderbyid/${order._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSelectedOrder(response.data);
      setOpenModal(true);
    } catch (err) {
      console.error("Failed to fetch order details:", err);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedOrder(null);
  };

  const handleDelete = async (orderId) => {
    const confirmDelete = window.confirm("Are you sure to delete this order?");
    if (!confirmDelete) return;

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;

    try {
      await axios.delete(
        `http://localhost:4000/api/order/deleteorder/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders((prev) => prev.filter((o) => o._id !== orderId));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div>
      <Box>
        <Typography variant="h4" gutterBottom>
          All Orders
        </Typography>

        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead sx={{ backgroundColor: "#fef3c7" }}>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Payment</TableCell>
                <TableCell>Item Price</TableCell>
                <TableCell>Total Price</TableCell>
                <TableCell>Delivered</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id.slice(-6)}</TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })}
                  </TableCell>
                  <TableCell>{order.paymentMethod}</TableCell>
                  <TableCell>{order.itemPrice}</TableCell>
                  <TableCell>{order.totalPrice}</TableCell>
                  <TableCell>
                    <Chip
                      label={order.isDelivered ? "Delivered" : "Pending"}
                      color={order.isDelivered ? "success" : "error"}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={order.isPaid ? "Paid" : "Unpaid"}
                      color={order.isPaid ? "success" : "error"}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Box display="flex" gap={1} justifyContent="center">
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleOpenDetails(order)}
                      >
                        See Details
                      </Button>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(order._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              {orders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Modal (same as before) */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            width: "1100px",
            height: "650px",
            backgroundColor: "#fff",
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            overflowY: "auto",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h5">Order Details</Typography>
            <IconButton onClick={handleCloseModal}>
              <CloseIcon />
            </IconButton>
          </Box>

          {selectedOrder ? (
            <Box display="flex" gap={4} flexWrap="wrap">
              {/* LEFT SIDE */}
              <Box flex={2} minWidth={300}>
                <Typography variant="h6">
                  Order ID: {selectedOrder._id}
                </Typography>
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
                <Typography>
                  Payment Method: {selectedOrder.paymentMethod}
                </Typography>
                <Typography>
                  Shipping Address: {selectedOrder.shippingAddress?.address},
                  Road No: {selectedOrder.shippingAddress?.roadNo}, House No:{" "}
                  {selectedOrder.shippingAddress?.houseNo}, Postal Code:{" "}
                  {selectedOrder.shippingAddress?.postalCode}
                </Typography>

                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Food Items
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  {selectedOrder.foodItem?.map((item, i) => (
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
                        <Typography variant="body2">
                          Qty: {item.quantity}
                        </Typography>
                        <Typography variant="body2">
                          Price: ${item.price}
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                          Total: ${item.price * item.quantity}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* RIGHT SIDE */}
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
                  <Box display="flex" justifyContent="space-between">
                    <Typography>Total:</Typography>
                    <Typography>
                      {selectedOrder.totalPrice + 10 + 15 + 20}
                    </Typography>
                  </Box>
                </Box>

                <Box mt={4}>
                  {selectedOrder.isPaid ? (
                    <Chip label="Paid with Stripe" color="success" />
                  ) : (
                    <Elements
                      stripe={loadStripe(
                        "pk_test_51Rj2rD4SL7UU1QZPGxMD5bprm3f8tZlxK6TVEIhXAP7fDxn47X8CV4sQtBLyXaeYo7rIEsx53e3i66KlQ6YRxagM00JHRRsvO2"
                      )}
                    >
                      <StripeCheckout
                        amount={selectedOrder.totalPrice}
                        orderId={selectedOrder._id}
                        onSuccess={() => window.location.reload()}
                      />
                    </Elements>
                  )}
                </Box>
              </Box>
            </Box>
          ) : (
            <Typography>Loading...</Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default AllOrder;
