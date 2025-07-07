import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
  Divider,
} from "@mui/material";

const ShippingAddressAndPayment = () => {
  const [stripeChecked, setStripeChecked] = useState(false);

  const handleOrder = () => {
    alert("Order placed successfully!");
  };

  return (
    <div>
      <div className="container-width">
        <Box sx={{ p: 4 }}>
          <Box
            sx={{
              display: "flex",
              gap: 4,
              flexWrap: "wrap",
            }}
          >
            {/* Left Side - 60% */}
            <Box
              sx={{
                flex: "0 0 60%",
                backgroundColor: "#f9fafb",
                p: 4,
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Shipping Address
              </Typography>

              <Divider sx={{ mb: 3 }} />

              <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column", gap: 3 }}
              >
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Full Address
                  </Typography>
                  <TextField
                    placeholder="Enter your address"
                    variant="outlined"
                    fullWidth
                  />
                </Box>

                <Box display="flex" gap={2}>
                  <Box flex={1}>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Post Code
                    </Typography>
                    <TextField placeholder="e.g. 1207" fullWidth />
                  </Box>
                  <Box flex={1}>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Road No.
                    </Typography>
                    <TextField placeholder="e.g. 5A" fullWidth />
                  </Box>
                  <Box flex={1}>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      House No.
                    </Typography>
                    <TextField placeholder="e.g. 34" fullWidth />
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Right Side - 35% */}
            <Box
              sx={{
                flex: "0 0 35%",
                backgroundColor: "#f9fafb",
                borderRadius: 2,
                p: 3,
                border: "1px solid #ccc",
                height: "fit-content",
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Payment Method
              </Typography>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={stripeChecked}
                    onChange={(e) => setStripeChecked(e.target.checked)}
                    sx={{
                      color: "#4f46e5",
                      "&.Mui-checked": {
                        color: "#4f46e5",
                      },
                    }}
                  />
                }
                label="Pay with Stripe"
                sx={{
                  mb: 3,
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  p: 2,
                  backgroundColor: "transparent",
                }}
              />

              <Button
                fullWidth
                variant="outlined"
                onClick={handleOrder}
                sx={{
                  color: "#4f46e5",
                  borderColor: "#4f46e5",
                  fontWeight: "bold",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#eef2ff",
                    borderColor: "#4f46e5",
                  },
                }}
              >
                Order Now
              </Button>
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default ShippingAddressAndPayment;
