const express = require('express');
const router = express.Router();
const qrCodeController = require('../controllers/qrCodeController');

// POST route to generate and save a new QR code
router.post('/generate', qrCodeController.generateQRCode);

// GET route to retrieve QR code by container ID
router.get('/:id', qrCodeController.getQRCodeByContainerID);

module.exports = router;