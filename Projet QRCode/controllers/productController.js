const Product = require('../models/product');
const Container = require('../models/container');

// Création d'un produit avec son nom et son prix
exports.createProduct = async (req, res) => {
  const { name, price } = req.body;

  try {
    const product = await Product.create({ name, price });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Création d'un contenant avec son nom et sa capacité
exports.createContainer = async (req, res) => {
  const { name, capacity } = req.body;

  try {
    const container = await Container.create({ name, capacity });
    res.status(201).json(container);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Liaison d'un produit à un contenant via un QR code
exports.linkProductToContainer = async (req, res) => {
  const { product_id, container_id, qr_code } = req.body;

  try {
    const product = await Product.findById(product_id);
    const container = await Container.findById(container_id);

    if (!product || !container) {
      return res.status(404).json({ error: 'Product or container not found' });
    }

    // Ajout du QR code au produit
    product.qr_code = qr_code;
    await product.save();

    // Ajout du produit au contenant
    container.products.push(product);
    await container.save();

    res.status(200).json({ message: 'Product linked to container successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};