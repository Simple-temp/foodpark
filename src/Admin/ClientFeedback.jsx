import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Avatar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const BASE_URL = "http://localhost:3000"; // Update as needed

const ClientFeedback = () => {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/review/all`);
      setReviews(data);
    } catch (err) {
      console.error("Failed to load reviews", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await axios.delete(`${BASE_URL}/api/review/${id}`);
      fetchReviews(); // Refresh after deletion
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom className="header-title-color">
        All Client Reviews
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User Name</TableCell>
            <TableCell>Food Image</TableCell>
            <TableCell>Food Name</TableCell>
            <TableCell>Message</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviews.map((r) => (
            <TableRow key={r._id}>
              <TableCell>{r.name}</TableCell>
              <TableCell>
                <Avatar
                  src={
                    r.foodid?.img?.startsWith("http")
                      ? r.foodid.img
                      : `${BASE_URL}${r.foodid.img}`
                  }
                  alt={r.foodid?.name}
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                  }}
                />
              </TableCell>
              <TableCell>{r.foodid?.name || "N/A"}</TableCell>
              <TableCell>{r.message}</TableCell>
              <TableCell>
                {new Date(r.createdAt).toLocaleString("en-US")}
              </TableCell>
              <TableCell>
                <IconButton color="error" onClick={() => handleDelete(r._id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ClientFeedback;
