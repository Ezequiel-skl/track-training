import { useId, useState, useImperativeHandle, forwardRef } from "react";
import type { CalendarWeekHandle } from "@/types/CalendarWeekHandle";
import { DAYS_NAMES } from "@/const/date";

export const CalendarWeek = forwardRef<CalendarWeekHandle>((_, ref) => {
	const [days, setDays] = useState<number[]>([]);

	const handleClick = (dayIndex: number) => {
		setDays((prev) =>
			prev.includes(dayIndex)
				? prev.filter((d) => d !== dayIndex)
				: [...prev, dayIndex],
		);
	};

	const handleStoreDays = () => {
		localStorage.setItem("day", JSON.stringify(days));
	};

	useImperativeHandle(ref, () => ({
		saveDays: handleStoreDays,
	}));

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
						onClick={() => handleClick(index)}
					>
						{day}
					</button>
				);
			})}
		</div>
	);
});
