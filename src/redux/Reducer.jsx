import { loadCartFromStorage, saveCartToStorage } from "./localStorage";

const initialState = {
  cart: loadCartFromStorage(), // ✅ loads fooditem, shippingAddress, paymentMethod
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const newItem = action.payload;
      const existingIndex = state.cart.fooditem.findIndex(
        (item) => item.name === newItem.name
      );

      const updatedFooditem =
        existingIndex !== -1
          ? state.cart.fooditem.map((item, idx) =>
              idx === existingIndex
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...state.cart.fooditem, { ...newItem, quantity: 1 }];

      const updatedCart = {
        ...state.cart,
        fooditem: updatedFooditem,
      };

      saveCartToStorage(updatedCart);

      return {
        ...state,
        cart: updatedCart,
      };
    }

    case "INCREASE": {
      const updatedFooditem = state.cart.fooditem.map((item, idx) =>
        idx === action.payload ? { ...item, quantity: item.quantity + 1 } : item
      );

      const updatedCart = {
        ...state.cart,
        fooditem: updatedFooditem,
      };

      saveCartToStorage(updatedCart);
      return { ...state, cart: updatedCart };
    }

    case "DECREASE": {
      const updatedFooditem = state.cart.fooditem.map((item, idx) =>
        idx === action.payload && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

      const updatedCart = {
        ...state.cart,
        fooditem: updatedFooditem,
      };

      saveCartToStorage(updatedCart);
      return { ...state, cart: updatedCart };
    }

    case "REMOVE_CART_ITEM": {
      const updatedFooditem = state.cart.fooditem.filter(
        (_, idx) => idx !== action.payload
      );

      const updatedCart = {
        ...state.cart,
        fooditem: updatedFooditem,
      };

      saveCartToStorage(updatedCart);
      return { ...state, cart: updatedCart };
    }

    case "ADD_SHIPPING_ADDRESS": {
      const updatedCart = {
        ...state.cart,
        shippingAddress: action.payload,
      };

      saveCartToStorage(updatedCart);
      return { ...state, cart: updatedCart };
    }

    case "ADD_PAYMENT_METHOD": {
      const updatedCart = {
        ...state.cart,
        paymentMethod: action.payload,
      };

      saveCartToStorage(updatedCart);
      return { ...state, cart: updatedCart };
    }

    case "CLEAR_FOODITEM": {
      const updatedCart = {
        ...state.cart,
        fooditem: [], // clear all items
      };

      saveCartToStorage(updatedCart);

      return {
        ...state,
        cart: updatedCart,
      };
    }

    case "LOGOUT_USER": {
      localStorage.removeItem("userInfo");
      // Optional: clear cart too
      const clearedCart = {
        fooditem: [],
        shippingAddress: {},
        paymentMethod: "",
      };
      saveCartToStorage(clearedCart);

      return {
        ...state,
        cart: clearedCart,
      };
    }

    default:
      return state;
  }
};

export default reducer;

//dispatch({ type: "CLEAR_FOODITEM" });
