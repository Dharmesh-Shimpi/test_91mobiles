"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCheckedItems } from "@/redux/fetch.redux";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function Sidebar({ categories, brands }) {
	const dispatch = useDispatch();
	const { checkedItems } = useSelector((state) => state.fetch);

	const [searchTerm, setSearchTerm] = useState("");
	const [filteredBrands, setFilteredBrands] = useState(brands);

	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		setFilteredBrands(
			brands.filter((brand) =>
				brand.name.toLowerCase().includes(searchTerm.toLowerCase())
			)
		);
	}, [searchTerm, brands]);

	const handleCheckboxChange = (event) => {
		const { name, value, checked } = event.target;

		const selectedName =
			name === "category"
				? categories.find((category) => category.category_id === value)?.name
				: brands.find((brand) => brand.brand_id === value)?.name;

		const updatedCheckedItems = {
			...checkedItems,
			[name]: checked
				? [...checkedItems[name], { id: value, name: selectedName }]
				: checkedItems[name].filter((item) => item.id !== value),
		};

		dispatch(setCheckedItems(updatedCheckedItems));

		const params = new URLSearchParams(searchParams);

		if (checked) {
			const existingParams = params.getAll(name);
			if (!existingParams.includes(value)) {
				params.append(name, value); 
			}
		} else {
			
			const existingParams = params
				.getAll(name)
				.filter((paramValue) => paramValue !== value);
			params.delete(name); 
			existingParams.forEach((paramValue) => params.append(name, paramValue));
		}

		router.push(`${pathname}?${params.toString()}`);
	};


	const handleClearAll = () => {
		dispatch(setCheckedItems({ category: [], brand: [] }));

		const params = new URLSearchParams(searchParams);
		params.delete("category");
		params.delete("brand");
		router.push(`${pathname}?${params.toString()}`);
	};

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	return (
		<div className="h-fit p-4 w-56 bg-gray-100 border border-gray-300 rounded-lg">
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-xl font-bold">Filters</h2>
				<button
					className="bg-red-500 text-white px-3 py-1 rounded"
					onClick={handleClearAll}
				>
					Clear All
				</button>
			</div>
			<div className="mb-6">
				<h3 className="text-lg font-semibold mb-2">Category</h3>
				<div className="space-y-2">
					{categories.map((category) => (
						<div key={category.category_id}>
							<label className="inline-flex items-center">
								<input
									type="checkbox"
									name="category"
									value={category.category_id}
									checked={checkedItems.category.some(
										(item) => item.id === category.category_id
									)}
									onChange={handleCheckboxChange}
									className="form-checkbox"
								/>
								<span className="ml-2">{category.name}</span>
							</label>
						</div>
					))}
				</div>
			</div>
			<div>
				<h3 className="text-lg font-semibold mb-2">Brands</h3>
				<input
					type="text"
					placeholder="Search brands..."
					value={searchTerm}
					onChange={handleSearchChange}
					className="w-full p-2 mb-4 border border-gray-300 rounded"
				/>
				<div className="space-y-2">
					{filteredBrands.map((brand) => (
						<div key={brand.brand_id}>
							<label className="inline-flex items-center">
								<input
									type="checkbox"
									name="brand"
									value={brand.brand_id}
									checked={checkedItems.brand.some(
										(item) => item.id === brand.brand_id
									)}
									onChange={handleCheckboxChange}
									className="form-checkbox"
								/>
								<span className="ml-2">{brand.name}</span>
							</label>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
