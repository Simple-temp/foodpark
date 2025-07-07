import React, { useState } from 'react';
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
} from '@mui/material';

const AdminAccount = () => {
 const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    image: 'https://i.pravatar.cc/200?img=3',
  });

  const [editData, setEditData] = useState({
    name: user.name,
    email: user.email,
    password: '',
    retypePassword: '',
  });

  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setEditData({ ...user, password: '', retypePassword: '' });
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    if (editData.password !== editData.retypePassword) {
      alert('Passwords do not match');
      return;
    }
    setUser({ ...user, name: editData.name, email: editData.email });
    setOpen(false);
    alert('Profile updated!');
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        My Profile
      </Typography>

      <Card sx={{ display: 'flex', alignItems: 'flex-start', gap: 4, p: 3, maxWidth: 700 }}>
        {/* Profile Image */}
        <Avatar
          src={user.image}
          alt={user.name}
          sx={{ width: 200, height: 200, borderRadius: '50%' }}
        />

        {/* Info */}
        <Box>
          <CardContent>
            <Typography variant="h6" gutterBottom>Name: {user.name}</Typography>
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
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={editData.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={editData.email}
                onChange={handleInputChange}
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

export default AdminAccount
