type ChebronIconProps = {
	left?: boolean;
	right?: boolean;
	top?: boolean;
	bottom?: boolean;
	classList?: string;
	width?: number;
	height?: number;
	strokeWidth?: number;
};

export default function ChebronIcon({
	left,
	right,
	top,
	bottom,
	classList,
	width = 24,
	height = 24,
	strokeWidth = 1,
}: ChebronIconProps) {
	let position = 0;

	if (left) {
		position = 180;
	} else if (right) {
		position = 0;
	} else if (top) {
		position = 270;
	} else if (bottom) {
		position = 90;
	}

	return (
		<svg
			{...{ className: classList }}
			width={width}
			height={height}
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={strokeWidth}
			role="img"
			aria-label="ChebronIcon"
			style={{ transform: `rotate(${position}deg)` }}
		>
			<path stroke="none" d="M0 0h24v24H0z" />
			<path d="m9 6 6 6-6 6" />
		</svg>
	);
}
