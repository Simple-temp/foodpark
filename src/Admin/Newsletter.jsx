import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";

const Newsletter = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/newsletter");
        setSubscribers(res.data); // assuming your API returns an array
      } catch (err) {
        setError("Failed to fetch newsletter data.");
        console.log(err)
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom className="header-title-color">
        Newsletter Subscribers
      </Typography>

      {loading ? (
        <Box textAlign="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container spacing={2}>
          {subscribers.map((subscriber, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={subscriber._id || index}>
              <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
                <Avatar
                  alt="Subscriber"
                  src="https://via.placeholder.com/150"
                  sx={{ width: 60, height: 60, mr: 2 }}
                />
                <CardContent>
                  <Typography variant="body1">{subscriber.email}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Subscribed: {new Date(subscriber.createdAt).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Newsletter;
