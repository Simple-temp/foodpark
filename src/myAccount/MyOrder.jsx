import { useState } from "react";
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

const MyOrder = () => {
  const [orders, setOrders] = useState([
    {
      id: "001",
      foodItem: "Chicken Biryani",
      shippingAddress: "123 Main St",
      paymentMethod: "Cash",
      itemPrice: 250,
      totalPrice: 300,
      isDelivered: true,
      isPaid: true,
    },
    {
      id: "002",
      foodItem: "Beef Burger",
      shippingAddress: "456 South Rd",
      paymentMethod: "Card",
      itemPrice: 150,
      totalPrice: 180,
      isDelivered: false,
      isPaid: true,
    },
    {
      id: "003",
      foodItem: "Veg Pizza",
      shippingAddress: "789 West Ave",
      paymentMethod: "Online",
      itemPrice: 300,
      totalPrice: 320,
      isDelivered: true,
      isPaid: false,
    },
    {
      id: "004",
      foodItem: "Grilled Sandwich",
      shippingAddress: "321 Park Blvd",
      paymentMethod: "Cash",
      itemPrice: 120,
      totalPrice: 150,
      isDelivered: false,
      isPaid: false,
    },
    {
      id: "005",
      foodItem: "Mutton Curry",
      shippingAddress: "654 Lake St",
      paymentMethod: "Card",
      itemPrice: 400,
      totalPrice: 450,
      isDelivered: true,
      isPaid: true,
    },
    {
      id: "006",
      foodItem: "Grilled Burger",
      shippingAddress: "321 Park Blvd",
      paymentMethod: "Cash",
      itemPrice: 120,
      totalPrice: 150,
      isDelivered: false,
      isPaid: false,
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenDetails = (order) => {
    setSelectedOrder(order);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedOrder(null);
  };

  const handleDelete = (orderId) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete order ID: ${orderId}?`
    );
    if (confirmed) {
      setOrders((prev) => prev.filter((order) => order.id !== orderId));
    }
  };

  return (
    <div>
      <Box>
        <Typography variant="h4" gutterBottom>
          Unpaid & Undelivered Orders
        </Typography>

        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead sx={{ backgroundColor: "#fef3c7" }}>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Food Item</TableCell>
                <TableCell>Shipping Address</TableCell>
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
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.foodItem}</TableCell>
                  <TableCell>{order.shippingAddress}</TableCell>
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
                        onClick={() => handleDelete(order.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              {orders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    No unpaid and undelivered orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Modal Popup */}
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
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h5">Order Details</Typography>
            <IconButton onClick={handleCloseModal}>
              <CloseIcon />
            </IconButton>
          </Box>

          {selectedOrder && (
            <Box display="flex" gap={4}>
              {/* Left Side (65%) */}
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
                        src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?cs=srgb&dl=pexels-ash-craig-122861-376464.jpg&fm=jpg"
                        alt="food"
                        style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8 }}
                      />
                      <Typography flex={1}>Demo Food {i + 1}</Typography>
                      <Typography>Qty: {i + 1}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Right Side (35%) */}
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
                    <Typography> 10</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography>Tax:</Typography>
                    <Typography> 15</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography>Delivery:</Typography>
                    <Typography> 20</Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box display="flex" justifyContent="space-between" fontWeight="bold">
                    <Typography>Total:</Typography>
                    <Typography> {selectedOrder.totalPrice + 10 + 15 + 20}</Typography>
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
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default MyOrder;


