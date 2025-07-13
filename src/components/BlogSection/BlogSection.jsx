import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import axios from "axios";

const BASE_URL = "http://localhost:4000";

const BlogSection = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/blog/getallblog`);
        setBlogPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

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
            <Grid item xs={12} sm={6} md={4} key={post._id || i}>
              <Card sx={{ height: "100%" }}>
                <CardMedia
                  component="img"
                  image={
                    post.image?.startsWith("http")
                      ? post.image
                      : `${BASE_URL}/uploads/${post.image}`
                  }
                  alt={post.title}
                  sx={{
                    height: 340,
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
