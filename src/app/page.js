import {
	fetchArticles,
	fetchBrands,
	fetchCategories,
} from "@/utils/fetchArticles";
import Featured from "@/components/featured";
import TopAndMain from "@/components/main";
import Sidebar from "@/components/ui/filterCategory";
import Chips from "@/components/ui/chips";
import FilterSearch from "@/components/ui/filterSearch";

export default async function Home({ searchParams }) {
	// Fetch initial data
	console.log(searchParams);
	const initialArticles = await fetchArticles();
	const categories = await fetchCategories();
	const brands = await fetchBrands();

	let filteredData = [...initialArticles];

	let { filter, search, category, brand } = searchParams;

	filter = Number(filter);

	if (filter !== undefined) {
		if (filter !== 0) {
			filteredData = filteredData.filter((item) => item.tags.includes(filter));
		}
	}

	if (search !== undefined) {
		filteredData = filteredData.filter((item) =>
			item.title.toLowerCase().includes(search)
		);
	}

	if (category) {
		filteredData = filteredData.filter((item) => item.category == category);
	}

	if (brand) {
		filteredData = filteredData.filter((item) =>
			item.brands.some((b) => b === brand)
		);
	}

	return (
		<div className="flex flex-col items-center">
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
					<Chips categories={categories} brands={brands} />
					<TopAndMain initialData={filteredData} />
				</div>
			</div>
		</div>
	);
}
