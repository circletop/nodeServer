const express = require('express');
const router = express.Router();

const tagsController = require('../Controllers/Tags')

router.post('/lists', tagsController.showTags)
router.post('/add', tagsController.addTag)
router.delete('/del/:id', tagsController.delTag)
router.post('/:id', tagsController.modifyTag)


module.exports = router
