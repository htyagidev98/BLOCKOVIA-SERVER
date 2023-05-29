const { heroContentAdd, heroContentGet, heroContentUpdate } = require('../controller/home')
const express = require('express')
router = express.Router();


// API Router

router.post('/hero/content/add', heroContentAdd)
router.get('/hero/content/get', heroContentGet)
router.put('/hero/content/update', heroContentUpdate)

module.exports = router;