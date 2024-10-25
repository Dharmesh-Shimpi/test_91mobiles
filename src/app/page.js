import Loading from "@/components/loading";
import { Suspense } from "react";
// import dynamic from "next/dynamic";

import Featured from "@/components/featured";
import TopAndMain from "@/components/main";
import Sidebar from "@/components/ui/sidebarServer";
import Chips from "@/components/ui/chips";
import FilterSearch from "@/components/ui/filterSearch";
import FeaturedSkeleton from "@/components/featuredSkeleton";
import TopAndMainSkeleton from "@/components/mainSkeleton";
import SidebarSkeleton from "@/components/ui/sidebarSkeleton";
// import Bulletin from "@/components/bulletin";  // Uncomment if you decide to use Bulletin

export default async function Home({ searchParams }) {
	let { filter, search, category, brand } = searchParams;
	// console.log(filter, search, category, brand);
	filter = Number(filter);
	return (
		<main className="flex flex-col items-center">
			{/* <Suspense fallback={<Loading />}>
				<Bulletin combinedData={filteredData} />
			</Suspense> */}
			<section className="py-10 w-full flex justify-center items-center bg-slate-100 overflow-hidden">
				<Suspense fallback={<FeaturedSkeleton />}>
					<Featured />
				</Suspense>
			</section>
			<div className="w-full py-5 flex px-4 md:px-16 justify-between items-center">
				<Suspense fallback={<Loading />}>
					<FilterSearch />
				</Suspense>
			</div>

			<div className="flex flex-col md:flex-row md:justify-between w-full px-4 md:px-5 lg:px-16">
				<div className="phone-sm:hidden lg:block w-full lg:w-auto flex justify-center lg:justify-start">
					<Suspense fallback={<SidebarSkeleton />}>
						<Sidebar category={category} brand={brand} />
					</Suspense>
				</div>

				<div className="flex flex-col flex-grow">
					<Suspense fallback={<Loading />}>
						<Chips category={category} brand={brand} />
					</Suspense>
					<div className="w-full flex flex-col items-center xl:p-1 ">
						<Suspense fallback={<TopAndMainSkeleton />}>
							<TopAndMain
								filter={filter}
								search={search}
								category={category}
								brand={brand}
							/>
						</Suspense>
					</div>
				</div>
			</div>
		</main>
	);
}
