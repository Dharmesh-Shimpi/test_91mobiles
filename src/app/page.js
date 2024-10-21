import {
	fetchArticles,
	fetchBrands,
	fetchCategories,
} from "@/utils/fetchArticles";
import filtering from "@/utils/filtering";
import Loading from "@/app/loading";
import { Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamically import components
const Featured = dynamic(() => import("@/components/featured"), {
	suspense: true,
});

const TopAndMain = dynamic(() => import("@/components/main"), {
	suspense: true,
});

const Sidebar = dynamic(() => import("@/components/ui/filterCategory"), {
	suspense: true,
});

const Chips = dynamic(() => import("@/components/ui/chips"), {
	suspense: true,
});

const FilterSearch = dynamic(() => import("@/components/ui/filterSearch"), {
	suspense: true,
});

// const Bulletin = dynamic(() => import("@/components/bulletin"), {
// 	suspense: true,
// });

export default async function Home({ searchParams }) {
	const initialArticles = await fetchArticles();
	const categories = await fetchCategories();
	const brands = await fetchBrands();

	let filteredData = [...initialArticles];
	filteredData = filtering(searchParams, filteredData);

	return (
		<div className="flex flex-col items-center">
			{/* <Suspense fallback={<Loading />}>
				<Bulletin combinedData={filteredData} />
			</Suspense> */}

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
