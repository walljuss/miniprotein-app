import { initializeApp } from "firebase/app";
import {
	getAuth,
	setPersistence,
	signInWithEmailAndPassword,
	browserSessionPersistence,
} from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyBpy3qyI8wV7sAu5YEqh3UFn8kdAUr70gs",
	authDomain: "mini-uniprot-96998.firebaseapp.com",
	projectId: "mini-uniprot-96998",
	storageBucket: "mini-uniprot-96998.appspot.com",
	messagingSenderId: "38637554789",
	appId: "1:38637554789:web:f95336f50af18046ab4a8c",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
setPersistence(auth, browserSessionPersistence);

export { auth };
