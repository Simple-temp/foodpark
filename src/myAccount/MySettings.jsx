import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";

const MySettings = () => {
  const [reason, setReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};

  const reasons = [
    "Privacy concerns",
    "Found a better service",
    "Too many emails",
    "Technical issues",
    "Other",
  ];

  const handleReasonChange = (event) => {
    setReason(event.target.value);
    if (event.target.value !== "Other") {
      setOtherReason("");
    }
  };

  const handleDelete = async () => {
    const finalReason = reason === "Other" ? otherReason : reason;

    if (!finalReason) {
      toast.error("Please select or enter a reason for account deletion.");
      return;
    }

    try {
      // Step 1: Get user orders
      const orderRes = await axios.get(
        "http://localhost:3000/api/order/getorders/my",
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      if (orderRes.data.length > 0) {
        toast.error("You must delete all your orders before deleting your account.");
        return;
      }

      // Step 2: Delete account
      const deleteRes = await axios.delete(
        `http://localhost:3000/api/user/userbyid/${userInfo._id}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      if (deleteRes.status === 200) {
        localStorage.removeItem("userInfo");
        alert("Account deleted successfully.");
        window.location.href = "/"; // redirect to home
      } else {
        alert("Failed to delete account.");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("An error occurred while deleting the account.");
    }
  };

  return (
    <Box p={4} maxWidth={600} mx="auto">
      <Typography variant="h4" gutterBottom>
        Account Deletion
      </Typography>

       <ToastContainer position="top-right" autoClose={3000} />

      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="body1" mb={2}>
          Please tell us why you want to delete your account:
        </Typography>

        <RadioGroup value={reason} onChange={handleReasonChange}>
          {reasons.map((r) => (
            <FormControlLabel key={r} value={r} control={<Radio />} label={r} />
          ))}
        </RadioGroup>

        {reason === "Other" && (
          <TextField
            fullWidth
            label="Please specify"
            value={otherReason}
            onChange={(e) => setOtherReason(e.target.value)}
            margin="normal"
          />
        )}

        <Box mt={4}>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            fullWidth
            size="large"
          >
            Delete Account
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default MySettings;
