const sequelize = require('../dataSource/MysqlPoolClass');
const resultMessage = require('../util/resultMessage');
const address = require('../models/address');

const addressModal = address(sequelize);

// 获取地区列表树形结构
const getAddressByTree = (list, item_id) => {
	const arr = [];
	list.forEach((item) => {
		if (item.parent_id === item_id) {
			const obj = { value: item.id, label: item.name };
			arr.push(obj);
			if (item.type !== 3) {
				obj.children = getAddressByTree(list, item.id);
			}
		}
	});
	return arr;
};

module.exports = {
	// 获取所有地区
	getAll: async (req, res) => {
		try {
			const addressAll = await addressModal.findAll({ where: { is_delete: 1 }, order: [['sort', 'DESC']] });
			const newList = getAddressByTree(addressAll, -1);
			res.send(resultMessage.success(newList));
		} catch (error) {
			console.log(error);
			res.send(resultMessage.error());
		}
	},
};
