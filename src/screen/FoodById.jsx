import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button, TextField, Rating } from "@mui/material";
import { useDispatch } from "react-redux";
import axios from "axios";

const BASE_URL = "http://localhost:3000"; // adjust if needed

const FoodReviewSection = ({ foodId, userInfo }) => {
  const [rating, setRating] = useState(4);
  const [reviewMessage, setReviewMessage] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch reviews for this food, sorted newest first
  const fetchReviews = async () => {
    setLoadingReviews(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/api/review/food/${foodId}`);
      setReviews(data);
    } catch (error) {
      console.error("Failed to fetch reviews", error);
    } finally {
      setLoadingReviews(false);
    }
  };

  useEffect(() => {
    if (foodId) fetchReviews();
  }, [foodId]);

  const handleSubmitReview = async () => {
    if (!reviewMessage.trim()) return;
    setSubmitting(true);
    try {
      await axios.post(`${BASE_URL}/api/review`, {
        foodid: foodId,
        message: reviewMessage,
        name: userInfo.name,
      });
      setReviewMessage("");
      fetchReviews(); // refresh reviews after adding
    } catch (error) {
      console.error("Failed to submit review", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box mt={3}>
      {userInfo && (
        <>
          <Box mt={2}>
            <Typography variant="subtitle1" gutterBottom>
              Rating:
            </Typography>
            <Rating
              name="food-rating"
              value={rating}
              onChange={(e, newValue) => setRating(newValue)}
            />
          </Box>

          <Box mt={3}>
            <TextField
              label="Write a review"
              multiline
              rows={3}
              fullWidth
              value={reviewMessage}
              onChange={(e) => setReviewMessage(e.target.value)}
              disabled={submitting}
            />
            <Button
              variant="outlined"
              sx={{
                mt: 2,
                color: "#4f46e5",
                borderColor: "#4f46e5",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#eef2ff",
                },
              }}
              onClick={handleSubmitReview}
              disabled={submitting || !reviewMessage.trim()}
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </Button>
          </Box>
        </>
      )}

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Reviews ({reviews.length})
        </Typography>
        {loadingReviews ? (
          <Typography>Loading reviews...</Typography>
        ) : reviews.length === 0 ? (
          <Typography>No reviews yet.</Typography>
        ) : (
          reviews.map((r) => (
            <Box
              key={r._id}
              mb={2}
              p={2}
              border="1px solid #ddd"
              borderRadius={1}
              bgcolor="#fafafa"
            >
              <Typography variant="subtitle2" fontWeight="bold">
                {r.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={1}>
                {new Date(r.createdAt).toLocaleString()}
              </Typography>
              <Typography variant="body1">{r.message}</Typography>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

const FoodById = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [rating, setRating] = useState(4);
  const [userInfo, setUserInfo] = useState(null); // Replace with your auth logic

  useEffect(() => {
    // Simulate user login info (replace this with your real user info fetching)
    const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUserInfo(storedUserInfo || null);
  }, []);

  useEffect(() => {
    const fetchFoodById = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${BASE_URL}/api/food/${id}`);
        setFood(data);
        setRating(data.rating || 4);
        setLoading(false);
      } catch (err) {
        setError("Food not found");
        setLoading(false);
        console.log(err)
      }
    };
    fetchFoodById();
  }, [id]);

  const handleAddToCart = () => {
    if (!food) return;
    const cartItem = {
      ...food,
      quantity: 1,
    };
    dispatch({ type: "ADD_TO_CART", payload: cartItem });
  };

  if (loading) {
    return <Typography variant="h6" align="center" mt={4}>Loading...</Typography>;
  }

  if (error || !food) {
    return <Typography variant="h6" align="center" mt={4}>{error || "Food not found"}</Typography>;
  }

  return (
    <Box className="container-width for-cart" mt={4}>
      <Box display="flex" flexWrap="wrap" gap={4}>
        {/* Left Side */}
        <Box flex="0 0 60%">
          <img
            src={
              food.img?.startsWith("http")
                ? food.img
                : `${BASE_URL}${food.img}`
            }
            alt={food.name}
            style={{
              width: 300,
              height: 300,
              borderRadius: "10px",
              objectFit: "cover",
            }}
          />

          <FoodReviewSection foodId={food._id} userInfo={userInfo} />
        </Box>

        {/* Right Side */}
        <Box
          flex="0 0 35%"
          bgcolor="#f9fafb"
          p={4}
          borderRadius={2}
          border="1px solid #ddd"
          height="fit-content"
        >
          <Typography variant="h5" fontWeight={600} gutterBottom>
            {food.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={1}>
            {food.des || "A delicious meal specially crafted for your cravings."}
          </Typography>
          <Typography variant="h6" color="primary" mb={1}>
            ${food.price}
          </Typography>
          <Typography
            variant="body2"
            color={food.stock > 0 ? "green" : "error"}
            mb={2}
          >
            {food.stock > 0 ? `In Stock` : "Out of stock"}
          </Typography>

          <Button
            fullWidth
            variant="outlined"
            disabled={food.stock <= 0}
            onClick={handleAddToCart}
            sx={{
              color: "#4f46e5",
              borderColor: "#4f46e5",
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#eef2ff",
              },
            }}
          >
            Add to Cart
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FoodById;
