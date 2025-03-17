import { useEffect, useRef } from "react";
import rough from "roughjs";

export default function MarkedDaySvg({ color }: { color: string }) {
	const svgRef = useRef<SVGSVGElement>(null);

	useEffect(() => {
		if (svgRef.current) {
			const rc = rough.svg(svgRef.current);

			const rect = rc.rectangle(0, 0, 100, 100, {
				roughness: 1,
				fill: color,
				fillStyle: "hachure",
				hachureAngle: 60,
				hachureGap: 10,
				stroke: "none",
			});

			svgRef.current.appendChild(rect);
		}
	}, [color]);

	return (
		<svg
			ref={svgRef}
			width="60"
			height="60"
			role="img"
			aria-label="markedDaySvg"
			className="absolute inset-0 left-0 top-0"
			viewBox="0 0 100 100"
		/>
	);
}
