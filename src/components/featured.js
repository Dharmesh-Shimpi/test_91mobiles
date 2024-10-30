import { fetchArticles, fetchCategories } from "@/utils/fetchArticles";
import Image from "next/image";
import OverlayButton from "./ui/OverlayButton";

export default async function Featured() {
	const data = await fetchArticles();
	const categories = await fetchCategories();

	const category = categories.find((i) => i.name == "TV").category_id;

	const featured = data
		.filter((i) => i.category == category && i.priority == true)
		.slice(0, 5);

	return (
		<div className="w-full flex flex-col md:flex-row gap-4 px-4 md:px-16 md:gap-1 relative">
			{/* Featured Section */}
			<div className="w-full md:w-1/2 flex flex-col">
				<div className="border-l-4 px-3 font-bold border-blue-500 my-5">
					FEATURED
				</div>
				<div className="relative overflow-hidden rounded-xl w-full h-48 md:h-[264px] flex justify-center items-center">
					<Image
						as="image"
						src={featured[0].image_url}
						alt="Featured"
						className="object-contain"
						fill
						priority
						quality={10}
						sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
					/>
					<OverlayButton slug={featured[0].slug} />
					<div className="flex justify-end items-start flex-col absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-neutral-600">
						<div className="text-white line-clamp-2 text-sm px-2">
							{featured[0].title}
						</div>
						<div className="p-2 text-white text-xs">
							2 min read . 4 hours ago
						</div>
					</div>
				</div>
			</div>
			{/* Daily Section */}
			<div className="w-full md:w-1/2 flex flex-col">
				<div className="border-l-4 px-3 font-bold border-blue-500 my-5">
					DAILY
				</div>
				<div className="grid grid-cols-2 gap-2">
					{featured.slice(1).map((item, index) => (
						<div
							key={index}
							className="relative overflow-hidden rounded-xl border w-full h-32 flex justify-center items-center"
						>
							<Image
								src={item.image_url}
								alt={item.title}
								className="object-contain"
								fill
								quality={10}
								sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
							/>
							<OverlayButton slug={item.slug} />
							<div className="flex justify-end items-start flex-col absolute bottom-0 left-0 w-full p-2 h-full bg-gradient-to-t from-neutral-600">
								<div className="text-white line-clamp-2 text-xs">
									{item.title}
								</div>
								<div className="text-white text-xxs pt-1">
									2 min read . 4 hours ago
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
