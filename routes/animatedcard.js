const { animatedCardAdd, animatedCardGet, animatedCardGetById, animatedCardUpdate } = require('../controller/animatedcard')
const express = require('express')
router = express.Router();


// API Router

router.post('/animated/card/add', animatedCardAdd)
router.get('/animated/card/get', animatedCardGet)
router.get('/animated/card/get/id', animatedCardGetById)
router.put('/animated/card/update', animatedCardUpdate)

module.exports = router;





