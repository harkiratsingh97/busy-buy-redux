import React from "react";

const Order = ({ order }) => {
	return (
		<>
			<br></br>
			<h5 style={{ textAlign: "center" }}>
				{" "}
				Ordered On {order.date.slice(0, 15)}
			</h5>
			<table cellSpacing="10" cellPadding="10">
				<thead>
					<tr>
						<th>Title</th>
						<th>Price</th>
						<th>Quantity</th>
						<th>Total Price</th>
					</tr>
				</thead>
				<tbody>
					{order.order.map((item) => (
						<tr key={item.id}>
							<td>{item.title.slice(0, 100)}</td>
							<td>₹ {item.price}</td>
							<td>{item.quantity}</td>
							<td>{item.quantity * item.price}</td>
						</tr>
					))}
				</tbody>
				<tfoot>
					<tr>
						<td></td>
						<td></td>
						<td></td>
						<td>
							₹ {parseInt(
								order.order.reduce((totalPrice, item) => {
									return item.quantity * item.price + totalPrice;
								}, 0)
							)}
						</td>
					</tr>
				</tfoot>
			</table>
		</>
	);
};

export { Order };
