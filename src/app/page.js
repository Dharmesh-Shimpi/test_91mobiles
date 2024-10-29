import Loading from "@/components/ui/loading";
import { Suspense } from "react";
import Featured from "@/components/featured";
import TopAndMain from "@/components/main";
import Sidebar from "@/components/ui/sidebarServer";
import Chips from "@/components/ui/chipsServer";
import FeaturedSkeleton from "@/components/featuredSkeleton";
import TopAndMainSkeleton from "@/components/mainSkeleton";
import SidebarSkeleton from "@/components/ui/sidebarSkeleton";
import FilterSearchServer from "@/components/ui/filterSearchServer";

export default function Home({ searchParams }) {
	let { filter, search, category, brand } = searchParams;
	filter = Number(filter);
	return (
		<main className="flex flex-col items-center group">
			<div className="hidden group-has-[next]:block">
				<Loading />
			</div>
			<section className="py-10 w-full flex justify-center items-center bg-slate-100 overflow-hidden">
				<Suspense fallback={<FeaturedSkeleton />}>
					<Featured />
				</Suspense>
			</section>

			<div className="w-full py-5 flex px-4 md:px-16 justify-between items-center">
				<FilterSearchServer />
			</div>

			<div className="flex flex-col md:flex-row md:justify-between w-full px-4 md:px-5 lg:px-16">
				<div className="phone-sm:hidden lg:block w-full lg:w-auto flex justify-center lg:justify-start">
					<Suspense fallback={<SidebarSkeleton />}>
						<Sidebar />
					</Suspense>
				</div>

				<div className="flex flex-col flex-grow">
					<Chips category={category} brand={brand} />
					<div className="w-full flex flex-col items-center xl:p-1 group-has-[searching]:animate-pulse">
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
