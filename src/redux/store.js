import { configureStore } from "@reduxjs/toolkit";
import fetchRedux from "./fetch.redux";

const store = configureStore({
	reducer: {
		fetch: fetchRedux,
	},
});

export default store;
