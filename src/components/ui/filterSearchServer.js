import { fetchBrands, fetchCategories } from "@/utils/fetchArticles";
import Filter from "./filterSearch";

export default async function FilterSearchServer() {
	const categories = await fetchCategories();
	const brands = await fetchBrands();

	return <Filter categories={categories} brands={brands} />;
}
