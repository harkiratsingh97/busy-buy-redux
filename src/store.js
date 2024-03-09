import { configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./redux/reducers/userReducer";

export const store = configureStore({
	reducer: { userReducer },
});
