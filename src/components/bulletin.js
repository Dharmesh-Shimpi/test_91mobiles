"use client";

import { useSelector } from "react-redux";
import css from "./bulletin.module.css";

export default function Bulletin() {
	const { filteredData } = useSelector((state) => state.fetch);
	const combinedData = [...filteredData];

	return (
		<div className={css.bulletinContainer}>
			<div className={css.bulletinContent}>
				{combinedData.map((item, index) => (
					<span key={index}>
						{item.meta_desc}
						{index < combinedData.length - 1 ? " | " : ""}
					</span>
				))}
			</div>
		</div>
	);
}
