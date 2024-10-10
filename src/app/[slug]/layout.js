import Image from "next/image";
import ShareButton from "@/app/[slug]/shareButton";
import { fetchWithAuth } from "@/utils/fetchHelper";
import { fetchArticles } from "@/utils/fetchArticles";
import RelatedArticles from "@/app/[slug]/related";
import './style.css';

export default async function ArticleLayout({ params }) {
	const { slug } = params;

	const article = await fetchWithAuth(
		`http://13.200.221.80:8000/api/articlesbyslug/${slug}`
	);

	// Fetch all articles (or you can fetch related articles in a different way)
	const articles = await fetchArticles();

	const category = articles.find((item) => item.slug === slug)?.category;
	const relatedArticles = articles.filter(
		(item) => item.category === category && item.slug !== slug
	);

	return (
		<div
			style={{ backgroundColor: "#f2f2f2" }}
			className="w-full phone-sm:p-0 md:p-8 lg:px-12"
		>
			<div className="flex flex-wrap phone-sm:mx-0 md:mx-4 w-full">
				{/* Main Article Section */}
				<div className="phone-sm:w-full md:w-[850px] phone-sm:p-0 md:px-4 mb-8">
					<div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
						<h1 className="mb-4 text-xl font-bold">{article.title}</h1>

						<div className="flex justify-between items-center">
							<p className="text-gray-600 text-sm mb-4">
								Published on:{" "}
								<span className="font-semibold">
									{article.publication_date}
								</span>
							</p>

							{/* Share Button */}
							<ShareButton article={article} />
						</div>

						<div className="flex justify-center items-center">
							<Image
								src={article.image_url}
								alt={article.title}
								className="mb-6 rounded-lg"
								height={300}
								width={300}
								quality={50}
							/>
						</div>

						<p className="text-gray-800 text-base leading-relaxed mb-6">
							{article.meta_desc}
						</p>

						<div className="mb-6">
							<div dangerouslySetInnerHTML={{ __html: article.content }} />
							{article.content2 && (
								<div dangerouslySetInnerHTML={{ __html: article.content2 }} />
							)}
							<div className="flex justify-center items-center">
								<Image
									src={article.image_url1}
									alt={article.title}
									className="mb-6 rounded-lg"
									height={300}
									width={300}
									quality={50}
								/>
							</div>
							{article.content3 && (
								<div dangerouslySetInnerHTML={{ __html: article.content3 }} />
							)}
							<div className="flex justify-center items-center">
								<Image
									src={article.image_url2}
									alt={article.title}
									className="mb-6 rounded-lg"
									height={300}
									width={300}
									quality={50}
								/>
							</div>
							{article.content4 && (
								<div dangerouslySetInnerHTML={{ __html: article.content4 }} />
							)}
						</div>
					</div>
				</div>

				{/* Related Articles Section */}
				<div className="phone-sm:w-full md:w-[350px] phone-sm:m-0 md:mx-16">
					<RelatedArticles articles={relatedArticles} />
				</div>
			</div>
		</div>
	);
}
