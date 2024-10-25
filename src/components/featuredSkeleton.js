export default function FeaturedSkeleton() {
	return (
		<div className="w-full flex flex-col md:flex-row gap-4 px-4 md:px-16 md:gap-1">
			{/* Featured Section Skeleton */}
			<div className="w-full md:w-1/2 flex flex-col">
				<div className="border-l-4 px-3 font-bold border-blue-500 my-5">
					FEATURED
				</div>
				<div className="relative overflow-hidden rounded-xl w-full h-48 md:h-[264px] flex justify-center items-center bg-gray-200 animate-pulse">
					<div className="absolute w-full h-full bg-gradient-to-t from-neutral-600 opacity-50"></div>
					<div className="flex justify-end items-start flex-col absolute bottom-0 left-0 w-full h-full p-2">
						<div className="bg-gray-400 w-3/4 h-4 mb-2 rounded"></div>
						<div className="bg-gray-400 w-1/2 h-3 rounded"></div>
					</div>
				</div>
			</div>

			{/* Daily Section Skeleton */}
			<div className="w-full md:w-1/2 flex flex-col">
				<div className="border-l-4 px-3 font-bold border-blue-500 my-5">
					DAILY
				</div>
				<div className="grid grid-cols-2 gap-2">
					{[...Array(4)].map((_, index) => (
						<div
							key={index}
							className="relative overflow-hidden rounded-xl border w-full h-32 flex justify-center items-center bg-gray-200 animate-pulse"
						>
							<div className="absolute w-full h-full bg-gradient-to-t from-neutral-600 opacity-50"></div>
							<div className="flex justify-end items-start flex-col absolute bottom-0 left-0 w-full p-2">
								<div className="bg-gray-400 w-3/4 h-3 mb-1 rounded"></div>
								<div className="bg-gray-400 w-1/2 h-2 rounded"></div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
