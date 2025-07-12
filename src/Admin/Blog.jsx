import React, { useState, useEffect } from "react";
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
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const BASE_URL = "http://localhost:3000";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:3000/api/blog");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleOpenAdd = () => {
    setEditId(null);
    setFormData({ title: "", description: "", image: null });
    setOpenDialog(true);
  };

  const handleOpenEdit = (post) => {
    setEditId(post._id);
    setFormData({
      title: post.title,
      description: post.description,
      image: null,
    });
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSave = async () => {
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    if (formData.image) data.append("image", formData.image);

    try {
      if (editId) {
        await axios.put(`http://localhost:3000/api/blog/${editId}`, data);
        toast.success("Blog Update successful!");
      } else {
        await axios.post("http://localhost:3000/api/blog", data);
        toast.success("Blog create successful!");
      }
      fetchPosts();
      handleClose();
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`http://localhost:3000/api/blog/${id}`);
        fetchPosts();
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  return (
    <Box px={3} py={4}>
      <Box textAlign="center">
        <ToastContainer position="top-right" autoClose={3000} />
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
        {Array.isArray(posts) &&
          posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post._id}>
              <Card
                sx={{
                  width : 400,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  image={
                    post.image?.startsWith("http")
                      ? post.image
                      : `http://localhost:3000/uploads/${post.image}`
                  }
                />

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography variant="body2">{post.description}</Typography>
                </CardContent>
                <CardActions>
                  <IconButton
                    onClick={() => handleOpenEdit(post)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(post._id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{editId ? "Edit Blog" : "Add New Blog"}</DialogTitle>
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
            label="Description"
            name="description"
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
            margin="normal"
          />
          <Button variant="contained" component="label" sx={{ mt: 2 }}>
            Upload Image
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>
          {formData.image && (
            <Typography variant="caption" sx={{ ml: 1 }}>
              {formData.image.name}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {editId ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Blog;
