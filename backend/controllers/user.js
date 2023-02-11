const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const pool = require('../db/db.js')
const secret = process.env.SECERT || 'test'

module.exports.login = async (req, res) => {
	let { email, password } = req.body

	if (email) email = email.toLowerCase()

	if (!name || !email || !password) {
		return res
			.status(400)
			.json({ message: 'please provide all the required fields.' })
	}

	try {
		let { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [
			email,
		])

		if (!rows[0]?.email)
			return res.status(404).json({ message: "User doesn't exist" })

		const isPasswordCorrect = await bcrypt.compare(password, rows[0].password)

		if (!isPasswordCorrect)
			return res.status(400).json({ message: 'Invalid credentials' })

		const token = jwt.sign(
			{ email: rows[0].email, user_id: rows[0].user_id },
			secret,
			{
				expiresIn: '1h',
			}
		)

		res.status(200).json({
			name: rows[0].name,
			email: rows[0].email,
			token,
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({ message: 'Something went wrong' })
	}
}

module.exports.register = async (req, res) => {
	console.log(req.body)

	let { name, email, password } = req.body.data

	if (email) email = email.toLowerCase()

	if (!email || !password) {
		return res
			.status(400)
			.json({ message: 'please provide all the required fields.' })
	}

	try {
		let { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [
			email,
		])

		if (rows[0]?.email)
			return res.status(400).json({ message: 'User already exists' })

		const hashedPassword = await bcrypt.hash(password, 12)

		await pool.query(
			'INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *;',
			[name, email, hashedPassword],
			(error, results) => {
				if (error) {
					return console.log(error)
				}

				const token = jwt.sign(
					{ email: results.rows[0].email, user_id: results.rows[0].user_id },
					secret,
					{
						expiresIn: '1h',
					}
				)

				res.status(201).json({
					name: results.rows[0].name,
					email: results.rows[0].email,
					token: token,
				})
			}
		)
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong' })
		console.log(error)
	}
}
