import { getAuth, signInWithCustomToken, User } from 'firebase/auth';
import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

async function singInWithToken(token: string): Promise<User> {
	const auth = getAuth();
	let userCredential = await signInWithCustomToken(auth, token);
	return userCredential.user;
}

async function singOut(): Promise<void> {
	const auth = getAuth();
	return auth.signOut();
}

export function getCurrentUser(): User | null {
	const auth = getAuth();
	return auth.currentUser;
}

interface AuthContextType {
	user: User | null;
	signin: (token: string, callback: VoidFunction) => void;
	signout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	let [user, setUser] = React.useState<User | null>(null);

	let signin = (token: string, callback: VoidFunction) => {
		singInWithToken(token).then(user => {
			setUser(user);
			callback();
		});
	};

	let signout = (callback: VoidFunction) => {
		singOut().then(() => {
			setUser(null);
			callback();
		});
	};

	let value = { user, signin, signout };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	return React.useContext(AuthContext);
}

export function RequireAuth({ children }: { children: JSX.Element }) {
	let auth = useAuth();
	let location = useLocation();

	if (!auth.user) {
		// Redirect them to the /login page, but save the current location they were
		// trying to go to when they were redirected. This allows us to send them
		// along to that page after they login, which is a nicer user experience
		// than dropping them off on the home page.
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return children;
}
