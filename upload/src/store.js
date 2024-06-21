import { configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./redux/reducers/userReducer";
import { productsReducer } from "./redux/reducers/productReducer";

export const store = configureStore({
	reducer: { userReducer, productsReducer },
});
