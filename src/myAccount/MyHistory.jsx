import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Chip,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const MyHistory = () => {
  const historyData = [
    {
      id: '001',
      foodItem: 'Chicken Biryani',
      shippingAddress: '123 Main St',
      paymentMethod: 'Cash',
      itemPrice: 250,
      totalPrice: 300,
      isDelivered: true,
      isPaid: true,
    },
    {
      id: '002',
      foodItem: 'Beef Burger',
      shippingAddress: '456 South Rd',
      paymentMethod: 'Card',
      itemPrice: 150,
      totalPrice: 180,
      isDelivered: false,
      isPaid: true,
    },
    {
      id: '003',
      foodItem: 'Veg Pizza',
      shippingAddress: '789 West Ave',
      paymentMethod: 'Online',
      itemPrice: 300,
      totalPrice: 320,
      isDelivered: true,
      isPaid: false,
    },
    {
      id: '004',
      foodItem: 'Grilled Sandwich',
      shippingAddress: '321 Park Blvd',
      paymentMethod: 'Cash',
      itemPrice: 120,
      totalPrice: 150,
      isDelivered: false,
      isPaid: false,
    },
    {
      id: '005',
      foodItem: 'Mutton Curry',
      shippingAddress: '654 Lake St',
      paymentMethod: 'Card',
      itemPrice: 400,
      totalPrice: 450,
      isDelivered: true,
      isPaid: true,
    },
  ];

  const paidOrders = historyData.filter(order => order.isPaid);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Paid Orders
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: '#e0f2fe' }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Food Item</TableCell>
              <TableCell>Shipping Address</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Item Price</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Is Delivered</TableCell>
              <TableCell>Is Paid</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paidOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.foodItem}</TableCell>
                <TableCell>{order.shippingAddress}</TableCell>
                <TableCell>{order.paymentMethod}</TableCell>
                <TableCell>{order.itemPrice}</TableCell>
                <TableCell>{order.totalPrice}</TableCell>
                <TableCell>
                  <Chip
                    label={order.isDelivered ? 'Delivered' : 'Pending'}
                    color={order.isDelivered ? 'success' : 'error'}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label="Paid"
                    color="success"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <IconButton color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MyHistory;
