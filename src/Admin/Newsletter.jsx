import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Box,
} from "@mui/material";

const dummyData = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    avatar: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    avatar: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    avatar: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Diana Prince",
    email: "diana@example.com",
    avatar: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    name: "Ethan Hunt",
    email: "ethan@example.com",
    avatar: "https://via.placeholder.com/150",
  },
];

const Newsletter = () => {
  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom className="header-title-color">
        Newsletter
      </Typography>
      <Grid container spacing={2}>
        {dummyData.map((user) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
            <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
              <Avatar
                alt={user.name}
                src={user.avatar}
                sx={{ width: 80, height: 80, mr: 2 }}
              />
              <CardContent>
                <Typography variant="h6">{user.name}</Typography>
                <Typography color="text.secondary">{user.email}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Newsletter;
