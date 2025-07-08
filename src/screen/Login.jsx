import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  LinearProgress,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { getPasswordStrength } from "./passwordStrength"; // import this

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const [form, setForm] = useState({ email: "", password: "" });
  const [passwordStatus, setPasswordStatus] = useState({
    strength: "Weak",
    color: "error",
    isValid: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);

    if (name === "password") {
      setPasswordStatus(getPasswordStrength(value));
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
      sx={{ backgroundColor: "#f3f4f6" }}
    >
      <Paper
        elevation={6}
        sx={{
          width: 500,
          height: 450,
          p: 5,
          borderRadius: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4" mb={3} align="center" fontWeight="bold">
          Login
        </Typography>

        <TextField
          name="email"
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
            style: {
              backgroundColor: "transparent",
            },
          }}
        />

        {/* Password Strength Info */}
        {form.password && (
          <>
            <Typography variant="subtitle2" color={passwordStatus.color}>
              Strength: {passwordStatus.strength}
            </Typography>
            <LinearProgress
              color={passwordStatus.color}
              variant="determinate"
              value={
                passwordStatus.strength === "Weak"
                  ? 30
                  : passwordStatus.strength === "Medium"
                  ? 60
                  : 100
              }
              sx={{ mb: 2 }}
            />
          </>
        )}

        <Button
          variant="contained"
          fullWidth
          disabled={!passwordStatus.isValid}
          sx={{
            mt: 2,
            py: 1.5,
            backgroundColor: passwordStatus.isValid ? "#6366f1" : "gray",
            "&:hover": {
              backgroundColor: passwordStatus.isValid ? "#4f46e5" : "gray",
            },
            fontWeight: "bold",
            textTransform: "none",
          }}
        >
          Login
        </Button>

        <Typography mt={3} textAlign="center">
          Don&apos;t have an account?{" "}
          <Link
            component={RouterLink}
            to="/register"
            underline="hover"
            color="#4f46e5"
            fontWeight="bold"
          >
            Register
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
