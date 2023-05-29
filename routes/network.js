const { networkAdd, networkGet, networkUpdate } = require('../controller/network')
const express = require('express')
router = express.Router();

// API Router


router.post('/network/add', networkAdd)
router.get('/network/get', networkGet)
router.put('/network/update', networkUpdate)

module.exports = router;