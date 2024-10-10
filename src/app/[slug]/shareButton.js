"use client";

import { useState } from "react";
import {
	FacebookShareButton,
	TwitterShareButton,
	LinkedinShareButton,
	FacebookIcon,
	TwitterIcon,
	LinkedinIcon,
} from "react-share";
import { IoArrowRedo } from "react-icons/io5";

export default function ShareButton({ article }) {
	const [showShareOptions, setShowShareOptions] = useState(false);

	// Toggle the share options dropdown
	const toggleShareOptions = () => {
		setShowShareOptions(!showShareOptions);
	};

	const shareUrl = typeof window !== "undefined" ? window.location.href : "";

	return (
		<div className="relative">
			<p
				onClick={toggleShareOptions}
				className="cursor-pointer flex items-center italic text-sm text-blue-700"
			>
				Share
				<IoArrowRedo className="ml-2" />
			</p>

			{showShareOptions && (
				<div className="absolute flex right-0 w-fit z-10">
					<FacebookShareButton url={shareUrl} quote={article.title}>
						<FacebookIcon className="m-1" size={34} round />
					</FacebookShareButton>
					<TwitterShareButton url={shareUrl} title={article.title}>
						<TwitterIcon className="m-1" size={34} round />
					</TwitterShareButton>
					<LinkedinShareButton url={shareUrl} title={article.title}>
						<LinkedinIcon className="m-1" size={34} round />
					</LinkedinShareButton>
				</div>
			)}
		</div>
	);
}
