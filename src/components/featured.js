import { json } from "@/dummyJson";

export default function Featured() {
	return (
		<section className="py-10 w-screen flex justify-center items-center bg-slate-100 overflow-hidden">
			<div className="w-full sm:mx-0 md:mx-5 lg:mx-16 phone-lg:w-full sm:w-full md:w-7/8 lg:w-7/8 xl:w-7/8 flex flex-col md:flex-row gap-4 px-4">
				{/* Featured Section */}
				<div className="phone-sm:w-full phone-md:w-full phone-lg:w-full sm:w-full md:w-1/2 lg:w-1/2 xl:1/2 rounded-xl flex-grow flex-shrink">
					<div className="border-l-4 px-3 font-bold border-blue-500 my-5 text-xl phone-lg:text-lg phone-md:text-md phone-sm:text-sm">
						FEATURED
					</div>
					<div className="relative overflow-hidden rounded-xl w-full">
						<img
							src="https://m.media-amazon.com/images/I/71zFdS29uFL._SX679_.jpg"
							alt="Featured"
							className="object-cover w-full h-full"
						/>
						<div className="flex justify-end items-start flex-col absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black">
							<div className="pl-2 text-white phone-sm:text-xxs phone-md:text-xs phone-lg:text-xs sm:text-sm line-clamp-2	">
								TCL 108 cm (43 inches) Metallic Bezel-Less Series 4K Ultra HD
								Smart LED Google TV 43V6B (Black)
							</div>
							<div className="text-white phone-sm:text-xxs phone-md:text-xs phone-lg:text-xs sm:text-sm line-clamp-2 p-2">
								2 min read . 4 hours ago
							</div>
						</div>
					</div>
				</div>
				{/* Daily Section */}
				<div className="phone-sm:w-full phone-md:w-full phone-lg:w-full sm:w-full md:w-1/2 lg:w-1/2 xl:1/2 flex-grow flex-shrink">
					<div className="border-l-4 px-3 font-bold border-blue-500 my-5 text-xl phone-lg:text-lg phone-md:text-md phone-sm:text-sm">
						DAILY
					</div>
					<div className="flex flex-wrap gap-4 items-center justify-center">
						{json.map((item, index) => (
							<div
								key={index}
								className="relative overflow-hidden rounded-xl border w-full"
								style={{
									width: "calc(50% - 0.5rem)",
									height: "calc((30vw - 0.5rem) * 0.5)",
								}}
							>
								<img
									src={item.img}
									alt={item.desc}
									className="object-cover w-full h-full"
								/>
								<div className="flex justify-end items-start flex-col absolute bottom-0 left-0 w-full p-2 h-full bg-gradient-to-t from-black">
									<div className="text-white phone-sm:text-xxs phone-md:text-xxs phone-lg:text-xxs sm:text-xs mb-2 line-clamp-2">
										{item.desc}
									</div>
									<div className="text-white text-xs phone-lg:text-xxs phone-md:text-xxs phone-sm:text-xxs line-clamp-2">
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
