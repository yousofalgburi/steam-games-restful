import { createContext, useState } from 'react'

export type AuthContextType = {
	isLoggedIn: boolean
	userName: string
	userEmail: string
	userToken: string
	setIsLoggedIn: (value: boolean) => void
	setUserName: (value: string) => void
	setUserEmail: (value: string) => void
	setUserToken: (value: string) => void
	signOut: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

const AuthContextProvider = ({ children }: any) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [userName, setUserName] = useState('')
	const [userEmail, setUserEmail] = useState('')
	const [userToken, setUserToken] = useState('')

	const signOut = () => {
		setIsLoggedIn(false)
		setUserName('')
		setUserEmail('')
		setUserToken('')
		localStorage.removeItem('user')
	}

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn,
				setIsLoggedIn,
				userName,
				userToken,
				setUserName,
				userEmail,
				setUserEmail,
				setUserToken,
				signOut,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider
