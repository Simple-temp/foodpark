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
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { getPasswordStrength } from "./passwordStrength";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios"; // ✅ for making API call

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [passwordStatus, setPasswordStatus] = useState({
    strength: "Weak",
    color: "error",
    isValid: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);

    if (name === "password") {
      setPasswordStatus(getPasswordStrength(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/login",
        form
      );

      if (response.data) {
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        navigate("/"); // or wherever you want
        window.location.reload();
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message || "Invalid email or password. Try again."
      );
    } finally {
      setLoading(false);
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
          height: 480,
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

        <form onSubmit={handleSubmit}>
          <TextField
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleChange}
            required
          />
          <TextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleChange}
            required
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

          {error && (
            <Typography color="error" variant="body2" mb={1}>
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            fullWidth
            type="submit"
            disabled={!passwordStatus.isValid || loading}
            sx={{
              mt: 2,
              py: 1.5,
              backgroundColor:
                passwordStatus.isValid && !loading ? "#6366f1" : "gray",
              "&:hover": {
                backgroundColor:
                  passwordStatus.isValid && !loading ? "#4f46e5" : "gray",
              },
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

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
