"use client";

import { useEffect, useRef } from "react";
import css from "./bulletin.module.css";

export default function Bulletin({ combinedData }) {
	const bulletinRef = useRef(null);
	const intervalRef = useRef(null); 
	const positionRef = useRef(0); 

	useEffect(() => {
		const bulletin = bulletinRef.current;

		const scrollBulletin = () => {
			const scrollWidth = bulletin.scrollWidth / 2;

			intervalRef.current = setInterval(() => {
				positionRef.current -= 1; 
				bulletin.style.transform = `translateX(${positionRef.current}px)`;

				if (Math.abs(positionRef.current) >= scrollWidth) {
					positionRef.current = 0; 
				}
			}, 16);
		};

		scrollBulletin(); 

		const handleMouseEnter = () => clearInterval(intervalRef.current);
		const handleMouseLeave = () => scrollBulletin();
		bulletin.addEventListener("mouseenter", handleMouseEnter);
		bulletin.addEventListener("mouseleave", handleMouseLeave);

		return () => {
			clearInterval(intervalRef.current); 
			bulletin.removeEventListener("mouseenter", handleMouseEnter);
			bulletin.removeEventListener("mouseleave", handleMouseLeave);
		};
	}, [combinedData]);

	return (
		<div className={css.bulletinContainer}>
			<div className={css.bulletinContent} ref={bulletinRef}>
				{combinedData.map((item, index) => (
					<div key={index} className={css.bulletinItem}>
						<span>{item.meta_desc}</span>
					</div>
				))}
			</div>
		</div>
	);
}
