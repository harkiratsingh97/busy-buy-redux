import { Link } from "react-router-dom";

import { useState } from "react";
import { userSignInAsynkThunk } from "../redux/reducers/userReducer";
import { useDispatch } from "react-redux";

export const SignIn = () => {
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const setSignInData = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const onSubmitSignIn = (e) => {
		e.preventDefault();
		dispatch(userSignInAsynkThunk(formData));
		// addProducts();
		setFormData({ email: "", password: "" });
	};

	return (
		<>
			<div className="d-flex justify-content-center signInContainer">
				<form className="signInForm" onClick={onSubmitSignIn}>
					<h1 className="signInTitle">Sign In</h1>
					<div className="mb-3 mt-5">
						<input
							type="email"
							className="form-control"
							id="exampleFormControlInput1"
							placeholder="name@example.com"
							onChange={setSignInData}
							value={formData.email}
							name="email"
						/>
					</div>
					<div className="mb-3">
						<input
							type="password"
							className="form-control"
							id="exampleFormControlInput2"
							placeholder="password"
							onChange={setSignInData}
							value={formData.password}
							name="password"
						/>
					</div>

					<button type="submit" className="btn btn-primary mb-3 form-control">
						Sign In
					</button>
					<Link to={"/signup"}> Or SignUp instead</Link>
				</form>
			</div>
		</>
	);
};
