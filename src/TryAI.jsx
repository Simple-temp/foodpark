import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Fade,
} from "@mui/material";
import SendIcon from "@mui/icons-material/RocketLaunch";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import TryAiDataSet from "./TryAiDataSet";

const TryAI = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [typing, setTyping] = useState(false);
  const [firstGreeted, setFirstGreeted] = useState(false);
  const [orderPending, setOrderPending] = useState(false);

  const parsePriceRange = (text) => {
    let m = text.match(/between\s+(\d+)\s*(?:and|-)\s*(\d+)/);
    if (m) return { min: parseInt(m[1], 10), max: parseInt(m[2], 10) };
    m = text.match(/(\d+)\s*[-–]\s*(\d+)/);
    if (m) return { min: parseInt(m[1], 10), max: parseInt(m[2], 10) };
    m = text.match(/\b(?:under|below|less than)\s+(\d+)/);
    if (m) return { max: parseInt(m[1], 10) };
    m = text.match(/\b(?:over|above|more than)\s+(\d+)/);
    if (m) return { min: parseInt(m[1], 10) };
    m = text.match(/(?:price|cost|৳|tk|taka)?\s*[:\-]?\s*(\d+)\s*(?:৳|tk|taka)?/);
    if (m) return { min: parseInt(m[1], 10), max: parseInt(m[1], 10) };
    return null;
  };

  const parsePrepTimeRange = (text) => {
    let m = text.match(/between\s+(\d+)\s*(?:and|-)\s*(\d+)\s*(?:min|mins|minutes)/i);
    if (m) return { min: parseInt(m[1], 10), max: parseInt(m[2], 10) };
    m = text.match(/(\d+)\s*[-–]\s*(\d+)\s*(?:min|mins|minutes)/i);
    if (m) return { min: parseInt(m[1], 10), max: parseInt(m[2], 10) };
    m = text.match(/\b(?:under|below|less than)\s+(\d+)\s*(?:min|mins|minutes)/i);
    if (m) return { max: parseInt(m[1], 10) };
    m = text.match(/\b(?:over|above|more than)\s+(\d+)\s*(?:min|mins|minutes)/i);
    if (m) return { min: parseInt(m[1], 10) };
    return null;
  };

  const findMealByName = (text) => {
    const lower = text.toLowerCase();
    return TryAiDataSet.meals.find((m) => {
      const nameLower = m.name.toLowerCase();
      if (lower.includes(nameLower)) return true;
      const words = nameLower.split(/\s+/).filter(Boolean);
      return words.every((w) => lower.includes(w));
    });
  };

  const findCategoryInText = (text) => {
    const lower = text.toLowerCase();
    return TryAiDataSet.categories.find((c) => lower.includes(c.toLowerCase()));
  };

  const findOriginInText = (text) => {
    const lower = text.toLowerCase();
    const origins = [...new Set(TryAiDataSet.meals.map(m => m.origin.toLowerCase()))];
    return origins.find(o => lower.includes(o));
  };

  const findIngredientToken = (text) => {
    const lower = text.toLowerCase();
    const ingredientsSet = new Set();
    TryAiDataSet.meals.forEach((m) =>
      (m.ingredients || "")
        .toLowerCase()
        .split(/[,\s]+/)
        .map((t) => t.trim())
        .filter(Boolean)
        .forEach((i) => ingredientsSet.add(i))
    );
    for (const ing of Array.from(ingredientsSet)) {
      if (ing.length >= 2 && lower.includes(ing)) return ing;
    }
    return null;
  };

  const isPositiveResponse = (text) => {
    const lower = text.toLowerCase().trim();
    return /(yes|yeah|sure|okay|ok|yep|indeed|definitely|positive)/i.test(lower);
  };

  const isNegativeResponse = (text) => {
    const lower = text.toLowerCase().trim();
    return /(no|nah|nope|negative|not)/i.test(lower);
  };

  const hasOrderKw = (text) => {
    const lower = text.toLowerCase().trim();
    return /\b(order|buy|purchase|place order|get|want to buy)\b/i.test(lower);
  };

  const generateResponse = (text) => {
    const lower = text.toLowerCase().trim();

    // Handle order conversation flow
    if (orderPending) {
      if (isPositiveResponse(text)) {
        setOrderPending(false);
        // Redirect to the link
        setTimeout(() => {
          window.open('http://localhost:5174/our-recipes', '_blank');
        }, 1000);
        return "Great! Redirecting you to our recipes page to place your order. Enjoy your food! 🍽️";
      } else if (isNegativeResponse(text)) {
        setOrderPending(false);
        return "No problem! So, do you need details on any meal or anything else? Feel free to ask!";
      } else {
        return "Sorry, I didn't catch that. Do you want to buy food? (Yes/No)";
      }
    }

    // Detect order keywords and start order flow
    if (hasOrderKw(lower)) {
      setOrderPending(true);
      return "I see you're interested in ordering! Do you want to buy food? (Yes/No)";
    }

    // Greetings
    if (!firstGreeted && /(hi|hello|hlw|hey)/i.test(lower)) {
      setFirstGreeted(true);
      return "Hello! Welcome 👋 How can I help you today?";
    }
    if (firstGreeted && /(hi|hello|hlw|hey)/i.test(lower)) {
      return "What do you need or what you want?";
    }

    const priceRange = parsePriceRange(lower);
    const prepTimeRange = parsePrepTimeRange(lower);
    const hasPriceKw = /\b(price|cost|how much|৳|tk|taka|costs|cost)\b/.test(lower) || !!priceRange;
    const hasBenefitKw = /\b(benefit|benefits|good for|advantage|advantages|why)\b/.test(lower);
    const hasIngredientKw = /\b(ingredient|ingredients|contain|contains|with|without|include|includes)\b/.test(lower);
    const hasCaloriesKw = /\b(calorie|calories|kcal)\b/.test(lower);
    const hasCategoryKw = /\b(category|type|cuisine|kind)\b/.test(lower) || !!findCategoryInText(lower);
    const hasOriginKw = /\b(origin|from|country|where)\b/.test(lower) || !!findOriginInText(lower);
    const hasSpicyKw = /\b(spicy|spice|hot|mild|medium|high|low)\b/.test(lower);
    const hasVegKw = /\b(vegetarian|veg|vegan|non-veg|non veg|nonvegetarian)\b/.test(lower);
    const hasPrepKw = /\b(prepar|cook|time|min|mins|minutes|quick|fast)\b/.test(lower) || !!prepTimeRange;
    const hasNewestKw = /\b(newest|new|latest|recent)\b/.test(lower);
    const hasListKw = /\b(list|show|all|menu|meals|foods)\b/.test(lower);
    
    // New keywords for 5 additional features
    const hasAllergyKw = /\b(allergy|allergic|allergies|intolerant|intolerance)\b/.test(lower);
    const hasDietaryReqKw = /\b(gluten|dairy|lactose|nut|peanut|shellfish|halal|kosher|dietary)\b/.test(lower);
    const hasPopularKw = /\b(popular|best selling|top|favorite|favourite|most ordered)\b/.test(lower);
    const hasComboKw = /\b(combo|combination|set|meal deal|package)\b/.test(lower);
    const hasSpecialKw = /\b(special|limited|exclusive|seasonal|promotion|offer|discount)\b/.test(lower);

    const meal = findMealByName(lower);
    const ingredientToken = findIngredientToken(lower);

    if (meal) {
      const out = [];
      if (hasPriceKw || priceRange) out.push(`${meal.name} costs ${meal.price}৳.`);
      if (hasBenefitKw) out.push(`${meal.name} benefit: ${meal.benefit}`);
      if (hasIngredientKw) out.push(`${meal.name} ingredients: ${meal.ingredients}`);
      if (hasCaloriesKw) out.push(`${meal.name} has about ${meal.calories} calories.`);
      if (hasCategoryKw) out.push(`${meal.name} belongs to ${meal.category} category.`);
      if (hasOriginKw) out.push(`${meal.name} origin: ${meal.origin}`);
      if (hasSpicyKw) out.push(`${meal.name} spicy level: ${meal.spicyLevel}`);
      if (hasVegKw) out.push(`${meal.name} is ${meal.isVegetarian ? "Vegetarian ✅" : "Non-Vegetarian ❌"}`);
      if (hasPrepKw) out.push(`${meal.name} takes about ${meal.preparationTime} mins to prepare.`);
      if (hasNewestKw) out.push(`${meal.name} is ${meal.newest ? "one of the newest items." : "not among the newest."}`);

      if (out.length === 0) {
        return [
          `— ${meal.name} —`,
          `Price: ${meal.price}৳`,
          `Benefit: ${meal.benefit}`,
          `Ingredients: ${meal.ingredients}`,
          `Calories: ${meal.calories}`,
          `Category: ${meal.category}`,
          `Origin: ${meal.origin}`,
          `Spicy level: ${meal.spicyLevel}`,
          `Vegetarian: ${meal.isVegetarian ? "Yes" : "No"}`,
          `Preparation time: ${meal.preparationTime} mins`,
          `Newest: ${meal.newest ? "Yes" : "No"}`,
        ].join("\n");
      }
      return out.join("\n");
    }

    if (priceRange) {
      let filtered = TryAiDataSet.meals.filter((m) => {
        if (priceRange.min != null && priceRange.max != null) return m.price >= priceRange.min && m.price <= priceRange.max;
        if (priceRange.min != null) return m.price >= priceRange.min;
        if (priceRange.max != null) return m.price <= priceRange.max;
        return false;
      });
      if (filtered.length > 0) return `Meals matching price range:\n${filtered.map((m) => `${m.name} - ${m.price}৳`).join("\n")}`;
    }

    // Feature 1: Preparation time filtering
    if (prepTimeRange || (hasPrepKw && !meal)) {
      let filtered = TryAiDataSet.meals.filter((m) => {
        const time = m.preparationTime;
        if (prepTimeRange?.min != null && prepTimeRange?.max != null) return time >= prepTimeRange.min && time <= prepTimeRange.max;
        if (prepTimeRange?.min != null) return time >= prepTimeRange.min;
        if (prepTimeRange?.max != null) return time <= prepTimeRange.max;
        return time <= 15;
      });
      if (filtered.length > 0) return `Quick preparation meals (under ${prepTimeRange?.max || 15} mins):\n${filtered.map((m) => `${m.name} - ${m.preparationTime} mins (${m.price}৳)`).join("\n")}`;
    }

    // Feature 2: Origin-based filtering
    if (hasOriginKw) {
      const foundOrigin = findOriginInText(lower);
      if (foundOrigin) {
        const items = TryAiDataSet.meals.filter((m) => m.origin.toLowerCase() === foundOrigin);
        if (items.length > 0) return `Meals from ${foundOrigin}:\n${items.map((m) => `${m.name} - ${m.price}৳ (${m.category})`).join("\n")}`;
        return `No meals from ${foundOrigin} found. Available origins: ${[...new Set(TryAiDataSet.meals.map(m => m.origin))].join(", ")}`;
      }
    }

    if (ingredientToken) {
      const filtered = TryAiDataSet.meals.filter((m) => (m.ingredients || "").toLowerCase().includes(ingredientToken));
      if (filtered.length > 0) return `Meals with "${ingredientToken}":\n${filtered.map((m) => `${m.name} - ${m.price}৳ (${m.category})`).join("\n")}`;
    }

    // Feature 3: Allergy and dietary requirements
    if (hasAllergyKw || hasDietaryReqKw) {
      let filtered = TryAiDataSet.meals;
      
      if (lower.includes('gluten') || lower.includes('gluten-free')) {
        filtered = filtered.filter(m => !m.ingredients.toLowerCase().includes('flour') && !m.ingredients.toLowerCase().includes('wheat') && !m.ingredients.toLowerCase().includes('bread'));
      }
      if (lower.includes('dairy') || lower.includes('lactose')) {
        filtered = filtered.filter(m => !m.ingredients.toLowerCase().includes('cheese') && !m.ingredients.toLowerCase().includes('milk'));
      }
      if (lower.includes('nut') || lower.includes('peanut')) {
        filtered = filtered.filter(m => !m.ingredients.toLowerCase().includes('nut') && !m.ingredients.toLowerCase().includes('peanut'));
      }
      if (lower.includes('vegetarian') || lower.includes('veg')) {
        filtered = filtered.filter(m => m.isVegetarian);
      }
      if (lower.includes('vegan')) {
        filtered = filtered.filter(m => m.isVegetarian && !m.ingredients.toLowerCase().includes('cheese') && !m.ingredients.toLowerCase().includes('egg'));
      }
      
      if (filtered.length > 0) return `Dietary-friendly options:\n${filtered.map((m) => `${m.name} - ${m.price}৳ (${m.ingredients})`).join("\n")}`;
      return "I've filtered based on your dietary needs. You might want to check our Salad or custom options!";
    }

    if (hasVegKw) {
      const vegs = TryAiDataSet.meals.filter((m) => m.isVegetarian);
      if (vegs.length > 0) return `Vegetarian options:\n${vegs.map((m) => `${m.name} - ${m.price}৳`).join("\n")}`;
    }

    // Feature 4: Popular/best-selling items
    if (hasPopularKw) {
      const popular = TryAiDataSet.meals.filter(m => m.newest || m.price < 100);
      if (popular.length > 0) return `Most popular items:\n${popular.map((m) => `${m.name} - ${m.price}৳ (${m.category})`).join("\n")}`;
    }

    if (hasCategoryKw) {
      const foundCat = findCategoryInText(lower);
      if (foundCat) {
        const items = TryAiDataSet.meals.filter((m) => m.category.toLowerCase() === foundCat.toLowerCase());
        if (items.length > 0) return `${foundCat} foods:\n${items.map((m) => `${m.name} - ${m.price}৳`).join("\n")}`;
      }
      return `Available categories: ${TryAiDataSet.categories.join(", ")}`;
    }

    // Feature 5: Meal combos and recommendations
    if (hasComboKw) {
      const combos = [
        "Burger + Fries + Drink Combo - 120৳",
        "Pizza + Garlic Bread Combo - 180৳",
        "Pasta + Salad Combo - 130৳",
        "Biryani + Raita Combo - 200৳"
      ];
      return `Available meal combos:\n${combos.join("\n")}\n\nAsk about any specific combo for details!`;
    }

    // Feature 6: Special offers and promotions
    if (hasSpecialKw) {
      const specials = TryAiDataSet.meals.filter(m => m.newest).map(m => `${m.name} - Special introductory price: ${m.price - 10}৳ (Save 10৳!)`);
      if (specials.length > 0) return `Current special offers:\n${specials.join("\n")}`;
      return "Check our newest items for special introductory prices!";
    }

    if (hasSpicyKw) return `Spicy levels:\n${TryAiDataSet.meals.map((m) => `${m.name}: ${m.spicyLevel || "N/A"}`).join("\n")}`;
    if (hasNewestKw) return `Newest foods:\n${TryAiDataSet.meals.filter((m) => m.newest).map((m) => `${m.name} - ${m.price}৳`).join("\n")}`;
    if (hasCaloriesKw) return `Calories list:\n${TryAiDataSet.meals.map((m) => `${m.name} - ${m.calories} kcal`).join("\n")}`;
    if (hasIngredientKw) return `Ingredients for foods:\n${TryAiDataSet.meals.map((m) => `${m.name}: ${m.ingredients}`).join("\n")}`;
    if (hasPrepKw) return `Preparation times:\n${TryAiDataSet.meals.map((m) => `${m.name} - ${m.preparationTime} mins`).join("\n")}`;
    if (hasPriceKw) return `Prices:\n${TryAiDataSet.meals.map((m) => `${m.name} - ${m.price}৳`).join("\n")}`;
    if (hasListKw) return `Menu:\n${TryAiDataSet.meals.map((m) => `${m.name} - ${m.price}৳ (${m.category})`).join("\n")}`;

    // If nothing specific matched, return generic menu with suggestion to order
    return `Here are some meals you can explore:\n${TryAiDataSet.meals.map((m) => `${m.name} - ${m.price}৳ (${m.category})`).join("\n")}\n\nType "order" if you're ready to buy!`;
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setHistory((prev) => [...prev, input]);
    setTyping(true);

    setTimeout(() => {
      const reply = generateResponse(input);
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
      setTyping(false);
    }, 700);

    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  const deleteHistoryItem = (index) => setHistory((prev) => prev.filter((_, i) => i !== index));

  const clearChat = () => {
    setMessages([]);
    setOrderPending(false);
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{ backgroundColor: "#1976d2", borderRadius: "8px", px: 3 }}
        onClick={() => setOpen(true)}
      >
        Try AI
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg" fullWidth>
        <DialogContent sx={{ width: "900px", height: "700px", display: "flex", p: 0 }}>
          {/* Left side history */}
          <Box sx={{ width: "300px", borderRight: "1px solid #ddd", p: 2, display: "flex", flexDirection: "column" }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">History</Typography>
              <IconButton onClick={clearChat} title="Clear chat">
                <AddIcon />
              </IconButton>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ flex: 1, overflowY: "auto" }}>
              <List>
                {history.map((h, i) => (
                  <ListItem
                    key={i}
                    secondaryAction={
                      <IconButton edge="end" onClick={() => deleteHistoryItem(i)} size="small">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    }
                  >
                    <ListItemText 
                      primary={h.length > 50 ? h.substring(0, 50) + "..." : h} 
                      sx={{ cursor: "pointer" }}
                      onClick={() => setInput(h)}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>

          {/* Right side chat */}
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", p: 2 }}>
            <Box sx={{ flex: 1, overflowY: "auto", mb: 2 }}>
              {messages.map((msg, i) => (
                <Fade in key={i} timeout={500}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                      mb: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        background: msg.sender === "user" ? "#1976d2" : "#f1f1f1",
                        color: msg.sender === "user" ? "#fff" : "#000",
                        p: 1.5,
                        borderRadius: "10px",
                        maxWidth: "70%",
                        whiteSpace: "pre-line",
                        fontSize: "14px",
                        lineHeight: "1.4",
                      }}
                    >
                      {msg.text}
                    </Typography>
                  </Box>
                </Fade>
              ))}
              {typing && (
                <Typography variant="body2" sx={{ fontStyle: "italic", color: "gray", ml: 1 }}>
                  AI is thinking<span className="dot-flash">...</span>
                </Typography>
              )}
            </Box>

            {/* Input */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder={orderPending ? "Type yes or no..." : "Ask about meals, prices, or type 'order' to buy..."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                size="small"
              />
              <IconButton 
                color="primary" 
                onClick={handleSend}
                disabled={!input.trim()}
                sx={{ 
                  backgroundColor: "#1976d2", 
                  color: "white",
                  '&:hover': { backgroundColor: "#1565c0" },
                  '&:disabled': { backgroundColor: "#ccc" }
                }}
              >
                <SendIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      <style>
        {`
          .dot-flash::after {
            content: ' .';
            animation: dots 1.5s steps(5, end) infinite;
          }
          @keyframes dots {
            0%, 20% { content: ' .'; }
            40% { content: ' ..'; }
            60% { content: ' ...'; }
            80%, 100% { content: ''; }
          }
        `}
      </style>
    </>
  );
};

export default TryAI;