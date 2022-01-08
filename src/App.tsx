import './App.css';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { Route, Routes } from 'react-router';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Redirect from './pages/redirect/Redirect';
import React from 'react';
import { AuthProvider, RequireAuth } from './services/auth';

function App() {
	// TODO: crete seperate css files for all of the pages and remove any in code styles
	const theme = createTheme({
		palette: {
			mode: 'dark',
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<AuthProvider>
				<div className='App'>
					<Routes>
						<Route
							path='/'
							element={
								<RequireAuth>
									<Home />
								</RequireAuth>
							}
						/>
						<Route path='login' element={<Login />} />
						<Route path='redirect' element={<Redirect />} />
					</Routes>
				</div>
			</AuthProvider>
		</ThemeProvider>
	);
}

export default App;
