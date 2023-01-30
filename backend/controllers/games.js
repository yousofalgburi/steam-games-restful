const pool = require('../db/db.js')

module.exports.getGames = async (req, res) => {
	try {
		let results = await pool.query('SELECT * FROM steam_games LIMIT 100;')

		res.status(200).json(results?.rows)
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: 'Something went wrong' })
	}
}
