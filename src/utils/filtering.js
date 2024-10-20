export default function filtering(searchParams, filteredData) {
	let { filter, search, category, brand } = searchParams;
	filter = Number(filter);

	if (filter !== undefined) {
		if (filter !== 0) {
			filteredData = filteredData.filter((item) => item.tags.includes(filter));
		}
	}

	if (search !== undefined) {
		filteredData = filteredData.filter((item) =>
			item.title.toLowerCase().includes(search.toLowerCase())
		);
	}

	if (category) {
		const selectedCategories = Array.isArray(category) ? category : [category];
		filteredData = filteredData.filter((item) =>
			selectedCategories.includes(item.category)
		);
	}

	if (brand) {
		const selectedBrands = Array.isArray(brand) ? brand : [brand];
		filteredData = filteredData.filter((item) =>
			item.brands.some((b) => selectedBrands.includes(b))
		);
	}

	return filteredData;
}
