/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "beta.32mobiles.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "rukminim2.flixcart.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "plus.unsplash.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "example.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "i.ytimg.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "www.trustedreviews.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "cdn.vox-cdn.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "telecomtalk.info",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "akm-img-a-in.tosshub.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "www.yugatech.com",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
