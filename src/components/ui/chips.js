"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCheckedItems } from "@/redux/fetch.redux";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const Chips = ({ categories, brands }) => {
	const dispatch = useDispatch();
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();
	
	const { checkedItems } = useSelector((state) => state.fetch);

	const getCategoryName = (id) => {
		const category = categories.find((cat) => cat.category_id === id);
		return category ? category.name : "Unknown Category";
	};

	const getBrandName = (id) => {
		const brand = brands.find((br) => br.brand_id === id);
		return brand ? brand.name : "Unknown Brand";
	};

const handleRemove = (type, item) => {
	const updatedCheckedItems = {
		...checkedItems,
		[type]: checkedItems[type].filter((i) => i.id !== item.id),
	};

	dispatch(setCheckedItems(updatedCheckedItems));

	const params = new URLSearchParams(searchParams);
	const paramKey = type === "category" ? "category" : "brand";
	const existingParams = params.getAll(paramKey);

	const updatedParams = existingParams.filter((param) => param !== item.id);
	params.delete(paramKey); 

	updatedParams.forEach((param) => params.append(paramKey, param));

	router.push(`${pathname}?${params.toString()}`);
};


	return (
		<div className="flex flex-wrap gap-2 p-2 h-fit w-fit">
			{Object.keys(checkedItems).map((type) =>
				checkedItems[type].map((item) => (
					<div
						key={`${type}-${item.id}`} 
						className="flex items-center bg-blue-200 text-blue-800 rounded-lg px-3 py-1 text-sm"
					>
						<span>
							{type === "category"
								? getCategoryName(item.id)
								: getBrandName(item.id)}
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
