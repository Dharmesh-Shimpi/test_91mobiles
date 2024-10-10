"use client";

import { useRouter } from "next/navigation";

const OverlayButton = ({ slug }) => {
	const router = useRouter();

	const handleClick = () => {
		router.push(`/${slug}`);
	};

	return <div className="absolute inset-0 z-10 cursor-pointer" onClick={handleClick}></div>;
};

export default OverlayButton;
