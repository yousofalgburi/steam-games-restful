import api from './api'

interface registerInterface {
	name: string
	email: string
	password: string
}

export const signinUser = () => {}

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
