const express = require('express');
const router = express.Router();
// const userController = require('../Controllers/Users')


// router.get('/get_user', userController.showUser)
// router.post(`/get_user`, userController.addUser)
// router.delete('/get_user/:id', userController.delUser)
// router.put('/get_user', userController.filterUser)

/* GET home page. */
/**
 * [{
 *   path: '',
 *   method: '',
 *   description: ''
 * }]
 */
router.get('/', function (req, res, next) {
  res.render('../views/index', {
    title: '小伙伴',
    waiting: '敬请期待...',
    table: [{
      path: '/users/lists',
      method: 'post',
      description: '查询人员列表'
    },{
      path: '/users//add',
      method: 'post',
      description: '增加人员'
    },{
      path: '/users/update/:id',
      method: 'put',
      description: '更新选中人员信息'
    },{
      path: '/users/del/:id',
      method: 'delete',
      description: '删除选中人员'
    },{
      path: '/users/profile/:id',
      method: 'get',
      description: '查询人员信息'
    },]
  })
});
router.post('/', function (req, res, next) {
  res.send({
    a: 1,
    b: 2
  });
});

module.exports = router;
