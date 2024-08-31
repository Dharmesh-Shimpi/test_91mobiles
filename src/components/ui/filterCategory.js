"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCheckedItems, applyFilter } from "@/redux/fetch.redux";
import { useMediaQuery } from "react-responsive";
import { Sheet, SheetContent, SheetTrigger } from "./sheet";

export default function Sidebar({ categories, brands }) {
	const dispatch = useDispatch();
	const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
	const { checkedItems, name } = useSelector((state) => state.fetch);

	const [searchTerm, setSearchTerm] = useState("");
	const [filteredBrands, setFilteredBrands] = useState(brands);

	useEffect(() => {
		dispatch(applyFilter());
	}, [dispatch, checkedItems, name]);

	useEffect(() => {
		setFilteredBrands(
			brands.filter((brand) =>
				brand.name.toLowerCase().includes(searchTerm.toLowerCase())
			)
		);
	}, [searchTerm, brands]);

	const handleCheckboxChange = (event) => {
		const { name, value, checked } = event.target;
		const updatedCheckedItems = {
			...checkedItems,
			[name]: checked
				? [...checkedItems[name], value]
				: checkedItems[name].filter((item) => item !== value),
		};
		dispatch(setCheckedItems(updatedCheckedItems));
	};

	const handleClearAll = () => {
		const clearedCheckedItems = {
			category: [],
			brand: [],
		};
		dispatch(setCheckedItems(clearedCheckedItems));
	};

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const sidebarContent = (
		<div className="ml-5 h-fit p-4 w-56 bg-gray-100 border border-gray-300 rounded-lg">
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
				<ul className="space-y-2">
					{categories.map((category) => (
						<li key={category.category_id}>
							<label className="inline-flex items-center">
								<input
									type="checkbox"
									name="category"
									value={category.category_id}
									checked={checkedItems.category.includes(category.category_id)}
									onChange={handleCheckboxChange}
									className="form-checkbox"
								/>
								<span className="ml-2">{category.name}</span>
							</label>
						</li>
					))}
				</ul>
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
				<ul className="space-y-2">
					{filteredBrands.map((brand) => (
						<li key={brand.brand_id}>
							<label className="inline-flex items-center">
								<input
									type="checkbox"
									name="brand"
									value={brand.brand_id}
									checked={checkedItems.brand.includes(brand.brand_id)}
									onChange={handleCheckboxChange}
									className="form-checkbox"
								/>
								<span className="ml-2">{brand.name}</span>
							</label>
						</li>
					))}
				</ul>
			</div>
		</div>
	);

	return (
		<div className="relative">
			{isMobile ? (
				<Sheet>
					<SheetTrigger className="p-2 bg-blue-500 text-white rounded-lg w-fit h-fit">
						Additional filters
					</SheetTrigger>
					<SheetContent className="w-full overflow-scroll">
						{sidebarContent}
					</SheetContent>
				</Sheet>
			) : (
				<>{sidebarContent}</>
			)}
		</div>
	);
}
