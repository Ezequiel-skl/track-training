import { useId, useState, useImperativeHandle, forwardRef } from "react";
import type { CalendarWeekHandle } from "@/types/CalendarWeekHandle";
import { DAYS } from "@/const/date";

export const CalendarWeek = forwardRef<CalendarWeekHandle>((_, ref) => {
	const [days, setDays] = useState<string[]>([]);

	const handleClick = (day: string) => {
		setDays((prevDays) =>
			prevDays.includes(day)
				? prevDays.filter((d) => d !== day)
				: [...prevDays, day],
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
			{DAYS.map((day) => (
				<button
					type="button"
					key={useId()}
					className={`
              ${days.includes(day) ? "border-green-600 text-green-600" : "border-gray-400"} 
              w-[70px] h-[70px] text-center border-2 border-gray-400 rounded-lg font-semibold 
              hover:cursor-pointer hover:opacity-90
            `}
					onClick={() => handleClick(day)}
				>
					{day}
				</button>
			))}
		</div>
	);
});
