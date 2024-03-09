import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
} from "firebase/auth";
import { db } from "../../firebaseInit";
import { doc, setDoc, writeBatch } from "firebase/firestore";

const initialState = { user: null };

const auth = getAuth();

export const userChangeAsynkThunk = createAsyncThunk(
	"user/userChange",
	async (args, thunkApi) => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				thunkApi.dispatch(setUser(user.toJSON()));
			} else {
				// User is signed out
				thunkApi.dispatch(setUser(null));
				console.log("Signed out user");
			}
		});
	}
);

export const userSignUpAsynkThunk = createAsyncThunk(
	"user/userSignUp",
	async (formData, thunkApi) => {
		console.log(formData);
		createUserWithEmailAndPassword(auth, formData.email, formData.password)
			.then((userCredential) => {
				const user = userCredential.user;
				setUser(user);
				const docRef = doc(db, "users", user.uid); // Creating a DocumentReference
				setDoc(docRef, { cart: [] });
				console.log(user);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorMessage);
			});
	}
);

export const usersLogOutAsynkThunk = createAsyncThunk(
	"user/logout",
	async (args, thunkApi) => {
		console.log("here");
		signOut(auth)
			.then(() => {
				// Sign-out successful.
			})
			.catch((error) => {
				// An error happened.
			});
	}
);

export const userSignInAsynkThunk = createAsyncThunk(
	"user/userSignIn",
	async (formData, thunkApi) => {
		signInWithEmailAndPassword(auth, formData.email, formData.password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				setUser(user);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorMessage);
			});
	}
);

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action) => {
			console.log(action.payload);
			state.user = action.payload;
		},
	},
});

export const userReducer = userSlice.reducer;

export const { setUser } = userSlice.actions;

export const userSelector = (state) => state.userReducer;
