export default function Hidden({ data }) {
	return (
		<div className="hidden">
			{Array.isArray(data) &&
				data.map((item) => (
					<div key={item.article_id} className="">
						{/* <div className="h-3/4 w-full">
								<img
									className="h-full w-full object-cover"
									src={item.image_url}
									alt={item.title}
								/>
							</div> */}
						<div>
							{item.title}
							{item.meta_desc}
						</div>
					</div>
				))}
		</div>
	);
}
