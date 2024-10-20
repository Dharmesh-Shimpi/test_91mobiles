import Image from "next/image";
import Subscribe from "@/components/subscribe";
import OverlayButton from "@/components/ui/OverlayButton";
import Remaining from "./remainingArticles";

export default function TopAndMain({ initialData }) {
	return (
		<div className="w-full flex flex-col items-center xl:p-1 ">
			{/* Top eight items */}
			<div className="flex flex-wrap gap-2 justify-center items-center w-full mb-6 xl:gap-8">
				{Array.isArray(initialData) &&
					initialData.slice(0, 9).map((item) => (
						<div
							key={item.article_id}
							className="border text-sm w-52 h-80 rounded-lg flex flex-col overflow-hidden relative"
						>
							<div className="h-full w-full flex justify-center items-center relative">
								<Image
									className=" object-contain"
									src={item.image_url}
									alt={item.title}
									width={150}
									height={100}
									priority
									quality={5}
									placeholder="blur"
									blurDataURL={item.image_url}
								/>
								<OverlayButton slug={item.slug} />
							</div>
							<div className="bg-slate-100 p-3 flex flex-col justify-between ">
								<div className="font-bold text-center line-clamp-2">
									{item.title}
								</div>
								<div className="flex justify-between text-xs pt-2">
									<p>30 sec read</p>
									<p>{item.publish_date}</p>
								</div>
							</div>
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
					initialData.slice(9, 50).map((item) => (
						<div
							key={item.article_id}
							className="border text-sm w-52 h-80 rounded-lg flex flex-col overflow-hidden relative"
						>
							<div className="h-full w-full flex justify-center items-center relative">
								<Image
									className=" object-contain"
									src={item.image_url}
									alt={item.title}
									width={150}
									height={100}
									priority
									quality={5}
									placeholder="blur"
									blurDataURL={item.image_url}
								/>
								<OverlayButton slug={item.slug} />
							</div>
							<div className="bg-slate-100 p-3 flex flex-col justify-between ">
								<div className="font-bold text-center line-clamp-2">
									{item.title}
								</div>
								<div className="flex justify-between text-xs pt-2">
									<p>30 sec read</p>
									<p>{item.publish_date}</p>
								</div>
							</div>
						</div>
					))}
			</div>

			{/* Infinite Scroll for Remaining Articles */}
			<Remaining initialData={initialData.slice(50)} />
		</div>
	);
}
