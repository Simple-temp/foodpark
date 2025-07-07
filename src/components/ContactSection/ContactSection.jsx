import React from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const ContactSection = () => {
  return (
    <div className="earch-container">
      <Box px={2} py={4}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" gutterBottom className="header-title-color" >
            Contact Us
          </Typography>
          <Typography variant="body1">
            We'd love to hear from you!
          </Typography>
        </Box>

        <Grid container spacing={4} alignItems="flex-start">
          {/* Left Side: Form - 65% */}
          <Grid item xs={12} md={8}>
            <Box component="form">
              <TextField label="Name" fullWidth margin="normal" />
              <TextField label="Email" fullWidth margin="normal" />
              <TextField
                label="Message"
                fullWidth
                margin="normal"
                multiline
                rows={4}
              />
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Submit
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

          {/* Right Side: Map - 35% */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: 2,
              }}
            >
              <iframe
                title="Map"
                src="https://maps.google.com/maps?q=New+York&t=&z=13&ie=UTF8&iwloc=&output=embed"
                style={{
                  width: 400,
                  height: 300,
                  border: 0,
                }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default ContactSection;
