"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Loading from "@/components/loading";

export default function Sidebar({ categories, brands, category, brand }) {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();
	let selectedCategories = null;
	let selectedBrands = null;

	if (!categories || !brands) {
		return <Loading />;
	}

	if (category) {
		selectedCategories = Array.isArray(category) ? category : [category];
	}
	if (brand) {
		selectedBrands = Array.isArray(brand) ? brand : [brand];
	}

	const handleCheckboxChange = (event) => {
		const { name, value, checked } = event.target;
		const params = new URLSearchParams(searchParams);

		if (checked) {
			const existingParams = params.getAll(name);
			if (!existingParams.includes(value)) {
				params.append(name, value);
			}
		} else {
			const updatedParams = params
				.getAll(name)
				.filter((paramValue) => paramValue !== value);
			params.delete(name);
			updatedParams.forEach((paramValue) => params.append(name, paramValue));
		}

		router.replace(`${pathname}?${params.toString()}`, { scroll: false });
	};

	const handleClearAll = () => {
		const params = new URLSearchParams(searchParams);
		params.delete("category");
		params.delete("brand");
		router.replace(`${pathname}?${params.toString()}`, { scroll: false });
	};

	return (
		<div className="h-fit p-4 w-56 bg-gray-100 border border-gray-300 rounded-lg">
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-xl font-bold">Filters</h2>
				<button
					className="bg-red-500 text-white px-3 py-1 rounded"
					onClick={handleClearAll}
				>
					Clear All
				</button>
			</div>
			<div className="mb-6">
				<h3 className="text-lg font-semibold mb-2">Category</h3>
				<div className="space-y-2">
					{categories.map((c) => (
						<div key={c.category_id}>
							<label className="inline-flex items-center">
								<input
									type="checkbox"
									name="category"
									value={c.category_id}
									checked={
										selectedCategories &&
										selectedCategories.some((cat) => cat == c.category_id)
									}
									onChange={handleCheckboxChange}
									className="form-checkbox"
								/>
								<span className="ml-2">{c.name}</span>
							</label>
						</div>
					))}
				</div>
			</div>
			<div>
				<h3 className="text-lg font-semibold mb-2">Brands</h3>
				<div className="space-y-2">
					{brands.map((b) => (
						<div key={b.brand_id}>
							<label className="inline-flex items-center">
								<input
									type="checkbox"
									name="brand"
									value={b.brand_id}
									checked={
										selectedBrands &&
										selectedBrands.some((cat) => cat == b.brand_id)
									}
									onChange={handleCheckboxChange}
									className="form-checkbox"
								/>
								<span className="ml-2">{b.name}</span>
							</label>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
