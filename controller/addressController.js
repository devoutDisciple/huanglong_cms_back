const express = require('express');

const router = express.Router();
const addressService = require('../services/addressService');

// 获取地区
router.get('/all', (req, res) => {
	addressService.getAll(req, res);
});

module.exports = router;
