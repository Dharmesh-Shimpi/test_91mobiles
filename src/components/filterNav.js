"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { setFilters } from "@/redux/fetch.redux";
import Sidebar from "./ui/filterCategory";

export default function Filter({ categories, brands }) {
	const dispatch = useDispatch();
	const [selectedIndex, setSelectedIndex] = useState(null);

	const filterOptions = [
		"Hot Deals",
		"Popular Comparison",
		"Upcoming Gadgets",
		"Latest Gadgets",
		"All Articles",
	];

	const handleClick = (index) => {
		setSelectedIndex(index);	
		dispatch(setFilters(filterOptions[index]));
	};

	return (
		<div className="flex gap-4 phone-sm:flex-col lg:flex-row">
			{filterOptions.map((option, index) => (
				<div
					key={index}
					className={`cursor-pointer text-sm lg:text-base ${
						selectedIndex === index
							? "font-bold border-b-2 border-red-500 transition-colors"
							: "text-black"
					}`}
					onClick={() => handleClick(index)}
				>
					{option}
				</div>
			))}
			<div className="phone-sm:block lg:hidden">
				<Sidebar categories={categories} brands={brands} />
			</div>
		</div>
	);
}
