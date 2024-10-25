import { fetchBrands, fetchCategories } from "@/utils/fetchArticles";
import Sidebar from "./filterCategory";

export default async function sidebarServer({ category, brand }) {
	const categories = await fetchCategories();
	const brands = await fetchBrands();
	return (
		<Sidebar
			categories={categories}
			brands={brands}
			category={category}
			brand={brand}
		/>
	);
}
