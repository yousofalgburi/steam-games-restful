import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AuthPage from './components/AuthPage'
import { AuthContext, AuthContextType } from './context/AuthContext'
import { useContext, useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'

export default function App() {
	const { setUserName, setUserEmail, setUserToken, setIsLoggedIn, isLoggedIn } =
		useContext(AuthContext) as AuthContextType

	let user = JSON.parse(localStorage.getItem('user') || '{}')

	useEffect(() => {
		if (user && user?.name) {
			const { name, email, token } = user

			setUserName(name)
			setUserEmail(email)
			setUserToken(token)
			setIsLoggedIn(true)
		}
	}, [user])

	return (
		<BrowserRouter>
			<Navbar />

			<Routes>
				<Route
					path='/'
					element={isLoggedIn ? <Home /> : <Navigate to='/auth' />}
				/>

				<Route
					path='/auth'
					element={!isLoggedIn ? <AuthPage /> : <Navigate to='/' />}
				/>

				<Route
					path='/*'
					element={!isLoggedIn ? <AuthPage /> : <Navigate to='/' />}
				/>
			</Routes>
		</BrowserRouter>
	)
}
