"use client";

import React from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const Chips = ({ category, brand }) => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const handleRemove = (type, item) => {
		const paramKey = type === "category" ? "category" : "brand";
		const params = new URLSearchParams(searchParams);
		const existingParams = params.getAll(paramKey);

		const updatedParams = existingParams.filter((param) => param !== item);
		params.delete(paramKey);
		updatedParams.forEach((param) => params.append(paramKey, param));

		router.replace(`${pathname}?${params.toString()}`, { scroll: false });
	};

	const combinedItems = [
		...(Array.isArray(category)
			? category.map((item) => ({ ...item, type: "category" }))
			: []),
		...(Array.isArray(brand)
			? brand.map((item) => ({ ...item, type: "brand" }))
			: []),
	];

	return (
		<div className="flex flex-wrap gap-2 p-2 h-fit w-fit">
			{combinedItems.map((item, i) => (
				<div
					key={i}
					className="flex items-center bg-blue-200 text-blue-800 rounded-lg px-3 py-1 text-sm"
				>
					<span>{item.name}</span>
					<button
						className="ml-2 text-blue-600 hover:text-blue-800"
						onClick={() => handleRemove(item.type, item[`${item.type}_id`])}
					>
						&times;
					</button>
				</div>
			))}
		</div>
	);
};

export default Chips;
