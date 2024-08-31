import { createSlice } from "@reduxjs/toolkit";

const fetchSlice = createSlice({
	name: "fetch",
	initialState: {
		articles: [],
		filteredData: [],
		checkedItems: { category: [], brand: [] },
		categories: [],
		brands: [],
		page: 1,
		hasMore: true,
		loading: false,
		name: "",
		filter: "All Articles", // Initialize with default filter
	},
	reducers: {
		setArticles(state, action) {
			state.articles = Array.isArray(action.payload) ? action.payload : [];
			state.filteredData = state.articles; // Set filtered data to initial articles
		},
		setCheckedItems(state, action) {
			state.checkedItems = action.payload;
			state.page = 1;
			state.filteredData = [];
			applyFilter(state); // Call applyFilter after setting checked items
		},
		setPage(state, action) {
			state.page = action.payload;
		},
		setLoading(state, action) {
			state.loading = action.payload;
		},
		setCategories(state, action) {
			state.categories = action.payload;
		},
		setBrands(state, action) {
			state.brands = action.payload;
		},
		setFilters(state, action) {
			state.filter = action.payload;
			state.page = 1;
			state.filteredData = [];
			applyFilter(state); // Call applyFilter after setting filters
		},
		setName(state, action) {
			state.name = action.payload;
			state.page = 1;
			state.filteredData = [];
			applyFilter(state); // Call applyFilter after setting name
		},
		applyFilter(state) {
			const { filter, name, articles, checkedItems } = state;
			let filteredData = [...articles];

			if (filter !== "All Articles") {
				const tagFilters = {
					"Hot Deals": 1,
					"Popular Comparison": 2,
					"Upcoming Gadgets": 3,
					"Latest Gadgets": 4,
				};
				if (tagFilters[filter]) {
					filteredData = filteredData.filter((item) =>
						item.tags.includes(tagFilters[filter])
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
});

export const {
	setArticles,
	setCheckedItems,
	setPage,
	setLoading,
	setCategories,
	setBrands,
	setFilters,
	setName,
	applyFilter,
} = fetchSlice.actions;

export default fetchSlice.reducer;
