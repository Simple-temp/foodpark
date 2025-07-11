import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cupons = () => {
  const [formData, setFormData] = useState({
    cupon: "",
    discount: "",
    vat: "",
    tax: "",
    deliveryCharge: "",
  });
  const [isExisting, setIsExisting] = useState(false);

  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/cupon");
        setFormData({
          cupon: data.cupon,
          discount: data.discount,
          vat: data.vat,
          tax: data.tax,
          deliveryCharge: data.deliveryCharge,
        });
        setIsExisting(true);
      } catch {
        setIsExisting(false);
      }
    };
    fetchCoupon();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3000/api/cupon";
      if (isExisting) {
        await axios.put(url, formData);
        toast.success("Coupon updated successfully!");
      } else {
        await axios.post(url, formData);
        toast.success("Coupon created successfully!");
      }
    } catch (err) {
      toast.error("Error saving coupon");
      console.log(err);
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold" color="primary">
          {isExisting ? "Update Coupon Settings" : "Create Coupon Settings"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Coupon Code"
            name="cupon"
            value={formData.cupon}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Discount (%)"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="VAT (%)"
            name="vat"
            value={formData.vat}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Tax (%)"
            name="tax"
            value={formData.tax}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Delivery Charge"
            name="deliveryCharge"
            value={formData.deliveryCharge}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            {isExisting ? "Update" : "Create"}
          </Button>
        </form>
        <ToastContainer />
      </Paper>
    </Box>
  );
};

export default Cupons;
