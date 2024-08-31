import {
	fetchArticles,
	fetchBrands,
	fetchCategories,
} from "@/utils/fetchArticles";
import Featured from "@/components/featured";
import TopAndMain from "@/components/main";
import Sidebar from "@/components/ui/filterCategory";
import Filter from "@/components/filterNav";

export default async function Home() {
	const initialArticles = await fetchArticles(1, 3);
	const categories = await fetchCategories();
	const brands = await fetchBrands();

	return (
		<div className="w-screen sm:px-0 md:px-16 flex flex-col items-center">
			<Featured />
			<Filter />
			<div className="flex flex-col lg:flex-row lg:justify-between w-full">
				<div className="w-full lg:w-auto flex justify-center lg:justify-start">
					<Sidebar categories={categories} brands={brands} />
				</div>
				<div className="flex flex-col flex-grow">
					<TopAndMain initialData={initialArticles} />
				</div>
			</div>
		</div>
	);
}
