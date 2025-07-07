import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const initialRecipes = [
  {
    name: "Cheesy Chili Mac",
    price: "$12.99",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/easy-dinner-recipes-chili-mac-and-cheese-6721330c2edff.jpg?crop=1xw:1xh;center,top&resize=980:*",
  },
  {
    name: "Vibrant Veggie Bowl",
    price: "$10.99",
    image:
      "https://cdn.loveandlemons.com/wp-content/uploads/2019/09/dinner-ideas-2.jpg",
  },
  {
    name: "Buzzfeed Dinner Special",
    price: "$11.49",
    image:
      "https://img.buzzfeed.com/buzzfeed-static/static/2022-03/5/0/asset/6201713e5c7e/sub-buzz-1009-1646440684-8.jpg?downsize=900:*&output-format=auto&output-quality=auto",
  },
  {
    name: "Classic Beef & Broccoli",
    price: "$13.99",
    image:
      "https://www.simplyrecipes.com/thmb/kTh0yVR2KrJFnGQPNGe1UYIG1t8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Ground-Beef-Broccoli-LEAD-6-faafd703b949408ba35b3199cd5a22e9.jpg",
  },
  {
    name: "Easy Chicken Delight",
    price: "$9.99",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/easy-dinner-recipes-677efe8559104.png?crop=1.00xw:1.00xh;0,0&resize=640:*",
  },
  {
    name: "Homestyle Curry Rice",
    price: "$10.49",
    image: "https://mistyricardo.com/wp-content/uploads/2025/03/Homestyle-Lamb-Curry-11.jpg",
  },
  {
    name: "Herbed Pasta Mix",
    price: "$8.99",
    image: "https://www.chefajaychopra.com/assets/img/recipe/1-1669465162HomestylePahaadiChickenBhatRecipewebp.webp",
  },
];

const Food = () => {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [openDialog, setOpenDialog] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({ name: "", price: "", image: "" });

  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(recipes[index]);
    setOpenDialog(true);
  };

  const handleDelete = (index) => {
    const updated = recipes.filter((_, i) => i !== index);
    setRecipes(updated);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    const updated = [...recipes];
    updated[editIndex] = formData;
    setRecipes(updated);
    setOpenDialog(false);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom className="header-title-color">
        Food Items
      </Typography>

      <Grid container spacing={3}>
        {recipes.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="180"
                image={item.image}
                alt={item.name}
              />
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body1" color="textSecondary">
                  Price: {item.price}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton color="primary" onClick={() => handleEdit(index)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(index)}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Edit Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <DialogTitle>Update Food Item</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            name="name"
            margin="normal"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Price"
            name="price"
            margin="normal"
            value={formData.price}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Image URL"
            name="image"
            margin="normal"
            value={formData.image}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Food;
