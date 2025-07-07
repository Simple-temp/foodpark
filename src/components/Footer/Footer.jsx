import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import CopyrightIcon from "@mui/icons-material/Copyright";

const Footer = () => {
  return (
    <Box textAlign="center" sx={{ backgroundColor: "#333", color: "white", py: 4 }}>
      <Typography variant="h5">Subscribe to our Newsletter</Typography>
      <Box mt={2}>
        <TextField placeholder="Your Email" variant="outlined" size="small" sx={{ backgroundColor: "white", borderRadius: 1, mr: 1 }} />
        <Button variant="contained" color="primary">Subscribe</Button>
      </Box>
      <Box mt={3} display="flex" justifyContent="center" alignItems="center">
        <CopyrightIcon fontSize="small" sx={{ mr: 1 }} />
        <Typography variant="body2">2025 All rights reserved</Typography>
      </Box>
    </Box>
  );
};

export default Footer;

