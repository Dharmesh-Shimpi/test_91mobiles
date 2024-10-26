import RelatedArticles from "./related";

export default async function RelatedServer() {
    const articles = await fetchArticles();

	const category = articles.find((item) => item.slug === slug)?.category;
	const relatedArticles = articles.filter(
		(item) => item.category === category && item.slug !== slug
	);
	return <RelatedArticles articles={relatedArticles} />;
}
