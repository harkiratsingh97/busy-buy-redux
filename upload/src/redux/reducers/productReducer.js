import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebaseInit";
import { collection, getDocs } from "firebase/firestore";

const initialState = { products: null };

// Get Products from DB Asynk Thunk
export const getProductsFromFireStore = createAsyncThunk(
	"getProductsFromFirestore",
	async (args, thunkApi) => {
		const querySnapshot = await getDocs(collection(db, "products"));
		let products = [];
		querySnapshot.forEach((doc) => {
			products.push({ ...doc.data(), id: doc.id });
		});
		thunkApi.dispatch(setProducts(products));
	}
);
const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		setProducts: (state, action) => {
			state.products = action.payload;
		},
	},
});

export const productsReducer = productsSlice.reducer;

export const { setProducts } = productsSlice.actions;

export const productsSelector = (state) => state.productsReducer;
