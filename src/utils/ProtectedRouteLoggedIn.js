import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { userSelector } from "../redux/reducers/userReducer";
import { useSelector } from "react-redux";

export const ProtectedRouteLoggedIn = ({ children }) => {
	const { user } = useSelector(userSelector);
	let location = useLocation();

	if (!user) {
		return <Navigate to="/signin" state={{ from: location }} replace />;
	}
	return (
		<>
			<Outlet></Outlet>
		</>
	);
};
