"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles, applyFilter } from "@/redux/fetch.redux";
import TopAndMain from "@/components/main";
import Sidebar from "@/components/ui/filterCategory";
import Filter from "@/components/filterNav";
import Featured from "@/components/featured";

function ClientOnlySidebar() {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) {
		return null;
	}

	return <Sidebar />;
}

export default function Home() {
	const dispatch = useDispatch();
	const { filters, loading } = useSelector((state) => state.fetch);

	useEffect(() => {
		dispatch(fetchArticles({}));
	}, [dispatch]);

	useEffect(() => {
		dispatch(applyFilter());
	}, [dispatch, filters]);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="w-screen flex flex-col items-center">
			<Featured />
			<Filter />
			<div className="flex flex-col lg:flex-row lg:justify-between w-full">
				<div className="w-full lg:w-auto flex justify-center lg:justify-start">
					<ClientOnlySidebar />
				</div>
				<div className="flex flex-col flex-grow">
					<TopAndMain />
				</div>
			</div>
		</div>
	);
}
