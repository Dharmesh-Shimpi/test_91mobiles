import Subscribe from "@/components/subscribe";

export default function TopAndMainSkeleton() {
	return (
		<>
			{/* Top eight items skeleton */}
			<div className="flex flex-wrap gap-2 justify-center items-center w-full mb-6 xl:gap-8">
				{[...Array(8)].map((_, index) => (
					<div
						key={index}
						className="border text-sm w-full h-96 md:w-64 rounded-lg flex flex-col overflow-hidden relative bg-gray-200 animate-pulse"
					>
						<div className="h-3/4 w-full flex justify-center items-center relative bg-gray-300">
							<div className="w-full h-full bg-gray-200"></div>
						</div>
						<div className="bg-slate-100 p-3 flex flex-col justify-between h-1/4 w-full">
							<div className="bg-gray-300 h-6 rounded-md mb-2 w-3/4 mx-auto"></div>
							<div className="flex justify-between text-xs">
								<div className="bg-gray-300 h-4 w-1/4 rounded-md"></div>
								<div className="bg-gray-300 h-4 w-1/4 rounded-md"></div>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Subscribe component */}
			<div className="w-full flex justify-center items-center">
				<Subscribe />
			</div>

			{/* Remaining items skeleton */}
			<div className="flex flex-wrap gap-2 justify-center items-center w-full mt-6 xl:gap-8">
				{[...Array(10)].map((_, index) => (
					<div
						key={index}
						className="border text-sm w-full h-96 md:w-64 rounded-lg flex flex-col overflow-hidden relative bg-gray-200 animate-pulse"
					>
						<div className="h-3/4 w-full flex justify-center items-center relative bg-gray-300">
							<div className="w-full h-full bg-gray-200"></div>
						</div>
						<div className="bg-slate-100 p-3 flex flex-col justify-between h-1/4 w-full">
							<div className="bg-gray-300 h-6 rounded-md mb-2 w-3/4 mx-auto"></div>
							<div className="flex justify-between text-xs">
								<div className="bg-gray-300 h-4 w-1/4 rounded-md"></div>
								<div className="bg-gray-300 h-4 w-1/4 rounded-md"></div>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
}
