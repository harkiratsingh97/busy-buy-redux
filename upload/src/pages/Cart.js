import { useDispatch, useSelector } from "react-redux";
import { CartProduct } from "../components/CartProduct";

import { orderCart, userSelector } from "../redux/reducers/userReducer";

export const Cart = () => {
	const { user } = useSelector(userSelector);
	const dispatch = useDispatch();

	return (
		<>
			{user && user.cart.length === 0 && (
				<h5 style={{ textAlign: "center", margin: "25px" }}>Nothing in cart</h5>
			)}
			{user && user.cart.length > 0 && (
				<div className="container">
					<br></br>
					<div className="cartValueWrapper">
						<h5>
							Total Price : ₹
							{parseInt(
								user.cart.reduce((sum, prod) => {
									return sum + prod.price * prod.quantity;
								}, 0)
							)}
						</h5>
						<button
							onClick={() => dispatch(orderCart(user))}
							type="button"
							className="btn btn-primary"
						>
							Purchase
						</button>
					</div>
					<div className="productsWrapper">
						{user.cart.map((prod) => {
							return <CartProduct key={prod.id} prod={prod} />;
						})}
					</div>
				</div>
			)}
		</>
	);
};
