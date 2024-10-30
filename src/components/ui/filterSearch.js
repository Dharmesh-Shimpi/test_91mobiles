"use client";

import { memo } from "react";
import { useTransition, useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Filter from "./filterNav";
import { VscSettings } from "react-icons/vsc";
import { Sheet, SheetContent, SheetTrigger } from "./sheet";

export default function FilterSearch({ categories, brands }) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const [isPending, startTransition] = useTransition();

	const [searchTerm, setSearchTerm] = useState("");

	const handleInputChange = (e) => {
		setSearchTerm(e.target.value);
		const params = new URLSearchParams(searchParams);
		if (searchTerm) {
			params.set("search", encodeURIComponent(searchTerm));
		} else {
			params.delete("search");
		}

		startTransition(() => {
			router.replace(`${pathname}?${params.toString()}`, { scroll: false });
		});
	};

	return (
		<>
			{/* Desktop Filter */}
			<div className="phone-sm:hidden lg:block">
				<Filter categories={categories} brands={brands} />
			</div>

			{/* Search Input */}
			<input
				value={searchTerm}
				onChange={handleInputChange}
				searching={isPending ? "" : undefined}
				className="rounded-md border text-black px-3 h-8 sm:w-40 sm:text-xs md:w-96 lg:w-80 lg:text-base"
				placeholder="Search"
			/>

			{/* Mobile Sheet Trigger */}
			<Sheet>
				<SheetTrigger className="phone-sm:inline lg:hidden">
					<VscSettings className="text-2xl cursor-pointer" />
				</SheetTrigger>
				<SheetContent className="flex w-full overflow-scroll">
					<Filter categories={categories} brands={brands} />
				</SheetContent>
			</Sheet>
		</>
	);
}
