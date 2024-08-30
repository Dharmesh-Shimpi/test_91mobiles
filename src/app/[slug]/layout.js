"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchWithAuth } from "@/utils/fetchHelper";
import { useRouter } from "next/navigation";
import { updateCookieWithSlug } from "@/utils/cookies";
import {
	FacebookShareButton,
	TwitterShareButton,
	LinkedinShareButton,
	FacebookIcon,
	TwitterIcon,
	LinkedinIcon,
} from "react-share";
import { IoArrowRedo } from "react-icons/io5";
import InfiniteScroll from "react-infinite-scroll-component";
import "./style.css";

export default function ArticleLayout({ params }) {
	const [article, setArticle] = useState(null);
	const [relatedArticles, setRelatedArticles] = useState([]);
	const [showShareOptions, setShowShareOptions] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(1);

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
					const initialRelated = data
						.filter((item) => item.category === category && item.slug !== slug)
						.slice(0, 10);
					setRelatedArticles(initialRelated);
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

	const fetchMoreArticles = () => {
		const nextPage = page + 1;
		const additionalArticles = data
			.filter((item) => item.category === category && item.slug !== slug)
			.slice(page * 10, nextPage * 10);

		if (additionalArticles.length === 0) {
			setHasMore(false);
		} else {
			setRelatedArticles((prev) => [...prev, ...additionalArticles]);
			setPage(nextPage);
		}
	};

	const shareUrl = typeof window !== "undefined" ? window.location.href : "";

	const toggleShareOptions = () => {
		setShowShareOptions(!showShareOptions);
	};

	if (!article) {
		return (
			<div className="flex items-center justify-center h-screen text-lg">
				Loading...
			</div>
		);
	}

	return (
		<div
			style={{ backgroundColor: "#f2f2f2" }}
			className="w-full phone-sm:p-0 md:p-8 lg:px-12"
		>
			<div className="flex flex-wrap phone-sm:mx-0 md:mx-4 w-full">
				<div className="phone-sm:w-full md:w-[850px] phone-sm:p-0 md:px-4 mb-8">
					<div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
						<h1 className="mb-4 text-gray-900">{article.title}</h1>
						<div className="flex justify-between items-center">
							<p className="text-gray-600 text-sm mb-4">
								Published on:{" "}
								<span className="font-semibold">
									{article.publication_date}
								</span>
							</p>
							{/* Share Button */}
							<div className="relative">
								<p
									onClick={toggleShareOptions}
									className="cursor-pointer flex items-center italic text-sm text-blue-700"
								>
									Share
									<IoArrowRedo className="ml-2" />
								</p>

								{showShareOptions && (
									<div className="absolute flex right-0 w-fit z-10">
										<FacebookShareButton url={shareUrl} quote={article.title}>
											<FacebookIcon className="m-1" size={34} round />
											{/* <span className="ml-2">Facebook</span> */}
										</FacebookShareButton>
										<TwitterShareButton url={shareUrl} title={article.title}>
											<TwitterIcon className="m-1" size={34} round />
											{/* <span className="ml-2">Twitter</span> */}
										</TwitterShareButton>
										<LinkedinShareButton url={shareUrl} title={article.title}>
											<LinkedinIcon className="m-1" size={34} round />
											{/* <span className="ml-2">LinkedIn</span> */}
										</LinkedinShareButton>
									</div>
								)}
							</div>
						</div>
						<div className="flex justify-center items-center">
							<img
								src={article.image_url}
								alt={article.title}
								className="mb-6 rounded-lg"
							/>
						</div>
						<p className="text-gray-800 text-lg leading-relaxed mb-6">
							{article.meta_desc}
						</p>

						<div className="mb-6">
							<div dangerouslySetInnerHTML={{ __html: article.content }} />
							{article.content2 && (
								<div dangerouslySetInnerHTML={{ __html: article.content2 }} />
							)}
							{article.content3 && (
								<div dangerouslySetInnerHTML={{ __html: article.content3 }} />
							)}
							{article.content4 && (
								<div dangerouslySetInnerHTML={{ __html: article.content4 }} />
							)}
						</div>
					</div>
				</div>

				<div className="phone-sm:w-full md:w-[350px] phone-sm:m-0 md:mx-16">
					<div className="bg-white shadow-lg rounded-lg phone-sm:p-4 md:p-6 scrollable-container">
						<p className="mb-4 bg-red-600 text-white text-xs w-fit py-1 px-3 font-medium">
							RELATED ARTICLES
						</p>
						<InfiniteScroll
							dataLength={relatedArticles.length}
							next={fetchMoreArticles}
							hasMore={hasMore}
							loader={<h4>Loading...</h4>}
							endMessage={<p>No more articles</p>}
							className="space-y-4"
						>
							{relatedArticles.map((item) => (
								<div
									key={item.id}
									className="border-b-4 border-gray-300 line-clamp-3 p-4 cursor-pointer hover:bg-gray-100 transition-colors"
									onClick={() => handleArticleClick(item.slug)}
								>
									<h3 className="text-sm font-semibold text-gray-800">
										{item.title}
									</h3>
								</div>
							))}
						</InfiniteScroll>
					</div>
				</div>
			</div>
		</div>
	);
}
