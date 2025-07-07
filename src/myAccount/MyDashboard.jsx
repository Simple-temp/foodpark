import React from "react";
import { Box } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";

const MyDashboard = () => {
  return (
    <Box display="flex" height="100vh" fontFamily="Arial, sans-serif">
      {/* Sidebar */}
      <Box
        width="17%"
        bgcolor="#1e3a8a"
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
            backgroundColor: "#3b82f6",
            transform: "translateX(5px)",
          },
          "& a.active": {
            backgroundColor: "#2563eb",
            fontWeight: 600,
          },
        }}
      >
        <NavLink to="/mydashboard/myprofile">Profile</NavLink>
        <NavLink to="/mydashboard/myhistory">History</NavLink>
        <NavLink to="/mydashboard/myorder">Order</NavLink>
        <NavLink to="/mydashboard/mysetting">Settings</NavLink>
        <NavLink to="/">Log out</NavLink>
      </Box>

      {/* Content */}
      <Box width="83%" bgcolor="#f8fafc" p={4} overflow="auto">
        <Outlet />
      </Box>
    </Box>
  );
};

export default MyDashboard;
