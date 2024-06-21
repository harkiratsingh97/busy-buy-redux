import { useSelector } from "react-redux";
import { Order } from "../components/order";
import { userSelector } from "../redux/reducers/userReducer";

export const MyOrders = () => {
	const { user } = useSelector(userSelector);
	if (!user.orders) {
		return <></>;
	}
	const orders = user.orders;

	return (
		<div
			className=""
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
			}}
		>
			<h2 style={{ textAlign: "center" }}>Your Orders</h2>

			{orders.map((order, index) => (
				<Order key={index} order={order} />
			))}
		</div>
	);
};
