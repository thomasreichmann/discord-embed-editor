import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable, connectFunctionsEmulator } from 'firebase/functions';
import firebaseConfig from './config';

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);

// TODO: make this based on the current env (prod || dev)
if (process.env.NODE_ENV === 'development') {
	connectFunctionsEmulator(functions, 'localhost', 5001);
}

// Functions from firebase
const generateToken = httpsCallable(functions, 'generateToken');

export async function requestToken(code: string) {
	let response = await generateToken({ code });
	return response;
}
