const qrCode = require('qrcode');
const Product = require('../models/product');
const Container = require('../models/container');

// Générer un code QR pour un produit
exports.generateProductQRCode = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const productQRCode = await qrCode.toDataURL(`product_${product._id}`);
    return res.status(200).json({ qrCode: productQRCode });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Générer un code QR pour un contenant
exports.generateContainerQRCode = async (req, res) => {
  try {
    const container = await Container.findById(req.params.containerId);
    if (!container) {
      return res.status(404).json({ message: 'Container not found' });
    }
    const containerQRCode = await qrCode.toDataURL(`container_${container._id}`);
    return res.status(200).json({ qrCode: containerQRCode });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Associer le code QR du contenant avec un produit vendu
exports.linkContainerToProduct = async (req, res) => {
  try {
    const container = await Container.findOne({ qrCode: req.body.containerQRCode });
    if (!container) {
      return res.status(404).json({ message: 'Container not found' });
    }
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    product.container = container._id;
    await product.save();
    res.status(200).json({ message: 'Container linked to product successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};