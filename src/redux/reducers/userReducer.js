import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
} from "firebase/auth";
import { db } from "../../firebaseInit";
import { doc, getDoc, setDoc } from "firebase/firestore";

const initialState = { user: null };

const auth = getAuth();

export const userChangeAsynkThunk = createAsyncThunk(
	"user/userChange",
	async (args, thunkApi) => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				thunkApi.dispatch(getUserExtras(user.toJSON()));
			} else {
				// User is signed out
				thunkApi.dispatch(setUser(null));
				console.log("Signed out user");
			}
		});
	}
);

// Get Users cart and orders Asynk Thunk
const getUserExtras = createAsyncThunk(
	"userSetExtras",
	async (user, thunkApi) => {
		const q = doc(db, "users", user.uid);
		const docSnap = await getDoc(q);
		if (docSnap.exists()) {
			const userData = docSnap.data();
			if (userData.cart) {
				try {
					const cart = await Promise.all(
						userData.cart.map(async (val) => {
							try {
								const prodRef = doc(db, "products", val.id);
								const docRef = await getDoc(prodRef);
								if (docRef.exists()) {
									return {
										...docRef.data(),
										id: docRef.id,
										quantity: val.quantity,
									};
								} else {
									console.error("Document does not exist:", val.productRef);
									return null; // Handle error gracefully
								}
							} catch (error) {
								console.error("Error fetching document:", error);
								return null; // Handle error gracefully
							}
						})
					);
					user.cart = [...cart.filter((item) => item !== null)];
					user.orders = [];
					if (userData.orders) {
						user.orders = [...userData.orders];
					}
				} catch (error) {
					console.error("Error fetching cart items:", error);
				}
			} else {
				user.cart = [];
			}
		} else {
			console.error("No such document!");
			// setUserDetails({ uid: user.uid, cart: [] }); // Handle error gracefully
		}

		thunkApi.dispatch(setUser(user));
	}
);

// Sign Up Asynk thunk
export const userSignUpAsynkThunk = createAsyncThunk(
	"user/userSignUp",
	async (formData, thunkApi) => {
		// console.log(formData);
		createUserWithEmailAndPassword(auth, formData.email, formData.password)
			.then((userCredential) => {
				const user = userCredential.user;
				setUser(user);
				const docRef = doc(db, "users", user.uid); // Creating a DocumentReference
				setDoc(docRef, { cart: [] });
				// console.log(user);
			})
			.catch((error) => {
				// const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorMessage);
			});
	}
);

//	Logout Asynk Thunk
export const usersLogOutAsynkThunk = createAsyncThunk(
	"user/logout",
	async (args, thunkApi) => {
		signOut(auth)
			.then(() => {
				// Sign-out successful.
			})
			.catch((error) => {
				// An error happened.
			});
	}
);

//	Sign in Asynk Thunk
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
				// const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorMessage);
			});
	}
);

// Add to cart for User Asynk Thunk
export const addToCartForUser = createAsyncThunk(
	"addToCart",
	async (args, thunkApi) => {
		const { user, prodId } = args;

		if (!user) {
			return;
		}
		const userRef = doc(db, "users", user.uid);
		const existingProductIndex = user.cart.findIndex(
			(item) => item.id === prodId
		);
		let updatedCart = [];

		// If the product exists, update its quantity
		if (existingProductIndex > -1) {
			updatedCart = user.cart.map((item, index) => {
				if (index === existingProductIndex) {
					return {
						...item,
						quantity: item.quantity + 1, // Increase quantity
					};
				}
				return item;
			});

			const dbCart = updatedCart.map((item) => ({
				id: item.id,
				quantity: item.quantity,
			}));

			await setDoc(userRef, {
				orders: user.orders,
				cart: dbCart,
			});
		}
		// If the product doesn't exist, add it to the cart
		else {
			const prodRef = doc(db, "products", prodId);

			let addedProd = await getDoc(prodRef);
			updatedCart = [
				...user.cart,
				{ ...addedProd.data(), id: addedProd.id, quantity: 1 },
			];

			const dbCart = updatedCart.map((item) => ({
				id: item.id,
				quantity: item.quantity,
			}));
			// console.log(dbCart);
			await setDoc(userRef, {
				orders: user.orders,
				cart: dbCart,
			});
		}

		thunkApi.dispatch(setCart(updatedCart));
	}
);

// Remove From Cart For User Asynk Thunk
export const removeFromCartForUser = createAsyncThunk(
	"removeFromCart",
	async (args, thunkApi) => {
		const { user, prodId } = args;

		if (!user) {
			return;
		}

		const userRef = doc(db, "users", user.uid);
		const existingProductIndex = user.cart.findIndex(
			(item) => item.id === prodId
		);

		let updatedCart = [];

		// If the product exists, remove it from the cart
		if (existingProductIndex > -1) {
			updatedCart = user.cart.filter(
				(item) => !(item.id === prodId && item.quantity === 1)
			);

			updatedCart = updatedCart.map((item, index) => {
				if (item.id === prodId) {
					return {
						...item,
						quantity: item.quantity - 1, // Increase quantity
					};
				}
				return item;
			});

			const dbCart = updatedCart.map((item) => ({
				id: item.id,
				quantity: item.quantity,
			}));

			await setDoc(userRef, { orders: user.orders, cart: dbCart });
			thunkApi.dispatch(setCart(updatedCart)); // Dispatch action to update the Redux store
		}
	}
);

// Order Items in Cart Asynk Thunk
export const orderCart = createAsyncThunk(
	"orderCart",
	async (user, thunkApi) => {
		try {
			if (user.cart.length > 0) {
				const userRef = doc(db, "users", user.uid);
				const order = { order: [...user.cart], date: Date() };

				await setDoc(userRef, {
					cart: [],
					orders: [...user.orders, order],
				});

				thunkApi.dispatch(setOrders(order));
			}
		} catch (e) {
			console.log(e);
		}
	}
);

// User Redux Slice
const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		setCart: (state, action) => {
			state.user.cart = action.payload;
		},
		setOrders: (state, action) => {
			state.user.cart = [];
			state.user.orders.push(action.payload);
		},
	},
});

export const userReducer = userSlice.reducer;

export const { setUser, setCart, setOrders } = userSlice.actions;

export const userSelector = (state) => state.userReducer;
