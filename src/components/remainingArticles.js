"use client";

import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";
import OverlayButton from "@/components/ui/OverlayButton";

export default function Remaining({ initialData }) {
	const [visibleData, setVisibleData] = useState(initialData.slice(0, 5)); 
	const [currentLength, setCurrentLength] = useState(5); 

	const fetchMoreArticles = () => {
		const newLength = currentLength + 5; 
		const newVisibleData = initialData.slice(0, newLength);
		setVisibleData(newVisibleData);
		setCurrentLength(newLength);
	};

	return (
		<InfiniteScroll
			dataLength={visibleData.length}
			next={fetchMoreArticles}
			hasMore={currentLength < initialData.length}
		>
			<div className="flex flex-wrap gap-2 justify-center items-center w-full mt-6 xl:gap-8">
				{visibleData.map((item) => (
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
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							/>
						</div>
						<div className="bg-slate-100 p-3 flex flex-col justify-between h-1/4 w-full">
							<div className="font-bold text-center line-clamp-2">
								{item.title}
							</div>
							<div className="flex justify-between text-xs pt-2">
								<p>30 sec read</p>
								<p>{item.publish_date}</p>
							</div>
						</div>
						<OverlayButton slug={item.slug} />
					</div>
				))}
			</div>
		</InfiniteScroll>
	);
}
