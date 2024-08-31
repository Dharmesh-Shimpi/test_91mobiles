"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	setArticles,
	applyFilter,
	setPage,
	setLoading,
} from "@/redux/fetch.redux";
import { fetchArticles } from "@/utils/fetchArticles";
import Subscribe from "@/components/subscribe";

export default function TopAndMain({ initialData }) {
	const dispatch = useDispatch();
	const { filteredData, articles, loading, hasMore } = useSelector(
		(state) => state.fetch
	);

	const [localPage, setLocalPage] = useState(4); // Start at page 4 as per initial assumption

	useEffect(() => {
		const fetchData = async () => {
			if (initialData && Array.isArray(initialData)) {
				dispatch(setArticles(initialData));
			}

			if (hasMore && !loading) {
				try {
					dispatch(setPage(localPage));
					const moreArticles = await fetchArticles(localPage, 1); // Load one page at a time
					dispatch(
						setArticles((prevArticles) => [...prevArticles, ...moreArticles])
					);
					setLocalPage((prevPage) => prevPage + 1);
				} catch (error) {
					console.error("Error loading more articles:", error);
				}
			}
		};

		fetchData();
	}, [initialData, localPage, hasMore, loading, dispatch]);

	useEffect(() => {
		if (articles.length > 0) {
			dispatch(applyFilter()); // Apply filters whenever articles or filters change
		}
	}, [articles, dispatch]);

	const handleClick = (slug) => {
		// Handle click functionality here
	};

	return (
		<div className="w-full flex flex-col items-center">
			{/* Top eight items */}
			<div className="flex flex-col items-center w-full max-w-[1200px] mb-6">
				<div className="flex flex-wrap justify-center items-center w-full">
					{Array.isArray(filteredData) &&
						filteredData.slice(0, 8).map((item) => (
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

			{/* Remaining items */}
			<div className="w-full flex flex-col items-center">
				<div className="flex flex-wrap justify-center items-center w-full max-w-[1150px]">
					{Array.isArray(filteredData) &&
						filteredData.slice(8).map((item) => (
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
		</div>
	);
}
