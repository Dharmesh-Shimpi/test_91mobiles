import { fetchBrands, fetchCategories } from "@/utils/fetchArticles";
import Sidebar from "./filterCategory";

export default async function sidebarServer() {
	const categories = await fetchCategories();
	const brands = await fetchBrands();

	return <Sidebar categories={categories} brands={brands} />;
}
