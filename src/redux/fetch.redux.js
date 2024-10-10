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
		filter: "All Articles",
	},
	reducers: {
		setArticles(state, action) {
			state.articles = action.payload;
			state.filteredData = state.articles;
		},
		setCheckedItems(state, action) {
			state.checkedItems = action.payload;
			state.page = 1;
			state.name = ""; 
			state.filter = "All Articles"; 
			state.filteredData = applyFilter(state);
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
			state.filteredData = applyFilter(state);
		},
		setName(state, action) {
			state.name = action.payload;
			state.page = 1;
			state.filteredData = applyFilter(state);
		},
	},
});

const applyFilter = (state) => {
	const { filter, name, articles, checkedItems } = state;
	let filteredData = [...articles];

	if (filter !== "All Articles") {
		const tagFilters = {
			"Hot Deals": 0,
			"Popular Comparison": 1,
			"Upcoming Gadgets": 2,
			"Latest Gadgets": 3,
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
			checkedItems.category.some(
				(checkedItem) => checkedItem.id === item.category
			)
		);
	}

	if (checkedItems.brand.length > 0) {
		filteredData = filteredData.filter((item) =>
			item.brands.some((brand) =>
				checkedItems.brand.some((checkedItem) => checkedItem.id === brand)
			)
		);
	}

	return filteredData;
};

export const {
	setArticles,
	setCheckedItems,
	setPage,
	setLoading,
	setCategories,
	setBrands,
	setFilters,
	setName,
} = fetchSlice.actions;

export default fetchSlice.reducer;
