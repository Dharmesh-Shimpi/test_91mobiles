import { fetchWithAuth } from "./fetchHelper";

export async function fetchArticles(page = 1, pageSize = 3) {
	let allResults = [];
	let currentPage = page;
	let hasMore = true;

	try {
		while (hasMore) {
			const { next, results } = await fetchWithAuth(
				`http://13.200.221.80:8000/api/articles/?page=${currentPage}`
			);

			if (!results || results.length === 0) {
				hasMore = false;
			} else {
				allResults = allResults.concat(
					results
						.filter((res) => res?.publication_date)
						.map((res) => ({
							article_id: res.article_id,
							slug: res.slug,
							title: res.title,
							meta_desc: res.meta_desc,
							image_url: res.image_url,
							author_name: res.author_name,
							tags: res.tags,
							promoted: res.promoted,
							priority: res.priority,
							publish_date: res.publication_date,
							category: res.category,
							brands: res.brands,
						}))
				);
				currentPage++;
			}

			if (!next) {
				hasMore = false;
			}
		}

		allResults.sort(
			(a, b) => new Date(b.publish_date) - new Date(a.publish_date)
		);
		return allResults;
	} catch (error) {
		console.error("An error occurred while fetching articles:", error);
		throw new Error("An error occurred while fetching articles.");
	}
}

export async function fetchCategories() {
	try {
		return await fetchWithAuth("http://13.200.221.80:8000/api/categories/");
	} catch (error) {
		console.error("An error occurred while fetching categories:", error);
		throw new Error("An error occurred while fetching categories.");
	}
}

export async function fetchBrands() {
	try {
		return await fetchWithAuth("http://13.200.221.80:8000/api/brands/");
	} catch (error) {
		console.error("An error occurred while fetching brands:", error);
		throw new Error("An error occurred while fetching brands.");
	}
}
