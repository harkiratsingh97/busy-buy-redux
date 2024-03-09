import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRouteLoggedIn = ({ children }) => {
	const { user } = { a: 0 };
	let location = useLocation();

	if (!user) {
		return <Navigate to="/signin" state={{ from: location }} replace />;
	}
	return children;
};
