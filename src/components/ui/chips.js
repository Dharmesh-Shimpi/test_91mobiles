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

	let selectedCategories = null;
	let selectedBrands = null;

	if (category) {
		selectedCategories = Array.isArray(category) ? category : [category];
	}
	if (brand) {
		selectedBrands = Array.isArray(brand) ? brand : [brand];
	}

	return (
		<div className="flex flex-wrap gap-2 p-2 h-fit w-fit">
			{/* Render chips for categories */}
			{(Array.isArray(selectedCategories) &&
				selectedCategories.map((item, i) => (
					<div
						key={i}
						className="flex items-center bg-blue-200 text-blue-800 rounded-lg px-3 py-1 text-sm"
					>
						<span>{item}</span>
						<button
							className="ml-2 text-blue-600 hover:text-blue-800"
							onClick={() => handleRemove("category", item)}
						>
							&times;
						</button>
					</div>
				))) ||
				(Array.isArray(selectedBrands) &&
					selectedBrands.map((item, i) => (
						<div
							key={i}
							className="flex items-center bg-blue-200 text-blue-800 rounded-lg px-3 py-1 text-sm"
						>
							<span>{item}</span>
							<button
								className="ml-2 text-blue-600 hover:text-blue-800"
								onClick={() => handleRemove("brand", item)}
							>
								&times;
							</button>
						</div>
					)))}
		</div>
	);
};

export default Chips;
