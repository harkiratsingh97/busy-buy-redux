import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { userSelector } from "../redux/reducers/userReducer";

export const ProtectedRouteLoggedOut = ({ children }) => {
	const {user} = useSelector(userSelector);
	let location = useLocation();

	if (user) {
		return <Navigate to="/" state={{ from: location }} replace />;
	}
	return children;
};
