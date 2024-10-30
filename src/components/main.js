import Image from "next/image";
import Subscribe from "@/components/subscribe";
import OverlayButton from "@/components/ui/OverlayButton";
import Remaining from "./remainingArticles";
import filtering from "@/utils/filtering";
import { fetchArticles } from "@/utils/fetchArticles";

export default async function TopAndMain({ filter, search, category, brand }) {
	// await new Promise((resolve) => setTimeout(resolve, 2000));
	let data = await fetchArticles();
	// console.log(data);
	// console.log(typeof filter);
	let initialData = filtering(filter, search, category, brand, data);
	// console.log(initialData);

	return (
		<>
			{/* Top eight items */}
			<div className="flex flex-wrap gap-2 justify-center items-center w-full mb-6 xl:gap-8 ">
				{Array.isArray(initialData) &&
					initialData.slice(0, 8).map((item) => (
						<div
							key={item.article_id}
							className="border text-sm w-full h-96 md:w-64 rounded-lg flex flex-col overflow-hidden relative"
						>
							<div className="h-3/4 w-full flex justify-center items-center relative">
								<Image
									as="image"
									className=" object-contain"
									src={item.image_url}
									alt={item.title}
									priority
									fill
									quality={5}
									sizes="(max-width: 768px) 50vw, (max-width: 1024px) 75vw, 100vw"
								/>
							</div>
							<div className="bg-slate-100 p-2 flex flex-col justify-between h-1/4 w-full">
								<div className="font-bold text-center line-clamp-2">
									{item.title}
								</div>
								<div className="flex justify-between text-xs">
									<p>30 sec read</p>
									<p>{item.publish_date}</p>
								</div>
							</div>
							<OverlayButton slug={item.slug} />
						</div>
					))}
			</div>

			{/* Subscribe component */}
			<div className="w-full flex justify-center items-center">
				<Subscribe />
			</div>

			{/* Remaining items */}

			<div className="flex flex-wrap gap-2 justify-center items-center w-full mt-6 xl:gap-8">
				{Array.isArray(initialData) &&
					initialData.slice(8, 50).map((item) => (
						<div
							key={item.article_id}
							className="border text-sm w-full h-96 md:w-64 rounded-lg flex flex-col overflow-hidden relative"
						>
							<div className="h-3/4 w-full flex justify-center items-center relative">
								<Image
									className=" object-contain"
									src={item.image_url}
									alt={item.title}
									fill
									quality={5}
									sizes="(max-width: 768px) 50vw, (max-width: 1024px) 75vw, 100vw"
								/>
							</div>
							<div className="bg-slate-100 p-2 flex flex-col justify-between h-1/4 w-full">
								<div className="font-bold text-center line-clamp-2">
									{item.title}
								</div>
								<div className="flex justify-between text-xs">
									<p>30 sec read</p>
									<p>{item.publish_date}</p>
								</div>
							</div>
							<OverlayButton slug={item.slug} />
						</div>
					))}
			</div>

			{/* Infinite Scroll for Remaining Articles */}
			{initialData && <Remaining initialData={initialData.slice(50)} />}
		</>
	);
}
