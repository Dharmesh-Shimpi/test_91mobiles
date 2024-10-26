export default function ArticleSkeleton() {
	return (
		<div
			style={{ backgroundColor: "#f2f2f2" }}
			className="w-full phone-sm:p-0 md:p-8 lg:px-12 animate-pulse"
		>
			<div className="flex flex-wrap phone-sm:mx-0 md:mx-4 w-full relative">
				{/* Main Article Section Skeleton */}
				<div className="phone-sm:w-full md:w-[850px] phone-sm:p-0 md:px-4 mb-8">
					<div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
						<div className="h-8 bg-gray-300 rounded mb-4 w-3/4"></div>

						<div className="flex justify-between items-center mb-4">
							<div className="h-4 bg-gray-300 rounded w-1/2"></div>
							<div className="h-8 bg-gray-300 rounded w-10"></div>
						</div>

						<div className="flex justify-center items-center mb-6">
							<div className="h-48 w-48 bg-gray-300 rounded-lg"></div>
						</div>

						<div className="space-y-3 mb-6">
							<div className="h-4 bg-gray-300 rounded w-full"></div>
							<div className="h-4 bg-gray-300 rounded w-5/6"></div>
							<div className="h-4 bg-gray-300 rounded w-4/5"></div>
						</div>

						<div className="space-y-4 mb-6">
							<div className="h-4 bg-gray-300 rounded w-full"></div>
							<div className="h-4 bg-gray-300 rounded w-5/6"></div>
							<div className="flex justify-center items-center">
								<div className="h-48 w-48 bg-gray-300 rounded-lg"></div>
							</div>
							<div className="h-4 bg-gray-300 rounded w-full"></div>
							<div className="h-4 bg-gray-300 rounded w-4/5"></div>
							<div className="flex justify-center items-center">
								<div className="h-48 w-48 bg-gray-300 rounded-lg"></div>
							</div>
							<div className="h-4 bg-gray-300 rounded w-5/6"></div>
						</div>
					</div>
				</div>

				{/* Related Articles Section Skeleton */}
				<div className="phone-sm:w-full md:w-[350px] phone-sm:m-0 md:mx-16">
					<div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
						<div className="h-6 bg-gray-300 rounded mb-4 w-3/4"></div>
						<div className="space-y-3">
							<div className="h-4 bg-gray-300 rounded w-full"></div>
							<div className="h-4 bg-gray-300 rounded w-5/6"></div>
							<div className="h-4 bg-gray-300 rounded w-4/5"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
