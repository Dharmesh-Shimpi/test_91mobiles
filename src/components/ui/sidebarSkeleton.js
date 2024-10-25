const SidebarSkeleton = () => {
	return (
		<div className="h-fit p-4 w-56 bg-gray-100 border border-gray-300 rounded-lg">
			<div className="flex items-center justify-between mb-4">
				<div className="skeleton w-1/2 h-6 bg-gray-300 animate-pulse" />
				<div className="skeleton w-1/4 h-6 bg-gray-300 animate-pulse" />
			</div>
			<div className="mb-6">
				<h3 className="text-lg font-semibold mb-2">
					<div className="skeleton w-3/4 h-4 bg-gray-300 animate-pulse" />
				</h3>
				<div className="space-y-2">
					{Array.from({ length: 4 }).map((_, index) => (
						<div
							key={index}
							className="skeleton h-6 bg-gray-300 animate-pulse"
						/>
					))}
				</div>
			</div>
			<div>
				<h3 className="text-lg font-semibold mb-2">
					<div className="skeleton w-3/4 h-4 bg-gray-300 animate-pulse" />
				</h3>
				<div className="space-y-2">
					{Array.from({ length: 4 }).map((_, index) => (
						<div
							key={index}
							className="skeleton h-6 bg-gray-300 animate-pulse"
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default SidebarSkeleton;
