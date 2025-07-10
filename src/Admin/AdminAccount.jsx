import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Avatar,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";

const AdminAccount = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const [user, setUser] = useState({
    name: "",
    email: "",
    image: "",
  });

  const [editData, setEditData] = useState({
    name: "",
    email: "",
    password: "",
    retypePassword: "",
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchAdminData = async () => {
      if (userInfo?._id && userInfo?.token) {
        try {
          const res = await axios.get(
            `http://localhost:3000/api/user/userbyid/${userInfo._id}`,
            {
              headers: {
                Authorization: `Bearer ${userInfo.token}`,
              },
            }
          );
          setUser(res.data);
        } catch (error) {
          console.error("Error fetching admin data:", error);
        }
      }
    };

    fetchAdminData();
  }, [userInfo]);

  const handleOpenDialog = () => {
    // Ensure values are editable by initializing them correctly
    setEditData({
      name: user.name || "",
      email: user.email || "",
      password: "",
      retypePassword: "",
    });
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    if (editData.password !== editData.retypePassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const payload = {
        name: editData.name,
        email: editData.email,
      };

      if (editData.password) {
        payload.password = editData.password;
      }

      const res = await axios.put(
        `http://localhost:3000/api/user/userbyid/${userInfo._id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setUser(res.data);
      setOpen(false);
      toast.success("Admin profile updated!");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Admin Profile
      </Typography>

      <ToastContainer position="top-right" autoClose={3000} />

      <Card sx={{ display: "flex", gap: 4, p: 3, maxWidth: 700 }}>
        <Avatar
          src={user.image}
          alt={user.name}
          sx={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            fontSize: 72,
            bgcolor: "#3f51b5",
            color: "#fff",
          }}
        >
          {!user.image && user.name?.charAt(0).toUpperCase()}
        </Avatar>

        <Box>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Name: {user.name}
            </Typography>
            <Typography variant="h6">Email: {user.email}</Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" onClick={handleOpenDialog}>
              Edit Profile
            </Button>
          </CardActions>
        </Box>
      </Card>

      <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>Update Profile</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                name="name"
                value={editData.name}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                value={editData.email}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                name="password"
                type="password"
                value={editData.password}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Retype Password"
                name="retypePassword"
                type="password"
                value={editData.retypePassword}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminAccount;
