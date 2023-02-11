import { useReducer, useState } from 'react'
import { LockClosedIcon } from '@heroicons/react/20/solid'

interface formState {
	name: string,
	email: string,
	password: string
}

interface formActions {
	
}

function formReducer(state: formState, action: ) {

}

export default function AuthForm() {
	const [formData, setFormData] = useReducer(formReducer, { name: '' })
	const [isLoginPage, setIsLoginPage] = useState(true)

	const handleSwitchLoginPage = (event: any) => {
		event.preventDefault()

		setIsLoginPage(!isLoginPage)
	}

	const resetFormFields = () => {}

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
									>
										Register instead
									</button>
								</>
							) : (
								<>
									<button
										type='submit'
										className='group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
									>
										Register
									</button>

									<button
										onClick={handleSwitchLoginPage}
										className='group relative flex w-full justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 mt-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
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
