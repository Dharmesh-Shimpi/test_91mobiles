"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchWithAuth } from "@/utils/fetchHelper";
import { useRouter } from "next/navigation";
import { updateCookieWithSlug } from "@/utils/cookies";
import parse from "html-react-parser";

export default function ArticleLayout({ params }) {
	const [article, setArticle] = useState(null);
	const [relatedArticles, setRelatedArticles] = useState([]);
	const { slug } = params;
	const router = useRouter();
	const { data } = useSelector((state) => state.fetch);
	const category = data.find((item) => item.slug === slug)?.category;

	useEffect(() => {
		async function getDetails() {
			try {
				const temp = await fetchWithAuth(
					`http://13.200.221.80:8000/api/articlesbyslug/${slug}`
				);
				setArticle(temp);

				if (category) {
					const related = data
						.filter((item) => item.category === category && item.slug !== slug)
						.slice(0, 10);
					setRelatedArticles(related);
				}
			} catch (error) {
				console.error("Failed to fetch article:", error);
			}
		}
		if (slug) {
			getDetails();
		}
	}, [slug, category, data]);

	const handleArticleClick = (newSlug) => {
		updateCookieWithSlug("slugs", newSlug);
		router.push(`/${newSlug}`);
	};

	const addClassesToHTML = (html) => {
		let newHtml = html
			.replace(/<img/g, '<img class="w-full h-auto rounded-lg mb-4"')
			.replace(/<p/g, '<p class="mb-4 text-gray-800 leading-relaxed"')
			.replace(/<h1/g, '<h1 class="text-3xl font-extrabold mb-4"')
			.replace(/<a/g, '<a class="text-blue-500 underline"')
			.replace(/<\/a>/g, "</a>");
		return newHtml;
	};

	if (!article) {
		return (
			<div className="flex items-center justify-center h-screen text-lg">
				Loading...
			</div>
		);
	}

	return (
		<div className="container mx-auto p-6 lg:px-12">
			<div className="flex flex-wrap -mx-4">
				<div className="w-full lg:w-2/3 px-4 mb-8">
					<div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
						<h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900">
							{article.title}
						</h1>
						<p className="text-gray-600 text-base mb-4">
							Published on:{" "}
							<span className="font-semibold">{article.publication_date}</span>
						</p>
						<img
							src={article.image_url}
							alt={article.title}
							className="w-full h-auto mb-6 rounded-lg shadow-md"
						/>
						<p className="text-gray-800 text-lg leading-relaxed mb-6">
							{article.meta_desc}
						</p>
						<div className="mb-6">
							{parse(addClassesToHTML(article.content))}
							{article.content2 && parse(addClassesToHTML(article.content2))}
							{article.content3 && parse(addClassesToHTML(article.content3))}
							{article.content4 && parse(addClassesToHTML(article.content4))}
						</div>
					</div>
				</div>

				<div className="w-full lg:w-1/3 px-4">
					<div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
						<h2 className="text-2xl font-semibold mb-4">You might also like</h2>
						<div className="space-y-4">
							{relatedArticles.map((item) => (
								<div
									key={item.id}
									className="border border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
									onClick={() => handleArticleClick(item.slug)}
								>
									<h3 className="text-xl font-semibold text-gray-800">
										{item.title}
									</h3>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
