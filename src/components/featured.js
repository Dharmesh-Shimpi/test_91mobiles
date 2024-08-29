import { json } from "@/dummyJson";

export default function Featured() {
	return (
		<section className="p-5 flex justify-center items-center bg-slate-100">
			<div className="w-7/8 flex md:flex-row lg:flex-row sm:flex-col phone-lg:flex-col phone-md:flex-col phone-sm:flex-col">
				{/* Featured Section */}
				<div className="m-1 flex flex-col flex-grow flex-shrink">
					<div className="border-l-4 px-3 font-bold border-blue-500 my-5 text-xl phone-lg:text-lg phone-md:text-md phone-sm:text-sm">
						FEATURED
					</div>
					<div className="relative overflow-hidden md:h-[400px] md:w-[500px] rounded-xl sm:h-[300px] sm:w-[350px] phone-lg:h-[250px] phone-lg:w-[300px] phone-md:h-[200px] phone-md:w-[250px] phone-sm:h-[150px] phone-sm:w-[200px]">
						<img
							src="https://m.media-amazon.com/images/I/71zFdS29uFL._SX679_.jpg"
							alt="Featured"
							className="object-cover w-full h-full"
						/>
						<div className="flex justify-end items-start flex-col absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black">
							<div className="p-2 text-white text-sm phone-lg:text-xs phone-md:text-xs phone-sm:text-xxs">
								TCL 108 cm (43 inches) Metallic Bezel-Less Series 4K Ultra HD
								Smart LED Google TV 43V6B (Black)
							</div>
							<div className="text-white text-xs phone-lg:text-xxs phone-md:text-xxs phone-sm:text-xxs p-2">
								2 min read . 4 hours ago
							</div>
						</div>
					</div>
				</div>
				{/* Daily Section */}
				<div className="flex flex-col flex-grow flex-shrink max-w-fit">
					<div className="border-l-4 px-3 font-bold border-blue-500 my-5 text-xl phone-lg:text-lg phone-md:text-md phone-sm:text-sm">
						DAILY
					</div>
					<div className="flex flex-wrap gap-2">
						{json.map((item, index) => (
							<div
								key={index}
								className="relative overflow-hidden rounded-xl border flex-grow flex-shrink md:h-[200px] md:w-[300px] phone-lg:h-[180px] phone-lg:w-[230px] phone-md:h-[150px] phone-md:w-[200px] phone-sm:h-[120px] phone-sm:w-[180px]"
							>
								<img
									src={item.img}
									alt={item.desc}
									className="object-cover w-full h-full"
								/>
								<div className="flex justify-end items-start flex-col absolute bottom-0 left-0 w-full p-2 h-full bg-gradient-to-t from-black">
									<div className="text-white text-xs phone-lg:text-xxs phone-md:text-xxs phone-sm:text-xxs">
										{item.desc}
									</div>
									<div className="text-white text-xs phone-lg:text-xxs phone-md:text-xxs phone-sm:text-xxs">
										{item.text}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
