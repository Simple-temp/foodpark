import React, { useEffect, useState } from "react";
import axios from "axios";
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
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const MyHistory = () => {
  const [paidOrders, setPaidOrders] = useState([]);

  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};

  useEffect(() => {
    const fetchPaidOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/order/getorders/my",
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        const allOrders = res.data;
        const filtered = allOrders.filter((order) => order.isPaid);
        setPaidOrders(filtered);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        alert("Error fetching order history.");
      }
    };

    fetchPaidOrders();
  }, [userInfo.token]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Paid Orders
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: "#e0f2fe" }}>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Item Price</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Delivered</TableCell>
              <TableCell>Paid</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paidOrders.map((order) => (
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
                    color={order.isDelivered ? "success" : "warning"}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Chip label="Paid" color="success" variant="outlined" />
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
