const { animatedAdd, animatedGet, animatedGetById, animatedUpdate } = require('../controller/animated')
const express = require('express')
router = express.Router();

//  API Router

router.post('/animated/add', animatedAdd)
router.get('/animated/get', animatedGet)
router.get('/animated/get/id', animatedGetById)
router.put('/animated/update', animatedUpdate)

module.exports = router;



