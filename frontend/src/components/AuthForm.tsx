import { useState, useContext } from 'react'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { registerUser } from '../api/userAPI'
import { AuthContext, AuthContextType } from '../context/AuthContext'

export default function AuthForm() {
	const { setUserName, setUserEmail, setUserToken, setIsLoggedIn } = useContext(
		AuthContext
	) as AuthContextType

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')

	const [isLoginPage, setIsLoginPage] = useState(true)

	const handleRegister = async (e: any) => {
		e.preventDefault()
		let response: any = {}

		setIsLoading(true)
		response = await registerUser({
			name,
			email,
			password,
		})
		setIsLoading(false)

		if (response && !response?.name) {
			setError(response)
		} else {
			setFormSuccessData(response)
		}
	}

	const handleSignin = (e: any) => {
		e.preventDefault()
		console.log(name, email, password)
	}

	const setFormSuccessData = ({ name, email, token }: any) => {
		setUserName(name)
		setUserEmail(email)
		setUserToken(token)
		setIsLoggedIn(true)
	}

	const handleSwitchLoginPage = (e: any) => {
		e.preventDefault()
		resetFormFields()
		setError('')
		setIsLoginPage(!isLoginPage)
	}

	const resetFormFields = () => {
		setName('')
		setEmail('')
		setPassword('')
	}

	return (
		<>
			<div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
				<div className='w-full max-w-md space-y-8'>
					<div>
						<img
							className='mx-auto h-12 w-auto'
							src='https://tailwindui.com/img/logos/mark.svg?color=blue&shade=600'
							alt='Your Company'
						/>
						<h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
							{isLoginPage
								? 'Sign in to your account'
								: 'Register a new account'}
						</h2>
					</div>

					{error && (
						<div
							className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
							role='alert'
						>
							<strong className='font-bold'>Error! </strong>
							<span className='block sm:inline'>{error}</span>
							<span
								className='absolute top-0 bottom-0 right-0 px-4 py-3'
								onClick={() => setError('')}
							>
								<svg
									className='fill-current h-6 w-6 text-red-500'
									role='button'
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 20 20'
								>
									<title>Close</title>
									<path d='M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z' />
								</svg>
							</span>
						</div>
					)}

					<form className='mt-8 space-y-6' action='#' method='POST'>
						<input type='hidden' name='remember' defaultValue='true' />
						<div className='-space-y-px rounded-md shadow-sm'>
							{!isLoginPage && (
								<div>
									<label htmlFor='full-name' className='sr-only'>
										Full name
									</label>

									<input
										id='full-name'
										name='full-name'
										type='full-name'
										autoComplete='full-name'
										required
										className='relative block w-full appearance-none rounded-sm border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm'
										placeholder='Full name'
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>
							)}

							<div>
								<label htmlFor='email-address' className='sr-only'>
									Email address
								</label>

								<input
									id='email-address'
									name='email'
									type='email'
									autoComplete='email'
									required
									className='relative block w-full appearance-none rounded-sm border border-gray-300 px-3 py-3 mt-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm'
									placeholder='Email address'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>

							<div>
								<label htmlFor='password' className='sr-only'>
									Password
								</label>

								<input
									id='password'
									name='password'
									type='password'
									autoComplete='current-password'
									required
									className='relative block w-full appearance-none rounded-sm border border-gray-300 px-3 py-3 mt-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm'
									placeholder='Password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
						</div>

						{isLoginPage && (
							<div className='flex items-center justify-between'>
								<div className='flex items-center'>
									<input
										id='remember-me'
										name='remember-me'
										type='checkbox'
										className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
									/>
									<label
										htmlFor='remember-me'
										className='ml-2 block text-sm text-gray-900'
									>
										Remember me
									</label>
								</div>

								<div className='text-sm'>
									<a
										href='#'
										className='font-medium text-blue-600 hover:text-blue-500'
									>
										Forgot your password?
									</a>
								</div>
							</div>
						)}

						<div>
							{isLoginPage ? (
								<>
									<button
										type='submit'
										className='group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
										onClick={handleSignin}
										disabled={isLoading}
									>
										<span className='absolute inset-y-0 left-0 flex items-center pl-3'>
											<LockClosedIcon
												className='h-5 w-5 text-blue-500 group-hover:text-blue-400'
												aria-hidden='true'
											/>
										</span>
										Sign in
									</button>

									<button
										onClick={handleSwitchLoginPage}
										className='group relative flex w-full justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 mt-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
										disabled={isLoading}
									>
										Register instead
									</button>
								</>
							) : (
								<>
									<button
										type='submit'
										className='group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
										onClick={handleRegister}
										disabled={isLoading}
									>
										{!isLoading ? (
											'Register'
										) : (
											<div role='status'>
												<svg
													aria-hidden='true'
													className='inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300'
													viewBox='0 0 100 101'
													fill='none'
													xmlns='http://www.w3.org/2000/svg'
												>
													<path
														d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
														fill='currentColor'
													/>
													<path
														d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
														fill='currentFill'
													/>
												</svg>
												<span className='sr-only'>Loading...</span>
											</div>
										)}
									</button>

									<button
										onClick={handleSwitchLoginPage}
										className='group relative flex w-full justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 mt-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
										disabled={isLoading}
									>
										Login instead
									</button>
								</>
							)}
						</div>
					</form>
				</div>
			</div>
		</>
	)
}
