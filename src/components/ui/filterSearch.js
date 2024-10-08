"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setName } from "@/redux/fetch.redux";
import Filter from "../filterNav";
import { VscSettings } from "react-icons/vsc";
import { Sheet, SheetContent, SheetTrigger } from "./sheet";

export default function FilterSearch({ categories, brands }) {
	const dispatch = useDispatch();

	const handleChange = (e) => {
		dispatch(setName(e.target.value));
	};

	return (
		<div className="w-full  flex p-5 justify-between items-center">
			{/* Desktop Filter */}
			<div className="phone-sm:hidden lg:block">
				<Filter categories={categories} brands={brands} />
			</div>

			{/* Search Input */}
			<input
				className="rounded-md border text-black px-3 h-8 sm:w-40 sm:text-xs md:w-96 lg:w-80 lg:text-base"
				placeholder="Search"
				onChange={handleChange}
			/>
			{/* Mobile Sheet Trigger */}
			<Sheet>
				<SheetTrigger>
					<VscSettings className="text-2xl cursor-pointer phone-sm:inline lg:hidden" />
				</SheetTrigger>
				<SheetContent className="flex w-full overflow-scroll ">
					<Filter categories={categories} brands={brands} />
				</SheetContent>
			</Sheet>
		</div>
	);
}
