import { Outlet } from "react-router";
import { Link, NavLink } from "react-router-dom";
import { userSelector } from "../redux/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { usersLogOutAsynkThunk } from "../redux/reducers/userReducer";

export const Navbar = () => {
	const { user } = useSelector(userSelector);
	const dispatch = useDispatch();
	console.log(user);
	return (
		<>
			<nav className="navbar navbar-expand-lg bg-body-tertiary">
				<div className="container-fluid">
					<Link className="navbar-brand" to={""}>
						Busy Buy
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarText"
						aria-controls="navbarText"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarText">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<NavLink className="nav-link" to={"/"}>
									Home
								</NavLink>
							</li>

							{!user && (
								<li className="nav-item">
									<Link className="nav-link" to={"signin"}>
										SignIn
									</Link>
								</li>
							)}
							{user && (
								<>
									<li className="nav-item">
										<NavLink className="nav-link" to={"myorders"}>
											My orders
										</NavLink>
									</li>
									<li className="nav-item">
										<NavLink className="nav-link" to={"cart"}>
											Cart
										</NavLink>
									</li>
									<li className="nav-item">
										<div
											className="nav-link"
											onClick={() => dispatch(usersLogOutAsynkThunk())}
										>
											Logout
										</div>
									</li>
								</>
							)}
						</ul>
					</div>
				</div>
			</nav>
			<Outlet></Outlet>
		</>
	);
};
