"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { setFilters, setName } from "@/redux/fetch.redux";

export default function Filter() {
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
		dispatch(setFilters(filterOptions[index])); // Use setFilters to filter articles based on selected option
	};

	const handleChange = (e) => {
		dispatch(setName(e.target.value)); // Dispatch setName action for search
	};

	return (
		<div className="w-full py-5 flex flex-col lg:flex-row md:flex-col sm:flex-col justify-center items-center my-5 gap-4">
			<div className="w-full flex flex-col lg:flex-row gap-4 justify-between items-center sm:px-4 lg:gap-6">
				<div className="flex flex-wrap gap-4">
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
				</div>
				<input
					className="rounded-md border text-black px-3 h-8 sm:w-40 sm:text-xs md:w-96 lg:w-80 lg:text-base"
					placeholder="Search"
					onChange={handleChange}
				/>
			</div>
		</div>
	);
}
