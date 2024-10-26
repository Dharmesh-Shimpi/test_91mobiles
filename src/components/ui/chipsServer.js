import { fetchBrands, fetchCategories } from "@/utils/fetchArticles";
import Chips from "./chips";

export default async function ChipsServer({ category, brand }) {
	const categories = await fetchCategories();
	const brands = await fetchBrands();

	let selectedCategories = null;
	let selectedBrands = null;

	if (category) {
		selectedCategories = Array.isArray(category) ? category : [category];
	}

	if (brand) {
		selectedBrands = Array.isArray(brand) ? brand : [brand];
	}

	if (selectedCategories) {
		selectedCategories = categories.filter((c) =>
			selectedCategories.includes(c.category_id)
		);
	}

	if (selectedBrands) {
		selectedBrands = brands.filter((b) => selectedBrands.includes(b.brand_id));
	}

	// console.log("cat :", selectedCategories, "brn :", selectedBrands);

	return (
		<Chips
			categories={categories}
			brands={brands}
			category={selectedCategories}
			brand={selectedBrands}
		/>
	);
}
