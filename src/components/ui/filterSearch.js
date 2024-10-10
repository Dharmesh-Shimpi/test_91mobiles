"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Filter from "../filterNav";
import { VscSettings } from "react-icons/vsc";
import { Sheet, SheetContent, SheetTrigger } from "./sheet";

export default function FilterSearch({ categories, brands }) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const handleSearchChange = (e) => {
		const searchTerm = e.target.value;

		const params = new URLSearchParams(searchParams);

		if (searchTerm) {
			params.set("search", encodeURIComponent(searchTerm));
		} else {
			params.delete("search");
		}

		// Update the URL with the new search params
		router.push(`${pathname}?${params.toString()}`);
	};

	return (
		<div className="w-full flex p-5 justify-between items-center">
			{/* Desktop Filter */}
			<div className="phone-sm:hidden lg:block">
				<Filter categories={categories} brands={brands} />
			</div>

			{/* Search Input */}
			<input
				className="rounded-md border text-black px-3 h-8 sm:w-40 sm:text-xs md:w-96 lg:w-80 lg:text-base"
				placeholder="Search"
				onChange={handleSearchChange} // Update URL on change
			/>

			{/* Mobile Sheet Trigger */}
			<Sheet>
				<SheetTrigger>
					<VscSettings className="text-2xl cursor-pointer phone-sm:inline lg:hidden" />
				</SheetTrigger>
				<SheetContent className="flex w-full overflow-scroll">
					<Filter categories={categories} brands={brands} />
				</SheetContent>
			</Sheet>
		</div>
	);
}
