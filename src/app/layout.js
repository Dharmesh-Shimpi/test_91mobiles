import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import ReduxProvider from "@/redux/storeProvider";
import Featured from "@/components/featured";
import Bulletin from "@/components/bulletin";
import "./globals.css";
import Filter from "@/components/filterNav";

const fontSans = FontSans({
	subsets: ["latin"],
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
						"flex flex-col justify-center items-center min-h-screen bg-background font-sans antialiased",
						fontSans.variable
					)}
				>
					{/* <Bulletin /> */}
					<Featured />
					<Filter />
					{children}
				</body>
			</ReduxProvider>
		</html>
	);
}
