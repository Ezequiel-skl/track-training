import { useState } from "react";

import { DAYS, MONTHS } from "@/const/date";

interface CalendarMonthProps {
	daysTraining: string[];
	daysCheck: string[];
	daysMissed: string[];
}

export default function CalendarMonth({
	daysTraining,
	daysCheck,
	daysMissed,
}: CalendarMonthProps) {
	const [currentData, setCurrentData] = useState(new Date());

	const getFirstDayOfMonth = ({
		year,
		month,
	}: { year: number; month: number }) => {
		return new Date(year, month, 1).getDay();
	};

	const getDaysOnMonth = ({ year, month }: { year: number; month: number }) => {
		return new Date(year, month + 1, 0).getDate();
	};

	const prevMonth = () => {
		setCurrentData(
			new Date(
				currentData.getFullYear(),
				currentData.getMonth() - 1,
				currentData.getDate(),
			),
		);
	};

	const nextMonth = () => {
		setCurrentData(
			new Date(
				currentData.getFullYear(),
				currentData.getMonth() + 1,
				currentData.getDate(),
			),
		);
	};

	const YEAR = currentData.getFullYear();
	const MONTH = currentData.getMonth();

	const firstDayOfMonth = getFirstDayOfMonth({ year: YEAR, month: MONTH });
	const daysInMonth = getDaysOnMonth({ year: YEAR, month: MONTH });

	const handleDateClick = (day: number) => {
		const clickedDate = new Date(YEAR, MONTH, day);
		console.log(`You clicked ${clickedDate.toDateString()}`);
	};

	const renderCells = () => {
		const today = new Date();
		const cells = [];

		for (let i = 0; i < firstDayOfMonth; i++) {
			cells.push(<td key={`empty-${i}`} className="p-2 border" />);
		}

		for (let day = 1; day <= daysInMonth; day++) {
			const isToday =
				day === today.getDate() &&
				today.getMonth() === MONTH &&
				today.getFullYear() === YEAR;

			cells.push(
				<td
					key={day}
					className={`p-2 border text-center ${isToday ? "bg-blue-200" : ""}`}
				>
					<button type="button" onClick={() => handleDateClick(day)}>
						{day}
					</button>
				</td>,
			);
		}
	};

	// Arrange cell into rows (weeks)
	const renderRows = () => {
		const cells = renderCells();
		const rows = [];
		let cellInRow = [];

		cells.forEach((cell, index) => {
			cellInRow.push(cell);

			if ((index + 1) % 7 === 0 || index === cells.length - 1) {
				rows.push(<tr key={`row-${rows.length}`}>{cellInRow}</tr>);
				cellInRow = [];
			}
		});
	};

	return <div>CalendarMonth</div>;
}
