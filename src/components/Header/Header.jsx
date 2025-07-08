import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Modal,
  Stack,
  TextField,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { useSelector } from "react-redux";

const menuItems = [
  { text: "Home", path: "/" },
  { text: "MyDashboard", path: "/mydashboard" },
  { text: "AdminDashboard", path: "/dashboard" },
  { text: "Our Recipes", path: "/our-recipes" },
  { text: "About Us", path: "/about-us" },
  { text: "Blog", path: "/blog" },
  { text: "Client Feedback", path: "/client-feedback" },
  { text: "Contact", path: "/contact" },
];

const Header = () => {
  const itemCount = useSelector((state) =>
    state.cartState.cart.fooditem.reduce(
      (total, item) => total + item.quantity,
      0
    )
  );

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleMenuClick = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        color="default"
        sx={{
          zIndex: theme.zIndex.drawer - 10,
          px: 2,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <Box
            component={Link}
            to="/"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/2965/2965567.png"
              alt="Logo"
              width={40}
              style={{ cursor: "pointer" }}
            />
          </Box>

          {/* Contact info */}
          <Stack
            direction="row"
            spacing={3}
            alignItems="center"
            sx={{
              display: { xs: "none", md: "flex" },
              color: theme.palette.primary.main,
            }}
          >
            <Box display="flex" alignItems="center">
              <PhoneIcon sx={{ mr: 0.5 }} />
              <Typography variant="body2">987-654-3210</Typography>
            </Box>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ borderColor: "lightgray" }}
            />
            <Box display="flex" alignItems="center">
              <EmailIcon sx={{ mr: 0.5 }} />
              <Typography variant="body2">demo@gmail.com</Typography>
            </Box>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ borderColor: "lightgray" }}
            />
            <Box display="flex" alignItems="center">
              <LocationOnIcon sx={{ mr: 0.5 }} />
              <Typography variant="body2">104 New York, USA</Typography>
            </Box>
          </Stack>

          {/* Buttons */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => setLoginOpen(true)}
            >
              Login
            </Button>

            <Button
              variant="outlined"
              color="primary"
              size="small"
              sx={{ minWidth: 120 }}
              onClick={() => setRegisterOpen(true)}
            >
              Register
            </Button>

            <Link to="/cart">
              <IconButton color="primary" aria-label="cart" sx={{ ml: 1 }}>
                <Badge
                  badgeContent={itemCount}
                  color="secondary"
                  overlap="circular"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Link>

            <IconButton
              color="primary"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ ml: 1 }}
            >
              <MenuIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 280,
            display: "flex",
            flexDirection: "column",
            height: "100vh",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
            borderBottom: "1px solid #ddd",
          }}
        >
          <Box
            component={Link}
            to="/"
            onClick={() => setDrawerOpen(false)}
            sx={{ cursor: "pointer" }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/2965/2965567.png"
              alt="Logo"
              width={50}
            />
          </Box>
          <IconButton onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List sx={{ flexGrow: 1, overflowY: "auto" }}>
          {menuItems.map(({ text, path }) => (
            <ListItemButton
              key={text}
              selected={location.pathname === path}
              onClick={() => handleMenuClick(path)}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: theme.palette.primary.light,
                  color: theme.palette.primary.main,
                },
              }}
            >
              <ListItemText primary={text} />
            </ListItemButton>
          ))}
        </List>

        <Box sx={{ p: 2, borderTop: "1px solid #ddd" }}>
          <Typography variant="body2" color="text.secondary" align="center">
            &copy; 2025 Your Company
          </Typography>
        </Box>
      </Drawer>

      {/* Login Modal */}
      <Modal open={loginOpen} onClose={() => setLoginOpen(false)}>
        <Box
          sx={{
            width: 400,
            p: 4,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography variant="h6" mb={2}>
            Login
          </Typography>
          <Stack spacing={2}>
            <TextField fullWidth label="Email" variant="outlined" />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
            />
            <Button
              variant="outlined"
              fullWidth
              sx={{
                color: "#1976d2",
                borderColor: "#1976d2",
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#e3f2fd",
                  borderColor: "#1976d2",
                },
              }}
            >
              Login
            </Button>
          </Stack>
        </Box>
      </Modal>

      {/* Register Modal */}
      <Modal open={registerOpen} onClose={() => setRegisterOpen(false)}>
        <Box
          sx={{
            width: 400,
            p: 4,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography variant="h6" mb={2}>
            Register
          </Typography>
          <Stack spacing={2}>
            <TextField fullWidth label="Name" variant="outlined" />
            <TextField fullWidth label="Email" variant="outlined" />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
            />
            <Button
              variant="outlined"
              fullWidth
              sx={{
                color: "#1976d2",
                borderColor: "#1976d2",
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#e3f2fd",
                  borderColor: "#1976d2",
                },
              }}
            >
              Register
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default Header;
