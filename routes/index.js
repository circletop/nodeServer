const express = require('express');
const router = express.Router();
// const userController = require('../Controllers/Users')


// router.get('/get_user', userController.showUser)
// router.post(`/get_user`, userController.addUser)
// router.delete('/get_user/:id', userController.delUser)
// router.put('/get_user', userController.filterUser)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('../views/index', {title: '小伙伴',waiting: '敬请期待...'})
});
router.post('/', function(req, res, next) {
  res.send({
    a: 1,
    b: 2
  });
});

module.exports = router;
