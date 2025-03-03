const {GetAllProducts,GetProductById} = require('../services/productService');

async function getAllProducts(req, res) {
  try {
    const products = await GetAllProducts();
    res.json(products);
  } catch (err) {
    console.error('Error fetching products', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
}

async function getProductById(req, res) {
  try {
    const productId = req.params.id;
    const product = await GetProductById(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (err) {
    console.error('Error fetching product', err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
}

// ... other controller functions

module.exports = {
  getAllProducts,
  getProductById,
  // ...
};