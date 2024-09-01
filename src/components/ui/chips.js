"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCheckedItems } from "@/redux/fetch.redux";

const Chips = () => {
	const dispatch = useDispatch();
	const { checkedItems } = useSelector((state) => state.fetch);

	const getCategoryName = (id) => {
		const { category } = checkedItems;
		return category.find((cat) => cat.category_id === id);
		console.log(category);
	};

	const getBrandName = (id) => {
		const { brand } = checkedItems;
		const item = brand.find((br) => br.brand_id === id);
		console.log(item);
	};

	const handleRemove = (type, value) => {
		const updatedCheckedItems = {
			...checkedItems,
			[type]: checkedItems[type].filter((item) => item !== value),
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
