const accountController = require('./accountController');
const dataController = require('./dataController');
const userController = require('./userController');
const plateController = require('./plateController');
const circleController = require('./circleController');

const router = (app) => {
	// 登录相关
	app.use('/account', accountController);
	// 数据汇总
	app.use('/data', dataController);
	// 用户相关
	app.use('/user', userController);
	// 板块相关
	app.use('/plate', plateController);
	// 圈子相关
	app.use('/circle', circleController);
};
module.exports = router;
