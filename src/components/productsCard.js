import React from "react";
import { addToCartForUser, userSelector } from "../redux/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";

const ProductsCard = ({ prod }) => {
	const { user } = useSelector(userSelector);
	const dispatch = useDispatch();
	return (
		<div className="card text-center" style={{ width: "18rem" }}>
			<div className="imgContainer">
				<img src={prod.image} className="card-img-top" alt="..." />
			</div>
			<div className="card-body">
				<h6 className="card-title">{prod.title.slice(0, 30)}</h6>
				<h5 className="card-text">₹ {prod.price}</h5>
				<button
					className="btn btn-primary"
					onClick={() => dispatch(addToCartForUser({ prodId: prod.id, user }))}
				>
					Add to Cart
				</button>
			</div>
		</div>
	);
};

export default ProductsCard;
