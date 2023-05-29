const { footprintAdd, footprintGet, footprintUpdate } = require('../controller/footprint')
const express = require('express')
router = express.Router();

// API Router

router.post('/footprint/add', footprintAdd)
router.get('/footprint/get', footprintGet)
router.put('/footprint/update', footprintUpdate)

module.exports = router;