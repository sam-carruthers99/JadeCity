require('dotenv').config();
const express = require('express');
const router = express.Router();

const PRINTIFY_API_KEY = process.env.PRINTIFY_API_KEY;
const PRINTIFY_SHOP_ID = process.env.PRINTIFY_SHOP_ID;

router.get('/', async (req, res) => {
  try {
    const { default: fetch } = await import('node-fetch');

    const response = await fetch(
      `https://api.printify.com/v1/shops/${PRINTIFY_SHOP_ID}/products.json`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${PRINTIFY_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error('Error fetching products:', errorDetails);
      return res.status(response.status).json({
        error: errorDetails.message || 'Failed to fetch products'
      });
    }

    const products = await response.json();
    res.json(products.data);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

module.exports = router;
