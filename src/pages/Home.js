export const Home = () => {
	return (
		<>
			<br></br>
			<div className="container">
				<input
					className="form-control"
					list="datalistOptions"
					id="exampleDataList"
					placeholder="Search By Name"
				/>
				<br></br>

				<div className="card text-center" style={{ width: "18rem" }}>
					<img
						src="https://images-eu.ssl-images-amazon.com/images/I/814iogRTu5L.jpg"
						className="card-img-top"
						alt="..."
					/>
					<div className="card-body">
						<h5 className="card-title">Channel Bag</h5>
						<h5 className="card-text">₹ 500</h5>
						<button  className="btn btn-primary">
							Add to Cart
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
