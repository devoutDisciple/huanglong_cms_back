const express = require('express');
const multer = require('multer');
const ObjectUtil = require('../util/ObjectUtil');
const config = require('../config/config');

const router = express.Router();
const contentService = require('../services/contentService');

let filename = '';
// 使用硬盘存储模式设置存放接收到的文件的路径以及文件名
const storage = multer.diskStorage({
	destination(req, file, cb) {
		// 接收到文件后输出的保存路径（若不存在则需要创建）
		cb(null, config.circlePath);
	},
	filename(req, file, cb) {
		// 将保存文件名设置为 随机字符串 + 时间戳名，比如 JFSDJF323423-1342342323.png
		filename = `${ObjectUtil.getName()}-${Date.now()}.png`;
		cb(null, filename);
	},
});
const upload = multer({ dest: config.circlePath, storage });

// 分页获取内容
router.get('/contentsByPage', (req, res) => {
	contentService.getContentsByPage(req, res);
});

// 新增圈子
router.post('/add', (req, res) => {
	contentService.addCircle(req, res);
});

// 上传模块图片
router.post('/upload', upload.single('file'), (req, res) => {
	contentService.uploadImg(req, res, filename);
});

// 删除圈子
router.post('/delete', (req, res) => {
	contentService.deleteCircle(req, res);
});

// 编辑圈子
router.post('/edit', (req, res) => {
	contentService.editCircle(req, res);
});

// 获取所有圈子
router.get('/circlesDetail', (req, res) => {
	contentService.getAllCirclesDetail(req, res);
});

module.exports = router;
