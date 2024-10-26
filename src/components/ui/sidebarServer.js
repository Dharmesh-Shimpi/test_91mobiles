import { fetchBrands, fetchCategories } from "@/utils/fetchArticles";
import Sidebar from "./filterCategory";

export default async function sidebarServer({ category, brand }) {
	const categories = await fetchCategories();
	const brands = await fetchBrands();

	let selectedCategories = null;
	let selectedBrands = null;

	if (category ) {
		selectedCategories = Array.isArray(category) ? category : [category];
	}
	if (brand) {
		selectedBrands = Array.isArray(brand) ? brand : [brand];
	}

	return (
		<Sidebar
			categories={categories}
			brands={brands}
			category={selectedCategories}
			brand={selectedBrands}
		/>
	);
}