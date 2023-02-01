import { createContext, useState } from 'react'

type AuthContextType = {
	isLoggedIn: boolean
	setIsLoggedIn: (value: boolean) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

const AuthContextProvider = ({ children }: any) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn,
				setIsLoggedIn,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider
