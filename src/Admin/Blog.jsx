import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const initialPosts = [
  {
    title: "A Taste of Orchard",
    description: "Explore the elegant flavors at the Orchard Hotel restaurant.",
    image:
      "https://www.orchardhotel.com.au/wp-content/uploads/2024/10/The-Orchard-Hotel-Chatswood-Restaurant-Bar-48.jpg",
  },
  {
    title: "Fast Food Feast",
    description: "A top-down look at the ultimate fast food mix platter.",
    image:
      "https://img.freepik.com/free-photo/top-view-fast-food-mix-mozzarella-sticks-club-sandwich-hamburger-mushroom-pizza-caesar-shrimp-salad-french-fries-ketchup-mayo-cheese-sauces-table_141793-3998.jpg?semt=ais_hybrid&w=740",
  },
  {
    title: "Healthy Eating",
    description: "Understanding food groups for a balanced diet.",
    image:
      "https://www.eatright.org/-/media/images/eatright-landing-pages/foodgroupslp_804x482.jpg?as=0&w=967&rev=d0d1ce321d944bbe82024fff81c938e7&hash=E6474C8EFC5BE5F0DA9C32D4A797D10D",
  },
];

const Blog = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [openDialog, setOpenDialog] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
  });

  const handleOpenAdd = () => {
    setEditIndex(null);
    setFormData({ title: "", image: "", description: "" });
    setOpenDialog(true);
  };

  const handleOpenEdit = (index) => {
    setEditIndex(index);
    setFormData(posts[index]);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    if (!formData.title || !formData.image || !formData.description) {
      alert("Please fill in all fields.");
      return;
    }

    if (editIndex !== null) {
      const updatedPosts = [...posts];
      updatedPosts[editIndex] = formData;
      setPosts(updatedPosts);
    } else {
      setPosts([...posts, formData]);
    }

    setOpenDialog(false);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      const updatedPosts = posts.filter((_, i) => i !== index);
      setPosts(updatedPosts);
    }
  };

  return (
    <Box px={3} py={4}>
      <Box textAlign="center">
        <Typography variant="h4" gutterBottom className="header-title-color">
          Blog
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenAdd}
          sx={{ mt: 2 }}
        >
          Add New Blog
        </Button>
      </Box>

      <Grid container spacing={4} mt={3}>
        {posts.map((post, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <CardMedia
                component="img"
                image={post.image}
                alt={post.title}
                sx={{ height: 200, objectFit: "cover" }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body2">{post.description}</Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleOpenEdit(i)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(i)} color="error">
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{editIndex !== null ? "Edit Blog" : "Add New Blog"}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {editIndex !== null ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Blog;
