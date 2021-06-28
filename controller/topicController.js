const express = require('express');

const router = express.Router();
const topicService = require('../services/topicService');

// 根据圈子id获取话题
router.get('/allByCircleId', (req, res) => {
	topicService.getAllByCircleId(req, res);
});

module.exports = router;
