import CalendarMonth from "@/components/CalendarMonth";
import CheckDay from "@/components/CheckDay";
import Statistics from "@/components/Statistics";

export default function Home() {
	return (
		<main className="flex flex-col items-center justify-center">
			<div className="w-fit text-center">
				<header>
					<CheckDay />
				</header>
				<div className="flex gap-5">
					<CalendarMonth />
					<Statistics />
				</div>
			</div>
		</main>
	);
}
