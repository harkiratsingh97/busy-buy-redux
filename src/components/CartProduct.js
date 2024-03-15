import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addToCartForUser,
	removeFromCartForUser,
	userSelector,
} from "../redux/reducers/userReducer";

export const CartProduct = ({ prod }) => {
	const dispatch = useDispatch();
	const { user } = useSelector(userSelector);
	// console.log(prod);
	return (
		<>
			{prod && (
				<div className="card text-center" style={{ width: "18rem" }}>
					<div className="imgContainer">
						<img src={prod.image} className="card-img-top" alt="..." />
					</div>
					<div className="card-body">
						<h6 className="card-title">{prod.title.slice(0, 30)}</h6>

						<h5 className="card-text">₹ {prod.price}</h5>

						<button
							className="btn btn-primary"
							onClick={() =>
								dispatch(removeFromCartForUser({ prodId: prod.id, user }))
							}
						>
							-
						</button>
						<h5 className="card-text" style={{ display: "inline" }}>
							{" "}
							{prod.quantity}{" "}
						</h5>

						<button
							className="btn btn-primary"
							onClick={() =>
								dispatch(addToCartForUser({ prodId: prod.id, user }))
							}
						>
							+
						</button>
					</div>
				</div>
			)}
		</>
	);
};
