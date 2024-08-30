import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWithAuth } from "@/utils/fetchHelper";

// Fetch articles
export const fetchArticles = createAsyncThunk(
	"articles/fetchArticles",
	async ({}, { rejectWithValue }) => {
		let allResults = [];
		try {
			for (let page = 1; ; page++) {
				const data = await fetchWithAuth(
					`http://13.200.221.80:8000/api/articles/?page=${page}`
				);
				const { next, results } = data;

				if (!results || results.length === 0) break;

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

				if (!next) break;
			}

			allResults.sort(
				(a, b) => new Date(b.publish_date) - new Date(a.publish_date)
			);
			return allResults;
		} catch (error) {
			return rejectWithValue("An error occurred while fetching articles.");
		}
	}
);

// Fetch categories
export const fetchCategories = createAsyncThunk(
	"fetch/categories",
	async () => {
		return fetchWithAuth("http://13.200.221.80:8000/api/categories/");
	}
);

// Fetch brands
export const fetchBrands = createAsyncThunk("fetch/brands", async () => {
	return fetchWithAuth("http://13.200.221.80:8000/api/brands/");
});

const fetchSlice = createSlice({
	name: "fetch",
	initialState: {
		data: [],
		filteredData: [],
		page: 1,
		hasMore: true,
		filters: null,
		name: "",
		checkedItems: {
			category: [],
			brand: [],
		},
		categories: [],
		brands: [],
		loading: false,
		error: null,
	},
	reducers: {
		setFilters: (state, action) => {
			state.filters = action.payload;
			state.page = 1;
			state.filteredData = [];
		},
		setName: (state, action) => {
			state.name = action.payload;
			state.page = 1;
			state.filteredData = [];
		},
		setPage: (state, action) => {
			state.page = action.payload;
		},
		setCheckedItems: (state, action) => {
			state.checkedItems = action.payload;
			state.page = 1;
			state.filteredData = [];
		},
		applyFilter: (state) => {
			const { filters, name, data, checkedItems } = state;
			let filteredData = [...data];

			if (filters) {
				const tagFilters = {
					"Hot Deals": 1,
					"Popular Comparison": 2,
					"Upcoming Gadgets": 3,
					"Latest Gadgets": 4,
				};
				if (tagFilters[filters]) {
					filteredData = filteredData.filter((item) =>
						item.tags.includes(tagFilters[filters])
					);
				}
			}

			if (name) {
				filteredData = filteredData.filter((item) =>
					item.title.toLowerCase().includes(name.toLowerCase())
				);
			}

			if (checkedItems.category.length > 0) {
				filteredData = filteredData.filter((item) =>
					checkedItems.category.includes(item.category)
				);
			}

			if (checkedItems.brand.length > 0) {
				filteredData = filteredData.filter((item) =>
					item.brands.some((brand) => checkedItems.brand.includes(brand))
				);
			}

			state.filteredData = filteredData;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchArticles.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchArticles.fulfilled, (state, action) => {
				state.loading = false;
				if (state.page === 1) {
					state.data = action.payload;
				} else {
					state.data = [...state.data, ...action.payload];
				}
				// Do not call applyFilter here
			})
			.addCase(fetchArticles.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(fetchCategories.fulfilled, (state, action) => {
				state.categories = action.payload;
			})
			.addCase(fetchBrands.fulfilled, (state, action) => {
				state.brands = action.payload;
			});
	},
});

export const { setFilters, setName, setPage, setCheckedItems, applyFilter } =
	fetchSlice.actions;

export default fetchSlice.reducer;
