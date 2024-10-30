import { Inter as FontSans } from "next/font/google";
import "./globals.css";

const fontSans = FontSans({
	subsets: ["cyrillic"],
	variable: "--font-sans",
});

export const metadata = {
	title: "MeraMobiles.com",
	description: "Everything about mobile phones.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning className="scroll-smooth">
			<body className={`font-sans antialiased ${fontSans.variable})`}>
				{children}
			</body>
		</html>
	);
}
