import {
	fetchArticles,
	fetchBrands,
	fetchCategories,
} from "@/utils/fetchArticles";
import filtering from "@/utils/filtering";
import Featured from "@/components/featured";
import TopAndMain from "@/components/main";
import Sidebar from "@/components/ui/filterCategory";
import Chips from "@/components/ui/chips";
import FilterSearch from "@/components/ui/filterSearch";
import Bulletin from "@/components/bulletin";
import Loading from "@/utils/loading";
import { Suspense } from "react";

export default async function Home({ searchParams }) {
	const initialArticles = await fetchArticles();
	const categories = await fetchCategories();
	const brands = await fetchBrands();

	let filteredData = [...initialArticles];
	filteredData = filtering(searchParams, filteredData);

	return (
		<div className="flex flex-col items-center">
			{/* Use Suspense to wrap components that need server-side data */}
			<Suspense fallback={<Loading />}>
				<Bulletin combinedData={filteredData} />
			</Suspense>

			<Suspense fallback={<Loading />}>
				<Featured
					data={initialArticles}
					categories={categories}
					brands={brands}
				/>
			</Suspense>

			<Suspense fallback={<Loading />}>
				<FilterSearch categories={categories} brands={brands} />
			</Suspense>

			<div className="flex flex-col md:flex-row md:justify-between w-full px-4 md:px-5 lg:px-16">
				<div className="phone-sm:hidden lg:block w-full lg:w-auto flex justify-center lg:justify-start">
					<Suspense fallback={<Loading />}>
						<Sidebar categories={categories} brands={brands} />
					</Suspense>
				</div>

				<div className="flex flex-col flex-grow">
					<Suspense fallback={<Loading />}>
						<Chips categories={categories} brands={brands} />
					</Suspense>

					<Suspense fallback={<Loading />}>
						<TopAndMain initialData={filteredData} />
					</Suspense>
				</div>
			</div>
		</div>
	);
}
