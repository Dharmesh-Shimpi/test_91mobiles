import {
	fetchArticles,
	fetchBrands,
	fetchCategories,
} from "@/utils/fetchArticles";
import Featured from "@/components/featured";
import TopAndMain from "@/components/main";
import Sidebar from "@/components/ui/filterCategory";
import Chips from "@/components/ui/chips";
import Hidden from "@/components/hiddenSEO";
import FilterSearch from "@/components/ui/filterSearch";

export default async function Home() {
	const initialArticles = await fetchArticles();
	const categories = await fetchCategories();
	const brands = await fetchBrands();

	return (
		<div className="flex flex-col items-center ">
			<Featured
				data={initialArticles}
				categories={categories}
				brands={brands}
			/>
			<FilterSearch categories={categories} brands={brands} />
			<div className="flex flex-col md:flex-row md:justify-between w-full">
				<div className="phone-sm:hidden lg:block w-full lg:w-auto flex justify-center lg:justify-start">
					<Sidebar categories={categories} brands={brands} />
				</div>
				<div className="flex flex-col flex-grow">
					<Chips />
					<Hidden data={initialArticles} />
					<TopAndMain initialData={initialArticles} />
				</div>
			</div>
		</div>
	);
}
