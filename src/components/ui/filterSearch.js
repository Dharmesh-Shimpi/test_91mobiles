"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Filter from "./filterNav";
import { VscSettings } from "react-icons/vsc";
import { Sheet, SheetContent, SheetTrigger } from "./sheet";

export default function FilterSearch({ categories, brands }) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const [isPending, startTransition] = useTransition();

	const handleInputChange = (e) => {
		const params = new URLSearchParams(searchParams);
		if (e.target.value) {
			params.set("search", encodeURIComponent(e.target.value));
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
