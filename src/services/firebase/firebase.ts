import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';
import firebaseConfig from './config';

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);

// Functions from firebase
const generateToken = httpsCallable(functions, 'generateToken');

export async function requestToken(code: string) {
	let response = await generateToken(code);
	return response;
}
