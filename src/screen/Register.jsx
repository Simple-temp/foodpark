import { useState } from "react";
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
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const [form, setForm] = useState({ name: "", email: "", password: "" });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/user/register",
        form
      );
      localStorage.setItem("userInfo", JSON.stringify(data)); // ✅ Save user data to localStorage
      toast.success("Registration successful!");
      navigate("/");

      // Reset form
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      const message = err.response?.data?.message || "Registration failed!";
      toast.error(message);
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
      <ToastContainer position="top-right" autoClose={3000} />

      <Paper
        elevation={6}
        sx={{
          width: 550,
          height: 475,
          p: 5,
          borderRadius: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4" mb={3} align="center" fontWeight="bold">
          Register
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="Full Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={form.name}
            onChange={handleChange}
          />
          <TextField
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            margin="normal"
            value={form.password}
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
            type="submit"
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
            Register
          </Button>
        </form>

        <Typography mt={3} textAlign="center">
          Already have an account?{" "}
          <Link
            component={RouterLink}
            to="/login"
            underline="hover"
            color="#4f46e5"
            fontWeight="bold"
          >
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Register;
