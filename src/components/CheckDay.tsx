import { useTrainingStats } from "@/store/TrainingStats";
import { useDayTraining } from "@/store/dayTrainingStore";
import { useEffect, useState } from "react";

export default function CheckDay() {
	const { days } = useDayTraining();
	const { incrementStreak, saveDays, resetStreak, hasTrainedToday } =
		useTrainingStats();
	const [disableBts, setDisableBts] = useState(false);

	const today = new Date().getDay();
	const alreadyTrained = hasTrainedToday();

	useEffect(() => {
		if (days.includes(today)) {
			setDisableBts(true);
		}
	}, [days, today]);

	const handleClick = () => {
		console.log(days.includes(today));
		console.log("click");

		if (alreadyTrained && days.includes(today)) {
			incrementStreak();
			saveDays(true);
		} else {
			resetStreak();
			saveDays(false);
		}
	};

	const styleDisableOn = "hover:cursor-not-allowed brightness-50 ";
	const styleDisableOff =
		"hover:border-green-600 hover:text-green-600 hover:cursor-pointer";

	return (
		<button
			type="button"
			className={`
        text-4xl font-semibold border-2 border-gray-400 rounded-lg px-4 py-2 hover:opacity-90 mb-10
        ${disableBts ? styleDisableOff : styleDisableOn}
      `}
			onClick={handleClick}
			title={disableBts ? "Complete the Day" : "Today you don't have to train"}
		>
			check days
		</button>
	);
}
