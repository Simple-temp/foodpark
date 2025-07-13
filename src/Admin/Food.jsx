import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Input,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const BASE_URL = "http://localhost:4000";

const Food = () => {
  const [foods, setFoods] = useState([]);

  // Add Food dialog state
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newFood, setNewFood] = useState({
    name: "",
    quantity: "",
    price: "",
    des: "",
    rating: "",
    review: "",
    stock: "",
  });
  const [imageFile, setImageFile] = useState(null);

  // Edit Food dialog state
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editFood, setEditFood] = useState(null);

  // Fetch foods
  const fetchFoods = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/food/getallfoods`);
      setFoods(response.data);
    } catch (error) {
      console.error("Failed to fetch foods", error);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  // Handle input change for add
  const handleAddChange = (e) => {
    setNewFood({ ...newFood, [e.target.name]: e.target.value });
  };

  const handleAddImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Add new food
  const handleAddFood = async () => {
    try {
      const formData = new FormData();
      Object.entries(newFood).forEach(([key, value]) =>
        formData.append(key, value)
      );
      formData.append("img", imageFile);

      await axios.post(`${BASE_URL}/api/food`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setOpenAddDialog(false);
      setNewFood({
        name: "",
        quantity: "",
        price: "",
        des: "",
        rating: "",
        review: "",
        stock: "",
      });
      setImageFile(null);
      fetchFoods();
    } catch (error) {
      console.error("Failed to add food", error);
    }
  };

  // Handle edit dialog open
  const openEdit = (food) => {
    setEditFood(food);
    setOpenEditDialog(true);
  };

  // Handle input change for edit
  const handleEditChange = (e) => {
    setEditFood({ ...editFood, [e.target.name]: e.target.value });
  };

  // Handle image change for edit
  const handleEditImageChange = (e) => {
    setEditFood({ ...editFood, imgFile: e.target.files[0] }); // temporarily store file
  };

  // Update food
  const handleUpdateFood = async () => {
    try {
      const formData = new FormData();

      formData.append("name", editFood.name);
      formData.append("quantity", editFood.quantity);
      formData.append("price", editFood.price);
      formData.append("des", editFood.des);
      formData.append("rating", editFood.rating);
      formData.append("review", editFood.review);
      formData.append("stock", editFood.stock);

      // If new image uploaded
      if (editFood.imgFile) {
        formData.append("img", editFood.imgFile);
      }

      await axios.put(
        `${BASE_URL}/api/food/updatebyid/${editFood._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setOpenEditDialog(false);
      setEditFood(null);
      fetchFoods();
    } catch (error) {
      console.error("Failed to update food", error);
    }
  };

  // Delete food with confirm alert
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this food item?")) {
      return;
    }
    try {
      await axios.delete(`${BASE_URL}/api/food/deletebyid/${id}`);
      fetchFoods();
    } catch (error) {
      console.error("Failed to delete food", error);
    }
  };

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Food Items</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenAddDialog(true)}
        >
          Add Food
        </Button>
      </Box>

      <Grid container spacing={3}>
        {foods.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item._id}>
            <Card sx={{ height: 495, width:400, display: "flex", flexDirection: "column", borderRadius: "5%" }}>
              <CardMedia
                component="img"
                height="200"
                image={
                  item.img?.startsWith("http")
                    ? item.img
                    : `${BASE_URL}/uploads/${item.img.replace(/^\/uploads\/?/, "")}`
                }
                alt={item.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography>Price: ${item.price}</Typography>
                <Typography>Quantity: {item.quantity}</Typography>
                <Typography>Rating: {item.rating}</Typography>
                <Typography>Review: {item.review}</Typography>
                <Typography>Stock: {item.stock}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {item.des}
                </Typography>
              </CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-around", mb: 1 }}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => openEdit(item)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add Food Dialog */}
      <Dialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add New Food</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="dense" label="Name" name="name" onChange={handleAddChange} />
          <TextField fullWidth margin="dense" label="Quantity" name="quantity" type="number" onChange={handleAddChange} />
          <TextField fullWidth margin="dense" label="Price" name="price" type="number" onChange={handleAddChange} />
          <TextField fullWidth margin="dense" label="Description" name="des" onChange={handleAddChange} />
          <TextField fullWidth margin="dense" label="Rating" name="rating" type="number" onChange={handleAddChange} />
          <TextField fullWidth margin="dense" label="Review" name="review" type="number" onChange={handleAddChange} />
          <TextField fullWidth margin="dense" label="Stock" name="stock" type="number" onChange={handleAddChange} />
          <Input fullWidth type="file" onChange={handleAddImageChange} sx={{ mt: 2 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddFood}>Add</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Food Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Update Food Item</DialogTitle>
        <DialogContent>
          {editFood && (
            <>
              <TextField
                fullWidth
                margin="dense"
                label="Name"
                name="name"
                value={editFood.name}
                onChange={handleEditChange}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Quantity"
                name="quantity"
                type="number"
                value={editFood.quantity}
                onChange={handleEditChange}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Price"
                name="price"
                type="number"
                value={editFood.price}
                onChange={handleEditChange}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Description"
                name="des"
                value={editFood.des}
                onChange={handleEditChange}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Rating"
                name="rating"
                type="number"
                value={editFood.rating}
                onChange={handleEditChange}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Review"
                name="review"
                type="number"
                value={editFood.review}
                onChange={handleEditChange}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Stock"
                name="stock"
                type="number"
                value={editFood.stock}
                onChange={handleEditChange}
              />
              <Input
                fullWidth
                type="file"
                onChange={handleEditImageChange}
                sx={{ mt: 2 }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdateFood}>Update</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Food;
