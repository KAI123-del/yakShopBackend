const express = require("express");
const router = express.Router();
const {
  calculateStock,
  getHerdAfterDays,
} = require("../controllers/yakController");

// GET STOCK AFTER T DAYS
router.get("/yak-shop/stock/:days", async (req, res) => {
  const days = parseInt(req.params.days);
  const stock = await calculateStock(days);
  res.json(stock);
});

// GET HERD STATE AFTER T DAYS
router.get("/yak-shop/herd/:days", async (req, res) => {
  const days = parseInt(req.params.days);
  const herd = await getHerdAfterDays(days);
  res.json(herd);
});

module.exports = router;
