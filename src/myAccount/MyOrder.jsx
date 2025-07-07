import React, { useState } from 'react';
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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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
      foodItem: "Grilled Buger",
      shippingAddress: "321 Park Blvd",
      paymentMethod: "Cash",
      itemPrice: 120,
      totalPrice: 150,
      isDelivered: false,
      isPaid: false,
    },
  ]);

  // Filter for unpaid & undelivered only
  const filteredOrders = orders.filter(order => !order.isPaid && !order.isDelivered);

  const handleSeeDetails = (orderId) => {
    alert(`Viewing details for order ID: ${orderId}`);
  };

  const handleDelete = (orderId) => {
    const confirmed = window.confirm(`Are you sure you want to delete order ID: ${orderId}?`);
    if (confirmed) {
      setOrders(prev => prev.filter(order => order.id !== orderId));
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Unpaid & Undelivered Orders
      </Typography>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: '#fef3c7' }}>
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
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.foodItem}</TableCell>
                <TableCell>{order.shippingAddress}</TableCell>
                <TableCell>{order.paymentMethod}</TableCell>
                <TableCell>{order.itemPrice}</TableCell>
                <TableCell>{order.totalPrice}</TableCell>
                <TableCell>
                  <Chip
                    label="Pending"
                    color="error"
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label="Unpaid"
                    color="error"
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <Box display="flex" gap={1} justifyContent="center">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleSeeDetails(order.id)}
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
            {filteredOrders.length === 0 && (
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
  );
};

export default MyOrder;
