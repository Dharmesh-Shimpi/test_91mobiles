"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	setCheckedItems,
	applyFilter,
	fetchCategories,
	fetchBrands,
} from "@/redux/fetch.redux";
import { useMediaQuery } from "react-responsive";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "./sheet";


export default function Sidebar() {
	const dispatch = useDispatch();
	const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
	const { checkedItems, categories, brands } = useSelector(
		(state) => state.fetch
	);

	useEffect(() => {
		dispatch(fetchCategories());
		dispatch(fetchBrands());
	}, [dispatch]);

	const handleCheckboxChange = (event) => {
		const { name, value, checked } = event.target;
		const updatedCheckedItems = {
			...checkedItems,
			[name]: checked
				? [...checkedItems[name], value]
				: checkedItems[name].filter((item) => item !== value),
		};
		dispatch(setCheckedItems(updatedCheckedItems));
		dispatch(applyFilter());
	};

	const handleClearAll = () => {
		const clearedCheckedItems = {
			category: [],
			brand: [],
		};
		dispatch(setCheckedItems(clearedCheckedItems));
		dispatch(applyFilter());
	};

	const sidebarContent = (
		<div className="ml-5 p-4 w-56 h-fit bg-gray-100 border border-gray-300 rounded-lg">
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
				<ul className="space-y-2">
					{brands.map((brand) => (
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
		<div className="flex">
			{isMobile ? (
				<Sheet>
					<SheetTrigger className="p-4 bg-blue-500 text-white rounded-lg w-fit h-fit">
						Filters
					</SheetTrigger>
					<SheetContent className="w-full ">
						<SheetHeader>
							<SheetTitle>Filters</SheetTitle>
							<SheetDescription>
								Use these filters to refine your search.
							</SheetDescription>
						</SheetHeader>
						{sidebarContent}
					</SheetContent>
				</Sheet>
			) : (
				<>{sidebarContent}</>
			)}
		</div>
	);
}
