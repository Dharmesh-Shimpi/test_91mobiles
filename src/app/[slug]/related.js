"use client";

import { useRouter } from "next/navigation";

const RelatedArticles = ({ articles }) => {
	const router = useRouter();

	const handleArticleClick = (slug) => {
		router.push(`/${slug}`);
	};

	return (
		<div className="bg-white shadow-lg rounded-lg phone-sm:p-4 md:p-6 scrollable-container">
			<p className="mb-4 bg-red-600 text-white text-xs w-fit py-1 px-3 font-medium">
				RELATED ARTICLES
			</p>
			{articles.map((item) => (
				<div
					key={item.id}
					className="border-b-4 border-gray-300 line-clamp-3 p-4 cursor-pointer hover:bg-gray-100 transition-colors"
					onClick={() => handleArticleClick(item.slug)}
				>
					<h3 className="text-sm font-semibold text-gray-800">{item.title}</h3>
				</div>
			))}
		</div>
	);
};

export default RelatedArticles;
