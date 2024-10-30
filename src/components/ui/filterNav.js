"use client";

import { memo } from "react";
import Form from "next/form";
import { useTransition, useOptimistic, useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function Filter() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const [isPending, startTransition] = useTransition();
	const [selectedIndex, setSelectedIndex] = useState(0);
	// const [selectedIndex, setSelectedIndex] = useOptimistic(0, (prev, next) => next);
	// console.log(selectedIndex);
	const params = new URLSearchParams(searchParams);
	const check = params.get("filter");
	if (!check) {
		startTransition(() => {
			router.replace(`${pathname}?filter=0`, { scroll: false });
		});
	}

	const filterOptions = [
		"All Articles",
		"Hot Deals",
		"Popular Comparison",
		"Upcoming Gadgets",
		"Latest Gadgets",
	];

	const handleClick = (index) => {
		const params = new URLSearchParams(searchParams);
		params.set("filter", encodeURIComponent(index));
		// setSelectedIndexState(index);
		startTransition(() => {
			setSelectedIndex(index);
			router.replace(`${pathname}?${params.toString()}`, { scroll: false });

			// console.log(selectedIndex);
		});
	};

	return (
		<Form
			key={searchParams.tab}
			action="/"
			searching={isPending ? "" : undefined}
			className="flex gap-4 phone-sm:flex-col lg:flex-row"
		>
			{filterOptions.map((option, index) => (
				<div
					key={index}
					className={`cursor-pointer text-sm lg:text-base ${
						selectedIndex === index
							? "font-bold border-b-2 border-red-500 transition-colors"
							: "text-black"
					}`}
					onClick={() => !isPending && handleClick(index)}
				>
					{option}
				</div>
			))}
		</Form>
	);
}
