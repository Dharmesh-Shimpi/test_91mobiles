import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import ReduxProvider from "@/redux/storeProvider";
import "./globals.css";

const fontSans = FontSans({
	subsets: ["cyrillic"],
	variable: "--font-sans",
});

export const metadata = {
	title: "32Mobiles.com",
	description: "Everything about mobile phones.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<ReduxProvider>
				<body
					className={cn(
						"flex justify-center items-center min-h-screen bg-background font-sans antialiased",
						fontSans.variable
					)}
				>
					{children}
				</body>
			</ReduxProvider>
		</html>
	);
}
