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

  const generateResponse = (text) => {
    const lower = text.toLowerCase().trim();

    // Greetings
    if (!firstGreeted && /(hi|hello|hlw|hey)/i.test(lower)) {
      setFirstGreeted(true);
      return "Hello! Welcome 👋 How can I help you today?";
    }
    if (firstGreeted && /(hi|hello|hlw|hey)/i.test(lower)) {
      return "What do you need or what you want?";
    }

    const priceRange = parsePriceRange(lower);
    const hasPriceKw = /\b(price|cost|how much|৳|tk|taka|costs|cost)\b/.test(lower) || !!priceRange;
    const hasBenefitKw = /\b(benefit|benefits|good for|advantage|advantages|why)\b/.test(lower);
    const hasIngredientKw = /\b(ingredient|ingredients|contain|contains|with|without|include|includes)\b/.test(lower);
    const hasCaloriesKw = /\b(calorie|calories|kcal)\b/.test(lower);
    const hasCategoryKw = /\b(category|type|cuisine|kind)\b/.test(lower) || !!findCategoryInText(lower);
    const hasOriginKw = /\b(origin|from|country|where)\b/.test(lower);
    const hasSpicyKw = /\b(spicy|spice|hot|mild|medium|high|low)\b/.test(lower);
    const hasVegKw = /\b(vegetarian|veg|vegan|non-veg|non veg|nonvegetarian)\b/.test(lower);
    const hasPrepKw = /\b(prepar|cook|time|min|mins|minutes)\b/.test(lower);
    const hasNewestKw = /\b(newest|new|latest|recent)\b/.test(lower);
    const hasListKw = /\b(list|show|all|menu|meals|foods)\b/.test(lower);

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

    if (ingredientToken) {
      const filtered = TryAiDataSet.meals.filter((m) => (m.ingredients || "").toLowerCase().includes(ingredientToken));
      if (filtered.length > 0) return `Meals with "${ingredientToken}":\n${filtered.map((m) => `${m.name} - ${m.price}৳ (${m.category})`).join("\n")}`;
    }

    if (hasVegKw) {
      const vegs = TryAiDataSet.meals.filter((m) => m.isVegetarian);
      if (vegs.length > 0) return `Vegetarian options:\n${vegs.map((m) => `${m.name} - ${m.price}৳`).join("\n")}`;
    }

    if (hasCategoryKw) {
      const foundCat = findCategoryInText(lower);
      if (foundCat) {
        const items = TryAiDataSet.meals.filter((m) => m.category.toLowerCase() === foundCat.toLowerCase());
        if (items.length > 0) return `${foundCat} foods:\n${items.map((m) => `${m.name} - ${m.price}৳`).join("\n")}`;
      }
      return `Available categories: ${TryAiDataSet.categories.join(", ")}`;
    }

    if (hasSpicyKw) return `Spicy levels:\n${TryAiDataSet.meals.map((m) => `${m.name}: ${m.spicyLevel || "N/A"}`).join("\n")}`;
    if (hasNewestKw) return `Newest foods:\n${TryAiDataSet.meals.filter((m) => m.newest).map((m) => `${m.name} - ${m.price}৳`).join("\n")}`;
    if (hasCaloriesKw) return `Calories list:\n${TryAiDataSet.meals.map((m) => `${m.name} - ${m.calories} kcal`).join("\n")}`;
    if (hasIngredientKw) return `Ingredients for foods:\n${TryAiDataSet.meals.map((m) => `${m.name}: ${m.ingredients}`).join("\n")}`;
    if (hasPriceKw) return `Prices:\n${TryAiDataSet.meals.map((m) => `${m.name} - ${m.price}৳`).join("\n")}`;
    if (hasListKw) return `Menu:\n${TryAiDataSet.meals.map((m) => `${m.name} - ${m.price}৳ (${m.category})`).join("\n")}`;

    // If nothing specific matched, return generic menu
    return `Here are some meals you can explore:\n${TryAiDataSet.meals.map((m) => `${m.name} - ${m.price}৳ (${m.category})`).join("\n")}`;
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

  return (
    <>
      <Button
        variant="contained"
        sx={{ backgroundColor: "#1976d2", borderRadius: "8px", px: 3 }}
        onClick={() => setOpen(true)}
      >
        Try AI
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg">
        <DialogContent sx={{ width: "900px", height: "700px", display: "flex", p: 0 }}>
          {/* Left side history */}
          <Box sx={{ width: "300px", borderRight: "1px solid #ddd", p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">History</Typography>
              <IconButton onClick={() => setMessages([])}>
                <AddIcon />
              </IconButton>
            </Box>
            <Divider sx={{ my: 1 }} />
            <List>
              {history.map((h, i) => (
                <ListItem
                  key={i}
                  secondaryAction={
                    <IconButton edge="end" onClick={() => deleteHistoryItem(i)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  }
                >
                  <ListItemText primary={h} />
                </ListItem>
              ))}
            </List>
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
                      }}
                    >
                      {msg.text}
                    </Typography>
                  </Box>
                </Fade>
              ))}
              {typing && (
                <Typography variant="body2" sx={{ fontStyle: "italic", color: "gray", ml: 1 }}>
                  Typing<span className="dot-flash">...</span>
                </Typography>
              )}
            </Box>

            {/* Input */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <IconButton color="primary" onClick={handleSend}>
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
