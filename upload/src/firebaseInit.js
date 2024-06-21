// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBA-BzW9gPRwgdjLxbDtcdFn4779LeTDdM",
	authDomain: "busybuy-react.firebaseapp.com",
	projectId: "busybuy-react",
	storageBucket: "busybuy-react.appspot.com",
	messagingSenderId: "653598791086",
	appId: "1:653598791086:web:f5e67af3b5fd151bf4243f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
