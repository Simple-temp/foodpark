import React, { useState } from "react";
import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import CopyrightIcon from "@mui/icons-material/Copyright";
import axios from "axios";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubscribe = async () => {
    setSuccess("");
    setError("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:4000/api/newsletter", {
        email,
      });
      setSuccess(res.data.message);
      setEmail("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Subscription failed. Try again later."
      );
    }
  };

  return (
    <Box
      textAlign="center"
      sx={{ backgroundColor: "#333", color: "white", py: 4 }}
    >
      <Typography variant="h5">Subscribe to our Newsletter</Typography>

      <Box mt={2} display="flex" justifyContent="center" alignItems="center">
        <TextField
          placeholder="Your Email"
          variant="outlined"
          size="small"
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
            mr: 1,
            width: "300px",
          }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSubscribe}>
          Subscribe
        </Button>
      </Box>

      {/* Success & Error messages */}
      <Box mt={2} maxWidth="400px" mx="auto">
        {success && <Alert severity="success">{success}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
      </Box>

      <Box mt={3} display="flex" justifyContent="center" alignItems="center">
        <CopyrightIcon fontSize="small" sx={{ mr: 1 }} />
        <Typography variant="body2">2025 All rights reserved</Typography>
      </Box>
    </Box>
  );
};

export default Footer;
