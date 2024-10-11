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
import Bulletin from "@/components/bulletin";

export default async function Home({ searchParams }) {
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

	return (
		<div className="flex flex-col items-center">
			<Bulletin combinedData={filteredData} />
			<Featured
				data={initialArticles}
				categories={categories}
				brands={brands}
			/>
			<FilterSearch categories={categories} brands={brands} />
			<div className="flex flex-col md:flex-row md:justify-between w-full px-4 md:px-5 lg:px-16">
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

