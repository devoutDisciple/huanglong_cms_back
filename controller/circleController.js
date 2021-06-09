const express = require('express');
const multer = require('multer');
const ObjectUtil = require('../util/ObjectUtil');
const config = require('../config/config');

const router = express.Router();
const circleService = require('../services/circleService');

let filename = '';
// 使用硬盘存储模式设置存放接收到的文件的路径以及文件名
const storage = multer.diskStorage({
	destination(req, file, cb) {
		// 接收到文件后输出的保存路径（若不存在则需要创建）
		cb(null, config.platePath);
	},
	filename(req, file, cb) {
		// 将保存文件名设置为 随机字符串 + 时间戳名，比如 JFSDJF323423-1342342323.png
		filename = `${ObjectUtil.getName()}-${Date.now()}.png`;
		cb(null, filename);
	},
});
const upload = multer({ dest: config.platePath, storage });

// 分页获取圈子
router.get('/circlesByPage', (req, res) => {
	circleService.getCirclesByPage(req, res);
});

// 删除模块
router.post('/deleteById', (req, res) => {
	circleService.deleteById(req, res);
});

// 新增模块
router.post('/add', (req, res) => {
	circleService.addPlate(req, res);
});

// 编辑模块
router.post('/edit', (req, res) => {
	circleService.editPlate(req, res);
});

// 上传模块图片
router.post('/upload', upload.single('file'), (req, res) => {
	circleService.uploadImg(req, res, filename);
});

module.exports = router;
