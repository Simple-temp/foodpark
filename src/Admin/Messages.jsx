import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const initialMessages = [
  {
    id: "001",
    name: "John Doe",
    email: "john@example.com",
    message: "I love your recipes!",
    date: "2025-07-01",
  },
  {
    id: "002",
    name: "Jane Smith",
    email: "jane@gmail.com",
    message: "Do you deliver outside the city?",
    date: "2025-07-02",
  },
  {
    id: "003",
    name: "Rahim Khan",
    email: "rahim@yahoo.com",
    message: "The app is easy to use. Good work!",
    date: "2025-07-03",
  },
  {
    id: "004",
    name: "Lina",
    email: "lina@hotmail.com",
    message: "How can I become a partner?",
    date: "2025-07-04",
  },
  {
    id: "005",
    name: "Karim Uddin",
    email: "karim@foodie.com",
    message: "Thanks for the great service!",
    date: "2025-07-05",
  },
];

const Messages = () => {
  const [messages, setMessages] = useState(initialMessages);

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure to delete this message?");
    if (confirm) {
      setMessages(messages.filter((msg) => msg.id !== id));
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom className="header-title-color">
        Messages Table
      </Typography>

      <Paper>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              <TableCell sx={{ color: "white" }}>ID</TableCell>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Email</TableCell>
              <TableCell sx={{ color: "white" }}>Message</TableCell>
              <TableCell sx={{ color: "white" }}>Date</TableCell>
              <TableCell sx={{ color: "white" }}>Delete</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {messages.map((msg) => (
              <TableRow key={msg.id}>
                <TableCell>{msg.id}</TableCell>
                <TableCell>{msg.name}</TableCell>
                <TableCell>{msg.email}</TableCell>
                <TableCell>{msg.message}</TableCell>
                <TableCell>{msg.date}</TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => handleDelete(msg.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {messages.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No messages available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default Messages;
