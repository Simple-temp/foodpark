import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
  TextField,
  MenuItem,
  Card,
  CardContent,
  CardMedia,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { Link } from "react-router-dom";

const BASE_URL = "http://localhost:4000";

// Static options
const brandOptions = ["Nestlé", "Lay's", "KFC", "Amul", "Barilla"];
const categoryOptions = [
  "Packaged Foods & Beverages",
  "Snacks (Potato Chips)",
  "Fast Food (Fried Chicken)",
  "Dairy Products",
  "Pasta & Italian Foods",
];

const SearchFilterBox = () => {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${BASE_URL}/api/food/getallfoods`);
      setFoods(res.data);
      setFilteredFoods(res.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...foods];

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((food) => selectedBrands.includes(food.brand));
    }
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((food) =>
        selectedCategories.includes(food.category)
      );
    }

    if (searchTerm) {
      filtered = filtered.filter((food) =>
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOption === "low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "new") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredFoods(filtered);
  }, [selectedBrands, selectedCategories, searchTerm, sortOption, foods]);

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <Box sx={{ display: "flex", p: 2, maxWidth: 1200, mx: "auto" }}>
      {/* Left Side (Filters) */}
      <Box sx={{ width: "30%", pr: 2 }}>
        {/* Brand Filter */}
        <Typography variant="h6" gutterBottom>
          Brand
        </Typography>
        {brandOptions.map((brand) => (
          <FormControlLabel
            key={brand}
            control={
              <Checkbox
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
              />
            }
            label={brand}
          />
        ))}

        {/* Category Filter */}
        <Typography variant="h6" gutterBottom mt={3}>
          Category
        </Typography>
        {categoryOptions.map((cat) => (
          <FormControlLabel
            key={cat}
            control={
              <Checkbox
                checked={selectedCategories.includes(cat)}
                onChange={() => handleCategoryChange(cat)}
              />
            }
            label={cat}
          />
        ))}
      </Box>

      {/* Right Side (Search + Sort + Food List) */}
      <Box sx={{ width: "70%" }}>
        {/* Search & Sort */}
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            fullWidth
            placeholder="Search by food name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            select
            label="Sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            sx={{ width: 200 }}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="low">Low to High</MenuItem>
            <MenuItem value="high">High to Low</MenuItem>
            <MenuItem value="new">Newest Arrival</MenuItem>
          </TextField>
        </Box>

        {/* Food Cards */}
        <Grid container spacing={2}>
          {filteredFoods.map((food) => (
            <Grid item xs={12} sm={6} md={4} key={food._id}>
              <Link to={`/food/${food._id || food.id}`} style={{textDecoration:"none"}}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={
                      food.img?.startsWith("http")
                        ? food.img
                        : `${BASE_URL}/uploads/${food.img.replace(
                            /^\/uploads\/?/,
                            ""
                          )}`
                    }
                    alt={food.name}
                  />
                  <CardContent>
                    <Typography variant="h6">{food.name}</Typography>
                    <Typography>Price: ${food.price}</Typography>
                    <Typography>Brand: {food.brand}</Typography>
                    <Typography>Category: {food.category}</Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default SearchFilterBox;
