"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Sidebar from "./filterCategory";

export default function Filter() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [isLoading, setIsLoading] = useState(false); // State for loading

	useEffect(() => {
		setIsLoading(true); // Start loading
		const params = new URLSearchParams(searchParams);
		params.set("filter", encodeURIComponent(selectedIndex));
		router.replace(`/${pathname}?${params.toString()}`, { scroll: false });
		setIsLoading(false);

	}, [selectedIndex, router, searchParams, pathname]);

	const filterOptions = [
		"All Articles",
		"Hot Deals",
		"Popular Comparison",
		"Upcoming Gadgets",
		"Latest Gadgets",
	];

	const handleClick = (index) => {
		setSelectedIndex(index);
	};

	return (
		<div className="flex gap-4 phone-sm:flex-col lg:flex-row">
			{isLoading ? ( // Show loading skeleton
				<>
					<div className="skeleton w-24 h-6 bg-gray-300 animate-pulse" />
					<div className="skeleton w-24 h-6 bg-gray-300 animate-pulse" />
					<div className="skeleton w-24 h-6 bg-gray-300 animate-pulse" />
					<div className="skeleton w-24 h-6 bg-gray-300 animate-pulse" />
					<div className="skeleton w-24 h-6 bg-gray-300 animate-pulse" />
				</>
			) : (
				filterOptions.map((option, index) => (
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
				))
			)}
			<div className="phone-sm:block lg:hidden">
				<Sidebar />
			</div>
		</div>
	);
}
