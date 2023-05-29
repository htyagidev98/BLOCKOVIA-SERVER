const { communityAdd, communityGet, communityUpdate } = require('../controller/community')
const express = require('express')
router = express.Router();

// API Router

router.post('/community/add', communityAdd)
router.get('/community/get', communityGet)
router.put('/community/update', communityUpdate)

module.exports = router;