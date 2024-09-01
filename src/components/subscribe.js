import css from "./subscribe.module.css";

export default function Subscribe() {
	return (
		<div
			className={`${css.svg} w-11/12 py-10 rounded-lg flex flex-col justify-center items-center`}
		>
			<div className="text-white lg:text-xl sm:text-xs md:text-sm font-bold mb-5 text-center">
				Subscribe to our newsletter to get updates immediately
			</div>
			<form className="bg-white rounded-lg flex flex-col sm:flex-row md:flex-row lg:flex-row justify-evenly items-center sm:w-5/6 md:w-5/6 lg:w-3/4  min-h-fit p-4">
				<input
					type="email"
					className="rounded-md border h-10 p-2 md:text-sm sm:text-xs  sm:w-60 md:w-72 lg:w-80"
					placeholder="Enter your email..."
				/>
				<input
					type="number"
					maxLength={10}
					className="rounded-md border h-10 p-2 md:text-sm sm:text-xs  sm:w-60 md:w-72 lg:w-80"
					placeholder="Enter mobile number..."
				/>
				<button
					type="submit"
					className="bg-blue-700 h-10 rounded-md p-2 md:text-sm sm:text-xs  text-white mt-2 sm:mt-0"
				>
					Subscribe
				</button>
			</form>
		</div>
	);
}
