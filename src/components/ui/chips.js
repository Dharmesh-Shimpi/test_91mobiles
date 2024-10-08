'use client';

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCheckedItems } from "@/redux/fetch.redux";

const Chips = () => {
	const dispatch = useDispatch();
	const { checkedItems, categories, brands } = useSelector(
		(state) => state.fetch
	);

	const getCategoryName = (id) => {
		console.log(id);
		const category = categories.find((cat) => cat.category_id === id.id);
		console.log(category);
		return category ? category.name : "Unknown Category"; 
	};

	const getBrandName = (id) => {
		const brand = brands.find((br) => br.brand_id === id.id);
		return brand ? brand.name : "Unknown Brand"; 
	};

	const handleRemove = (type, item) => {
		const updatedCheckedItems = {
			...checkedItems,
			[type]: checkedItems[type].filter((i) => i !== item),
		};
		dispatch(setCheckedItems(updatedCheckedItems));
	};

	return (
		<div className="flex flex-wrap gap-2 p-2 h-fit w-fit">
			{Object.keys(checkedItems).map((type) =>
				checkedItems[type].map((item) => (
					<div
						key={`${type}-${item}`}
						className="flex items-center bg-blue-200 text-blue-800 rounded-lg px-3 py-1 text-sm"
					>
						<span>
							{type === "category" ? getCategoryName(item) : getBrandName(item)}
						</span>
						<button
							className="ml-2 text-blue-600 hover:text-blue-800"
							onClick={() => handleRemove(type, item)}
						>
							&times;
						</button>
					</div>
				))
			)}
		</div>
	);
};

export default Chips;
