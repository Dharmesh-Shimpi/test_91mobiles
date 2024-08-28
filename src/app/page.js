"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles, applyFilter } from "@/redux/fetch.redux";
import Top from "@/components/top";
import Subscribe from "@/components/subscribe";
import Main from "@/components/main";
import Sidebar from "@/components/ui/filterCategory";
import Chips from "@/components/ui/chips";

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
		<div className="flex lg:flex-row md:flex-col sm:flex-col phone-lg:flex-col phone-md:flex-col phone-sm:flex-col">
			<ClientOnlySidebar />
			<div className="flex flex-col sm:max-w-screen-md phone-lg:max-w-screen-sm phone-md:max-w-screen-sm phone-sm:max-w-screen-sm">
				<Chips />
				<Top />
				<Subscribe />
				<Main />
			</div>
		</div>
	);
}
