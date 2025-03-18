import { useId } from "react";
import { DAYS_NAMES } from "@/const/date";
import { useDayTraining } from "@/store/dayTrainingStore";

export default function CalendarWeek() {
	const { days, toggleDay } = useDayTraining();

	return (
		<div className="p-4 border-2 border-gray-400 rounded-lg flex gap-2 items-center">
			{DAYS_NAMES.map((day, index) => {
				const isSelected = days.includes(index);

				return (
					<button
						type="button"
						key={useId()}
						className={`
              ${isSelected ? "border-green-600 text-green-600" : "border-gray-400"} 
              w-[70px] h-[70px] text-center border-2 border-gray-400 rounded-lg font-semibold 
              hover:cursor-pointer hover:opacity-90
            `}
						onClick={() => toggleDay(index)}
					>
						{day}
					</button>
				);
			})}
		</div>
	);
}
