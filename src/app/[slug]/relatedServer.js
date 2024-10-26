import RelatedArticles from "./related";
import { fetchArticles } from "@/utils/fetchArticles";

export default async function RelatedServer() {
	const articles = await fetchArticles();

	const category = articles.find((item) => item.slug === slug)?.category;
	const relatedArticles = articles.filter(
		(item) => item.category === category && item.slug !== slug
	);
	return <RelatedArticles articles={relatedArticles} />;
}
