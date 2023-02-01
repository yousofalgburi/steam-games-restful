import Home from './components/home'
import Navbar from './components/navbar'
import AuthContextProvider from './context/AuthContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthPage from './components/AuthPage'

export default function App() {
	return (
		<AuthContextProvider>
			<BrowserRouter>
				<Navbar />

				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/auth' element={<AuthPage />} />
				</Routes>
			</BrowserRouter>
		</AuthContextProvider>
	)
}
