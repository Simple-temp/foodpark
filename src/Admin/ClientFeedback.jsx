import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

const clients = [
  {
    name: "Business Growth Team",
    description: "Great experience with our service!",
    image:
      "https://smallbizclub.com/wp-content/uploads/2024/05/AdobeStock_419253624-scaled.jpeg",
  },
  {
    name: "Happy Regulars",
    description: "Our loyal clients keep coming back for more!",
    image:
      "https://nccusa.com/wp-content/uploads/2016/07/happy-regular-customers.jpg",
  },
  {
    name: "Friendly Diners",
    description: "We value our customers and their experiences.",
    image:
      "https://www.partstown.com/about-us/wp-content/uploads/2019/10/Friends-Dining-Together-6-Ways-to-Enhance-Customer-Experience-in-Your-Restaurant.png",
  },
  {
    name: "Evening Vibes",
    description: "An elegant night out with satisfied guests.",
    image:
      "https://i0.wp.com/citycheersmedia.com/wp-content/uploads/2023/05/alex-haney-CAhjZmVk5H4-unsplash-scaled.webp?fit=2560%2C1707&ssl=1",
  },
];

const ClientFeedback = () => {
  return (
    <div>
      <Box textAlign="center" px={2}>
        <Typography variant="h4" gutterBottom className="header-title-color">
          Our Clients
        </Typography>

        <Grid container spacing={4} mt={1}>
          {clients.map((client, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Card sx={{ height: "100%" }}>
                <CardMedia
                  component="img"
                  image={client.image}
                  alt={client.name}
                  sx={{
                    height: 250,
                    objectFit: "cover",
                    width: "100%",
                  }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {client.name}
                  </Typography>
                  <Typography variant="body2">{client.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default ClientFeedback;
