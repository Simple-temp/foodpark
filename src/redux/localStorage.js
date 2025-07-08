export const loadCartFromStorage = () => {
  try {
    const data = localStorage.getItem("cart");
    return data
      ? JSON.parse(data)
      : { fooditem: [], shippingAddress: {}, paymentMethod: "Stripe" };
  } catch {
    return { fooditem: [], shippingAddress: {}, paymentMethod: "Stripe" };
  }
};

export const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (err) {
    console.error("Could not save cart to localStorage", err);
  }
};
