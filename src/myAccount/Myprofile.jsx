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

const Myprofile = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const [editData, setEditData] = useState({
    name: "",
    email: "",
    password: "",
    retypePassword: "",
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (userInfo?._id && userInfo?.token) {
      axios
        .get(`http://localhost:4000/api/user/userbyid/${userInfo._id}`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        })
        .then((res) => {
          const data = res.data;
          setUser(data);
        })
        .catch((err) => {
          console.error("Failed to fetch user:", err);
          toast.error("Failed Update profile");
        });
    }
  }, [userInfo]);

  const handleOpenDialog = () => {
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
      const updatePayload = {
        name: editData.name,
        email: editData.email,
        ...(editData.password && { password: editData.password }),
      };

      const res = await axios.put(
        `http://localhost:4000/api/user/userbyid/${userInfo._id}`,
        updatePayload,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setUser(res.data);
      setOpen(false);
      toast.success("Update profile successful!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        My Profile
      </Typography>

      <ToastContainer position="top-right" autoClose={3000} />

      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          p: 3,
          maxWidth: 700,
        }}
      >
        <Avatar
          sx={{
            width: 120,
            height: 120,
            fontSize: 48,
            bgcolor: "#3f51b5",
            color: "#fff",
          }}
        >
          {user.name?.charAt(0).toUpperCase() || "U"}
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

      {/* Edit Dialog */}
      <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>Update Profile</DialogTitle>
        <DialogContent>
          <Box mt={2}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={editData.name}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={editData.email}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={editData.password}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Retype Password"
                  name="retypePassword"
                  type="password"
                  value={editData.retypePassword}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Box>
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

export default Myprofile;
