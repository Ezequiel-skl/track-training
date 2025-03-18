import CalendarWeek from "@/components/CalendarWeek";
import { useNavigate } from "react-router";
import { useDayTraining } from "@/store/dayTrainingStore";

export default function TrainingDays() {
	const { saveDays, days } = useDayTraining();
	const navigate = useNavigate();

	const handlePushDataDay = () => {
		if (days.length >= 1) {
			navigate("/home");
			saveDays();
		}
	};

	return (
		<main className="flex flex-col items-center justify-center">
			<div className="w-fit text-center">
				<header className="mb-10">
					<h1 className="text-5xl font-bold">Training days</h1>
				</header>
				<CalendarWeek />
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
