import { useEffect, useState } from "react";
import type { JSX } from "react";
import { MONTHS_NAMES, DAYS_NAMES } from "@/const/date";
import MarkedDaySvg from "@/assets/MarkedDaySvg";
import ChebronIcon from "@/assets/ChebronIcon";

export default function CalendarMonth() {
	const [currentData, setCurrentData] = useState(new Date());
	const [daysTraining, setDaysTraining] = useState<number[]>([]);

	useEffect(() => {
		const daysStorage = localStorage.getItem("day");

		if (daysStorage) {
			setDaysTraining(JSON.parse(daysStorage));
		}
	}, []);

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

	const year = currentData.getFullYear();
	const month = currentData.getMonth();

	const firstDayOfMonth = getFirstDayOfMonth({ year: year, month: month });
	const daysInMonth = getDaysOnMonth({ year: year, month: month });

	const handleDateClick = (day: number) => {
		const clickedDate = new Date(year, month, day);
		console.log(`You clicked ${clickedDate.toDateString()}`);
	};

	const renderCells = () => {
		const today = new Date();
		const cells = [];

		const weekLastStarting = new Date();
		weekLastStarting.setDate(weekLastStarting.getDate() + 7);

		for (let i = 0; i < firstDayOfMonth; i++) {
			cells.push(
				<td key={`empty-${i}`} className="p-2 border-2 border-gray-400" />,
			);
		}

		for (let day = 1; day <= daysInMonth; day++) {
			const currentDay = new Date(year, month, day);

			const isToday =
				day === today.getDate() &&
				today.getMonth() === month &&
				today.getFullYear() === year;

			const daysOfWeek = currentDay.getDay();

			const weekStartTrack = currentDay >= weekLastStarting;

			const dayMakedTraining = daysTraining.includes(daysOfWeek);

			const shouldShowSvg = dayMakedTraining && weekStartTrack;

			cells.push(
				<td
					key={day}
					className={`
            p-2 border-2 border-gray-400 hover:cursor-pointer hover:opacity-90 text-center relative
            overflow-hidden
          `}
				>
					{shouldShowSvg && <MarkedDaySvg color="#ffc9c9" />}
					{isToday && <MarkedDaySvg color="blue" />}
					<button
						type="button"
						onClick={() => handleDateClick(day)}
						className="w-full h-full relative z-10"
					>
						{day}
					</button>
				</td>,
			);
		}

		return cells;
	};

	// Arrange cell into rows (weeks)
	const renderRows = (): React.ReactElement[] => {
		const cells: React.ReactElement[] = renderCells();
		const rows: React.ReactElement[] = [];
		let cellsInRow: React.ReactElement[] = [];

		cells.forEach((cell: JSX.Element, index: number) => {
			cellsInRow.push(cell);

			if ((index + 1) % 7 === 0 || index === cells.length - 1) {
				rows.push(<tr key={`row-${rows.length}`}>{cellsInRow}</tr>);
				cellsInRow = [];
			}
		});

		return rows;
	};

	return (
		<section className="max-w-md mx-auto p-4 border-2 border-gray-400 rounded-lg min-h-[372px]">
			<div className="flex justify-between items-center mb-4">
				<button
					onClick={prevMonth}
					className="p-3 border-2 border-gray-400 rounded-lg hover:cursor-pointer hover:opacity-90"
					type="button"
				>
					<ChebronIcon left strokeWidth={2} />
				</button>
				<h2 className="text-xl font-bold">
					{MONTHS_NAMES[month]} {year}
				</h2>
				<button
					onClick={nextMonth}
					className="p-3 border-2 border-gray-400 rounded-lg hover:cursor-pointer hover:opacity-90"
					type="button"
				>
					<ChebronIcon strokeWidth={2} />
				</button>
			</div>

			<table className="w-full border-collapse">
				<thead>
					<tr>
						{DAYS_NAMES.map((day) => (
							<th
								key={day}
								className="p-2 border-2 border-gray-400 rounded-lg hover:cursor-pointer hover:opacity-90"
							>
								{day}
							</th>
						))}
					</tr>
				</thead>
				<tbody>{renderRows()}</tbody>
			</table>
		</section>
	);
}
