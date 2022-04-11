const express = require('express');
const router = express.Router();

const userController = require('../Controllers/Users')


/**
 * GET users default views.
 */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/**
 *  查询列表
 */
router.post('/lists', userController.showUsers)
/**
 *  新增
 */
router.post('/add', userController.addUser)
/**
 * 修改
 */
router.put('/update/:id', userController.updateUser)
/**
 * 删除
 */
router.delete('/del/:id', userController.deleteUser)
/**
 * 根据Id 查询用户信息
 */
router.get('/profile/:id', userController.addUser)

module.exports = router;
