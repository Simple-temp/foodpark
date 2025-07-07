import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./components/Home/Home";
import ContactSection from "./components/ContactSection/ContactSection";
import ClientSection from "./components/ClientSection/ClientSection";
import BlogSection from "./components/BlogSection/BlogSection";
import OurRecipes from "./components/OurRecipes/OurRecipes";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { Box } from "@mui/material";
import AboutSection from "./components/AboutSection/AboutSection";
import Login from "./screen/Login";
import Register from "./screen/Register";
import Cart from "./screen/Cart";

import MyDashboard from "./myAccount/MyDashboard";
import MyHistory from "./myAccount/MyHistory";
import MyOrder from "./myAccount/MyOrder";
import Myprofile from "./myAccount/Myprofile";
import MySettings from "./myAccount/MySettings";

import Dashboard from "./Admin/Dashboard";
import AllOrder from "./Admin/AllOrder";
import AdminAccount from "./Admin/AdminAccount";
import NotFound from "./NotFound";
import Blog from "./Admin/Blog";
import Users from "./Admin/Users";
import ClientFeedback from "./Admin/ClientFeedback";
import Food from "./Admin/Food";
import Messages from "./Admin/Messages";
import OurRecepie from "./Admin/OurRecepie";
import Newsletter from "./Admin/Newsletter";

const AppContent = () => {
  const location = useLocation();
  const hideHeaderFooterRoutes = [
    "/mydashboard",
    "/mydashboard/myhistory",
    "/mydashboard/myorder",
    "/mydashboard/myprofile",
    "/mydashboard/mysetting",
    "/dashboard",
    "/dashboard/dashboard",
    "/dashboard/allorder",
    "/dashboard/blog",
    "/dashboard/feedback",
    "/dashboard/food",
    "/dashboard/messages",
    "/dashboard/newsletter",
    "/dashboard/recepie",
    "/dashboard/users",
  ];

  const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(
    location.pathname
  );

  return (
    <div className="d-flex inner-container">
      {!shouldHideHeaderFooter && <Header />}
      <main>
        <Box mt={shouldHideHeaderFooter ? 0 : 10}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/our-recipes" element={<OurRecipes />} />
            <Route path="/about-us" element={<AboutSection />} />
            <Route path="/blog" element={<BlogSection />} />
            <Route path="/client-feedback" element={<ClientSection />} />
            <Route path="/contact" element={<ContactSection />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />

            {/* MyDashboard Nested Routes */}
            <Route path="/mydashboard" element={<MyDashboard />}>
              <Route index element={<MyHistory />} />
              <Route path="myhistory" element={<MyHistory />} />
              <Route path="myorder" element={<MyOrder />} />
              <Route path="myprofile" element={<Myprofile />} />
              <Route path="mysetting" element={<MySettings />} />
            </Route>

            {/* Admin Dashboard Nested Routes */}
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<AdminAccount />} />
              <Route path="allorder" element={<AllOrder />} />
              <Route path="blog" element={<Blog />} />
              <Route path="feedback" element={<ClientFeedback />} />
              <Route path="food" element={<Food />} />
              <Route path="messages" element={<Messages />} />
              <Route path="newsletter" element={<Newsletter />} />
              <Route path="recepie" element={<OurRecepie />} />
              <Route path="users" element={<Users />} />
            </Route>

            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Box>
      </main>
      {!shouldHideHeaderFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
