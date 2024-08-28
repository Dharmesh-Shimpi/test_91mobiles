"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { setFilters, setName } from "@/redux/fetch.redux";

export default function Filter() {
	const dispatch = useDispatch();
	const [selectedIndex, setSelectedIndex] = useState(null);

	const handleClick = (index) => {
		setSelectedIndex(index);
		const filterOptions = [
			"Hot Deals",
			"Popular Comparison",
			"Upcoming Gadgets",
			"Latest Gadgets",
			"All Articles",
		];
		dispatch(setFilters(filterOptions[index]));
	};

	const handleChange = (e) => {
		dispatch(setName(e.target.value));
	};

	const filterOptions = [
		"Hot Deals",
		"Popular Comparison",
		"Upcoming Gadgets",
		"Latest Gadgets",
		"All Articles",
	];

	return (
		<div className="w-full flex flex-col lg:flex-row md:flex-col sm:flex-col justify-center items-center my-5">
			<div className="w-fit flex justify-between items-center sm:px-5">
				<div className="flex flex-row ">
					{filterOptions.map((option, index) => (
						<div
							key={index}
							className={`lg:px-2 cursor-pointer lg:text-lg sm:text-xs sm:px-2 ${
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
					className="rounded-md border text-black px-3 h-fit lg:w-96 lg:text-lg sm:text-sm sm:w-52"
					placeholder="Search"
					onChange={handleChange}
				/>
			</div>
		</div>
	);
}
