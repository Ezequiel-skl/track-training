import CalendarMonth from "@/components/CalendarMonth";

export default function Home() {
	return (
		<main className="flex flex-col items-center justify-center">
			<div className="w-fit text-center">
				<header>
					<button
						type="button"
						className="
              text-4xl font-semibold border-2 border-gray-400 rounded-lg px-4 py-2 hover:cursor-pointer hover:opacity-90
              mb-10 hover:border-green-600 hover:text-green-600
              "
					>
						check days
					</button>
				</header>
				<CalendarMonth />
			</div>
		</main>
	);
}
