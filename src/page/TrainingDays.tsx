import { useRef } from "react";
import { CalendarWeek } from "@/components/CalendarWeek";
import type { CalendarWeekHandle } from "@/types/CalendarWeekHandle";
import { useNavigate } from "react-router";

export default function TrainingDays() {
	const daysRef = useRef<CalendarWeekHandle | null>(null);
	const navigate = useNavigate();

	const handlePushDataDay = () => {
		if (daysRef.current) {
			daysRef.current.saveDays();
			navigate("/home");
		}
	};

	return (
		<main className="flex flex-col items-center justify-center">
			<div className="w-fit text-center">
				<header className="mb-10">
					<h1 className="text-5xl font-bold">Training days</h1>
				</header>
				<CalendarWeek ref={daysRef} />
				<footer className="mt-10 flex justify-end w-full">
					<button
						onClick={handlePushDataDay}
						type="button"
						className="text-1xl font-semibold border-2 border-gray-400 rounded-lg px-4 py-2 hover:cursor-pointer hover:opacity-90"
					>
						Start Track training
					</button>
				</footer>
			</div>
		</main>
	);
}
