import { useSelector } from "react-redux";
import ProductsCard from "../components/productsCard";
import { productsSelector } from "../redux/reducers/productReducer";
import { useState } from "react";

export const Home = () => {
	const { products } = useSelector(productsSelector);
	const [inputText, setInputText] = useState("");
	if (!products) {
		return <>Loading Products...</>;
	}

	return (
		<>
			<br></br>
			<div className="container">
				<input
					className="form-control"
					list="datalistOptions"
					id="exampleDataList"
					placeholder="Search By Name"
					onChange={(e) => setInputText(e.target.value)}
					value={inputText}
				/>
				<br></br>
				<div className="productsWrapper">
					{products
						.filter((prod) => {
							if (prod.title.toLowerCase().startsWith(inputText.toLowerCase()))
								return true;
							return false;
						})
						.map((prod, index) => (
							<ProductsCard key={index} prod={prod} />
						))}
				</div>
			</div>
		</>
	);
};
