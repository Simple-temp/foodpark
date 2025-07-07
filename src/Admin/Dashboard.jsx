import React from "react";
import { Box } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <Box display="flex" height="100vh" fontFamily="Arial, sans-serif">
      {/* Sidebar */}
      <Box
        width="17%"
        bgcolor="#0f172a"
        color="white"
        p={3}
        display="flex"
        flexDirection="column"
        gap={2}
        sx={{
          "& a": {
            textDecoration: "none",
            color: "white",
            padding: "10px 15px",
            borderRadius: "8px",
            transition: "background-color 0.3s, transform 0.2s",
            fontWeight: 500,
          },
          "& a:hover": {
            backgroundColor: "#475569",
            transform: "translateX(5px)",
          },
          "& a.active": {
            backgroundColor: "#1e293b",
            fontWeight: 600,
          },
        }}
      >
        <NavLink to="/dashboard">Admin Home</NavLink>
        <NavLink to="/dashboard/allorder">All Orders</NavLink>
        <NavLink to="/dashboard/blog">Blog</NavLink>
        <NavLink to="/dashboard/feedback">Feedback</NavLink>
        <NavLink to="/dashboard/food">Food</NavLink>
        <NavLink to="/dashboard/messages">Messages</NavLink>
        <NavLink to="/dashboard/newsletter">NewsLetter</NavLink>
        {/* <NavLink to="/dashboard/recepie">Our Recepie</NavLink> */}
        <NavLink to="/dashboard/users">User</NavLink>
        <NavLink to="/">Log out</NavLink>
      </Box>

      {/* Content */}
      <Box width="83%" bgcolor="#f1f5f9" p={4} overflow="auto">
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;
