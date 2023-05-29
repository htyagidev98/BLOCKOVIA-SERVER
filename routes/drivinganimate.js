const { drivingAnimateAdd, drivingAnimateGet, drivingAnimateGetById, drivingAnimateUpdate } = require('../controller/drivinganimate')
const express = require('express')
router = express.Router();


// API Router

router.post('/driving/animate/add', drivingAnimateAdd)
router.get('/driving/animate/get', drivingAnimateGet)
router.get('/driving/animate/get/id', drivingAnimateGetById)
router.put('/driving/animate/update', drivingAnimateUpdate)

module.exports = router;