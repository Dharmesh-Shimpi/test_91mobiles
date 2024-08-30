"use client";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { updateCookieWithSlug } from "@/utils/cookies";
import Subscribe from "@/components/subscribe";

export default function TopAndMain() {
	const router = useRouter();
	const { filteredData } = useSelector((state) => state.fetch);

	const topEight = filteredData.slice(0, 8);
	const restData = filteredData.slice(8);

	const handleClick = (slug) => {
		updateCookieWithSlug("slugs", slug);
		router.push(`/${slug}`);
	};

	return (
		<div className="w-full flex flex-col items-center">
			{/* Section for top eight items */}
			<div className="flex flex-col items-center w-full max-w-[1200px] mb-6">
				<div className="flex flex-wrap justify-center items-center w-full">
					{topEight.map((item) => (
						<div
							key={item.article_id}
							className="border text-sm w-60 m-2 h-96 rounded-lg flex flex-col overflow-hidden cursor-pointer"
							onClick={() => handleClick(item.slug)}
						>
							<div className="h-3/4 w-full">
								<img
									className="h-full w-full object-cover"
									src={item.image_url}
									alt={item.title}
								/>
							</div>
							<div className="bg-slate-100 p-3 flex flex-col justify-between h-1/4">
								<div className="font-bold text-center line-clamp-2">
									{item.title}
								</div>
								<div className="flex justify-between text-xs">
									<p>30 sec read</p>
									<p>{item.publish_date}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Subscribe component */}
			<Subscribe />

			{/* Section for remaining items */}
			<div className="w-full flex flex-col items-center">
				<div className="flex flex-wrap justify-center items-center w-full max-w-[1150px]">
					{restData.map((item) => (
						<div
							key={item.article_id}
							className="border text-sm w-60 m-2 h-96 rounded-lg flex flex-col overflow-hidden cursor-pointer"
							onClick={() => handleClick(item.slug)}
						>
							<div className="h-3/4 w-full">
								<img
									className="h-full w-full object-cover"
									src={item.image_url}
									alt={item.title}
								/>
							</div>
							<div className="bg-slate-100 p-3 flex flex-col justify-between h-1/4">
								<div className="font-bold text-center line-clamp-2">
									{item.title}
								</div>
								{/* <div className="text-sm text-center">{item.meta_desc}</div> */}
								<div className="flex justify-between text-xs">
									<p>30 sec read</p>
									<p>{item.publish_date}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
