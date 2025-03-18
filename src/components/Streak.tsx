import { useTrainingStats } from "@/store/TrainingStats";

export default function Streak() {
	const { streak } = useTrainingStats();

	return (
		<div className="flex items-center gap-2 text-2xl">
			<img src="./flame.svg" alt="An icon of a Flame" className="w-8 h-8" />
			<span>{streak}</span>
		</div>
	);
}
