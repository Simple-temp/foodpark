import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  IconButton,
  Alert,
  CircularProgress,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import axios from "axios";

const ContactSection = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:4000/api/messages", form);
      setSuccess(res.data.message || "Message sent successfully!");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setError("Failed to send message. Try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box px={2} py={6}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" gutterBottom className="header-title-color">
          Contact Us
        </Typography>
        <Typography variant="body1">We'd love to hear from you!</Typography>
      </Box>

      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="flex-start"
      >
        {/* Contact Form - 65% */}
        <Grid item xs={12} md={7} lg={7}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            {success && (
              <Alert severity="success" sx={{ width: 800, mb: 2 }}>
                {success}
              </Alert>
            )}
            {error && (
              <Alert severity="error" sx={{ width: 800, mb: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              sx={{ width: 800, mb: 2 }}
              required
            />
            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              sx={{ width: 800, mb: 2 }}
              required
            />
            <TextField
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              sx={{ width: 800, mb: 2 }}
            />
            <TextField
              label="Message"
              name="message"
              value={form.message}
              onChange={handleChange}
              multiline
              rows={4}
              sx={{ width: 800, mb: 2 }}
              required
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
              sx={{ width: 800, mb: 2 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Submit"
              )}
            </Button>

            <Box mt={3}>
              <IconButton color="primary">
                <FacebookIcon />
              </IconButton>
              <IconButton color="primary">
                <TwitterIcon />
              </IconButton>
              <IconButton color="primary">
                <InstagramIcon />
              </IconButton>
            </Box>
          </Box>
        </Grid>

        {/* Map - 35% */}
        <Grid item xs={12} md={5} lg={4}>
          <Box
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: 2,
              width: "100%",
              height: 400,
            }}
          >
            <iframe
              title="Map"
              src="https://maps.google.com/maps?q=New+York&t=&z=13&ie=UTF8&iwloc=&output=embed"
              style={{ width: "100%", height: "100%", border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactSection;
