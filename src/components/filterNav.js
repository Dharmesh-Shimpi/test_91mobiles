"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Sidebar from "./ui/filterCategory";

export default function Filter({ categories, brands }) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [selectedIndex, setSelectedIndex] = useState(0);
	const params = new URLSearchParams(searchParams);
	params.set("filter", encodeURIComponent(selectedIndex));
	router.push(`/?${params.toString()}`);

	const filterOptions = [
		"All Articles",
		"Hot Deals",
		"Popular Comparison",
		"Upcoming Gadgets",
		"Latest Gadgets",
	];

	const handleClick = (index) => {
		const params = new URLSearchParams(searchParams);
		setSelectedIndex(index);
		params.set("filter", encodeURIComponent(index));
		router.push(`/?${params.toString()}`);
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
