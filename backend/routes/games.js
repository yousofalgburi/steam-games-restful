const express = require('express')
const { getGames } = require('../controllers/games')
const router = express.Router()

router.get('/getGames', getGames)

module.exports = router
