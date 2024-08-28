"use client";

import { useSelector } from "react-redux";

export default function Main() {
	const { filteredData } = useSelector((state) => state.fetch);
	const restData = filteredData.slice(8, filteredData.length); // Get items after the first 8

	return (
		<div className="w-full flex justify-center items-center">
			<div className="flex flex-wrap justify-center items-center w-[1150px]">
				{restData.map((item) => (
					<div
						key={item.article_id}
						className="border text-sm w-80 m-5 rounded-lg flex flex-col justify-center items-center"
					>
						<img className="h-64" src={item.image_url} />
						<div className="p-5 font-bold">{item.title} </div>
						<div className="p-5 text-sm">{item.meta_desc}</div>
						<div className="flex justify-between p-5 w-full">
							<p className="text-xs">30 sec read</p>
							<p className="text-xs">{item.publish_date}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
