const express = require('express');
const router = express.Router();

const newsController = require('../app/controllers/NewsControllers');

router.use('/:slug', newsController.show);
router.use('/', newsController.index);

module.exports = router;
// 33:13
