import "./App.css";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { SignIn } from "./pages/SignIn";

//Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//User Context

import { MyOrders } from "./pages/MyOrders";
import { SignUp } from "./pages/SignUp";
import { Cart } from "./pages/Cart";
import { ProtectedRouteLoggedIn } from "./utils/ProtectedRouteLoggedIn";
import { ProtectedRouteLoggedOut } from "./utils/ProtectedRouteLoggedOut";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userChangeAsynkThunk } from "./redux/reducers/userReducer";
import { getProductsFromFireStore } from "./redux/reducers/productReducer";

//Routing Implementation
const router = createBrowserRouter([
	{
		path: "/",
		element: <Navbar />,
		//   loader: rootLoader,
		children: [
			{
				path: "",
				element: <Home />,
				//   loader: teamLoader,
			},

			{
				path: "signin",
				element: (
					<ProtectedRouteLoggedOut>
						<SignIn />
					</ProtectedRouteLoggedOut>
				),
			},
			{
				path: "signup",
				element: (
					<ProtectedRouteLoggedOut>
						<SignUp />
					</ProtectedRouteLoggedOut>
				),
			},
			{
				path: "",
				element: <ProtectedRouteLoggedIn />,
				children: [
					{
						path: "myorders",
						element: <MyOrders />,
					},
					{
						path: "cart",
						element: <Cart />,
					},
				],
			},
		],
	},
]);

function App() {
	const dispatch = useDispatch();
	// const { user } = useSelector(userSelector);
	useEffect(() => {
		dispatch(userChangeAsynkThunk());
		dispatch(getProductsFromFireStore());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// if (!user) {
	// 	return <>Loading</>;
	// }
	return (
		// <UserContextProvider>
		<div className="App">
			<RouterProvider router={router} />
		</div>
		// </UserContextProvider>
	);
}

export default App;
