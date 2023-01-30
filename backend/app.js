const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

const gamesRoutes = require('./routes/games.js')
const userRoutes = require('./routes/user.js')

app.get('/', (req, res) => {
	res.json({ info: 'Steam games rest api' })
})

app.use('/games', gamesRoutes)
app.use('/auth', userRoutes)

app.listen(port, () => {
	console.log(`App running on port ${port}.`)
})
