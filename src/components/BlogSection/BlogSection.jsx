import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

const blogPosts = [
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

const BlogSection = () => {
  return (
    <div className="earch-container">
      <Box textAlign="center" px={2}>
        <Typography variant="h4" gutterBottom className="header-title-color">
          Blog
        </Typography>
        <Typography variant="body1" gutterBottom>
          Read our latest stories and updates.
        </Typography>

        <Grid container spacing={4} mt={2}>
          {blogPosts.map((post, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card sx={{ height: "100%" }}>
                <CardMedia
                  component="img"
                  image={post.image}
                  alt={post.title}
                  sx={{
                    height: 200,
                    objectFit: "cover",
                  }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography variant="body2">{post.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default BlogSection;
