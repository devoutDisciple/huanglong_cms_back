const Sequelize = require('sequelize');
const moment = require('moment');
const config = require('../config/config');
const sequelize = require('../dataSource/MysqlPoolClass');
const circle = require('../models/circle');
const resultMessage = require('../util/resultMessage');
const responseUtil = require('../util/responseUtil');

const Op = Sequelize.Op;
const circleModal = circle(sequelize);
const pagesize = 10;

module.exports = {
	// 分页获取圈子数据
	getCirclesByPage: async (req, res) => {
		try {
			const { current = 1, name } = req.query;
			const condition = { is_delete: 1 };
			if (name) {
				condition.name = {
					[Op.like]: `%${name}%`,
				};
			}
			const commonFields = [
				'id',
				'plate_id',
				'name',
				'desc',
				'fellow',
				'blogs',
				'posts',
				'vote',
				'battle',
				'videos',
				'hot',
				'type',
				'province',
				'city',
				'country',
				'logo',
				'bg_url',
				'create_time',
			];
			const offset = Number((current - 1) * pagesize);
			const plates = await circleModal.findAndCountAll({
				where: condition,
				attributes: commonFields,
				order: [['hot', 'DESC']],
				limit: pagesize,
				offset,
			});
			const result = {
				count: 0,
				list: [],
			};
			if (plates && plates.rows && plates.rows.length !== 0) {
				result.count = plates.count;
				result.list = responseUtil.renderFieldsAll(plates.rows, commonFields);
				result.list.forEach((item) => {
					item.logo = config.preUrl.circleUrl + item.logo;
					item.bg_url = config.preUrl.bgUrl + item.bg_url;
				});
			}
			res.send(resultMessage.success(result));
		} catch (error) {
			console.log(error);
			res.send(resultMessage.error());
		}
	},

	// 删除模块
	deleteById: async (req, res) => {
		try {
			const { plate_id } = req.body;
			if (!plate_id) return res.send(resultMessage.error('无效模块'));
			await circleModal.destroy({
				where: {
					id: plate_id,
				},
			});
			res.send(resultMessage.success('success'));
		} catch (error) {
			console.log(error);
			res.send(resultMessage.error());
		}
	},

	// 新增模块
	addPlate: async (req, res) => {
		try {
			const { name, sort, filename } = req.body;
			await circleModal.create({
				name,
				url: filename,
				sort,
				create_time: moment().format('YYYY-MM-DD HH:mm:ss'),
			});
			res.send(resultMessage.success('success'));
		} catch (error) {
			console.log(error);
			res.send(resultMessage.error());
		}
	},

	// 编辑模块
	editPlate: async (req, res) => {
		try {
			const { id, name, sort, filename } = req.body;
			const data = {
				name,
				sort,
				update_time: moment().format('YYYY-MM-DD HH:mm:ss'),
			};
			if (filename) {
				data.url = filename;
			}
			await circleModal.update(data, { where: { id } });
			res.send(resultMessage.success('success'));
		} catch (error) {
			console.log(error);
			res.send(resultMessage.error());
		}
	},

	// 上传图标
	uploadImg: async (req, res, filename) => {
		try {
			res.send(resultMessage.success(filename));
		} catch (error) {
			console.log(error);
			res.send(resultMessage.error());
		}
	},
};
