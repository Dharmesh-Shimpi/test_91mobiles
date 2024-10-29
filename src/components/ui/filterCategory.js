"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";

export default function Sidebar({ categories, brands }) {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();
	const [isPending, startTransition] = useTransition();

	const handleCheckboxChange = (event) => {
		const { name, value, checked } = event.target;
		const params = new URLSearchParams(searchParams);

		if (checked) {
			params.append(name, value);
		} else {
			// Remove the unchecked value from the URLSearchParams
			const updatedParams = params.getAll(name).filter((paramValue) => paramValue !== value);
			params.delete(name);
			updatedParams.forEach((paramValue) => params.append(name, paramValue));
		}

		startTransition(() => {
			router.replace(`${pathname}?${params.toString()}`, { scroll: false });
		});
	};

	const handleClearAll = () => {
		const params = new URLSearchParams(searchParams);
		params.delete("category");
		params.delete("brand");
		router.replace(`${pathname}?${params.toString()}`, { scroll: false });
	};

	const isChecked = (name, id) => {
		const selectedItems = searchParams.getAll(name);
		return selectedItems.includes(id);
	};

	return (
		<div
			searching={isPending ? "" : undefined}
			className="h-fit p-4 w-56 bg-gray-100 border border-gray-300 rounded-lg"
		>
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
					{categories &&
						categories.map((c) => (
							<div key={c.category_id}>
								<label className="inline-flex items-center">
									<input
										type="checkbox"
										name="category"
										value={c.category_id}
										checked={isChecked("category", c.category_id.toString())}
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
					{brands &&
						brands.map((b) => (
							<div key={b.brand_id}>
								<label className="inline-flex items-center">
									<input
										type="checkbox"
										name="brand"
										value={b.brand_id}
										checked={isChecked("brand", b.brand_id.toString())}
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
