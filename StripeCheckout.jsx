// StripeCheckout.jsx
import React, { useEffect, useState } from "react";
import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";

const StripeCheckout = ({ amount, orderId, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const fetchClientSecret = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const { token } = userInfo;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        "http://localhost:3000/api/stripe/create-payment-intent",
        { amount },
        config
      );

      setClientSecret(data.clientSecret);
    };

    fetchClientSecret();
  }, [amount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      alert(error.message);
    } else if (paymentIntent.status === "succeeded") {
      await axios.put(
        `http://localhost:3000/api/order/pay/${orderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`,
          },
        }
      );

      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <Button type="submit" variant="contained" disabled={!stripe} sx={{ mt: 2 }}>
        Pay Now
      </Button>
    </form>
  );
};

export default StripeCheckout;
