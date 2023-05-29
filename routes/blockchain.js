const { blockchainAdd, blockchainGet, blockchainContentUpdate } = require('../controller/blockchain')
const express = require('express')
router = express.Router();


// API Router

router.post('/blockchain/add', blockchainAdd)
router.get('/blockchain/get', blockchainGet)
router.put('/blockchain/content/update', blockchainContentUpdate)

module.exports = router;