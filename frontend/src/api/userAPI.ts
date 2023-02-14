import api from './api'

interface registerInterface {
	name: string
	email: string
	password: string
}

interface signinInterface {
	email: string
	password: string
}

export const signinUser = async ({ email, password }: signinInterface) => {
	try {
		let response = await api.post('auth/login', {
			data: {
				email,
				password,
			},
		})

		localStorage.setItem('user', JSON.stringify({ ...response.data }))

		return response.data
	} catch (error: any) {
		return error.response.data.message
	}
}

export const registerUser = async ({
	name,
	email,
	password,
}: registerInterface) => {
	try {
		let response = await api.post('auth/register', {
			data: {
				name,
				email,
				password,
			},
		})

		localStorage.setItem('user', JSON.stringify({ ...response.data }))

		return response.data
	} catch (error: any) {
		return error.response.data.message
	}
}
