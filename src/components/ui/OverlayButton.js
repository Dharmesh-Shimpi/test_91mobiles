"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

const OverlayButton = ({ slug }) => {
	const router = useRouter();
	const [isPending, transition] = useTransition();
	const handleClick = () => {
		transition(() => {
			router.push(`/${slug}`);
		});
	};

	return (
		<div
			next={isPending ? "a" : undefined}
			className="absolute inset-0 z-10 cursor-pointer"
			onClick={handleClick}
		></div>
	);
};

export default OverlayButton;
