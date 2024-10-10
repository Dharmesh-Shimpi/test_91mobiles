import Subscribe from "@/components/subscribe";

export default function TopAndMain({ initialData }) {
	return (
		<div className="w-full flex flex-col items-center">
			{/* Top eight items */}
			<div className="flex flex-col items-center w-full mb-6">
				<div className="flex flex-wrap justify-center items-center w-full">
					{Array.isArray(initialData) &&
						initialData.slice(0, 8).map((item) => (
							<div
								key={item.article_id}
								className="border text-sm w-60 m-2 h-96 rounded-lg flex flex-col overflow-hidden cursor-pointer"
							>
								<div className="h-3/4 w-full">
									<img
										className="h-full w-full object-cover"
										src={item.image_url}
										alt={item.title}
									/>
								</div>
								<div className="bg-slate-100 p-3 flex flex-col justify-between h-1/4">
									<div className="font-bold text-center line-clamp-2">
										{item.title}
									</div>
									<div className="flex justify-between text-xs">
										<p>30 sec read</p>
										<p>{item.publish_date}</p>
									</div>
								</div>
							</div>
						))}
				</div>
			</div>

			{/* Subscribe component */}
			<div className="w-full flex justify-center items-center">
				<Subscribe />
			</div>

			{/* Remaining items */}
			<div className="w-full flex flex-col items-center">
				<div className="flex flex-wrap justify-center items-center w-full">
					{Array.isArray(initialData) &&
						initialData.slice(8).map((item) => (
							<div
								key={item.article_id}
								className="border text-sm w-60 m-2 h-96 rounded-lg flex flex-col overflow-hidden cursor-pointer"
							>
								<div className="h-3/4 w-full">
									<img
										className="h-full w-full object-cover"
										src={item.image_url}
										alt={item.title}
									/>
								</div>
								<div className="bg-slate-100 p-3 flex flex-col justify-between h-1/4">
									<div className="font-bold text-center line-clamp-2">
										{item.title}
									</div>
									<div className="flex justify-between text-xs">
										<p>30 sec read</p>
										<p>{item.publish_date}</p>
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
}
