import { useEffect } from "react";
import { useStoreTheme } from "../store/themeStore";

function ToogleTheme() {
	const { theme, toogleTheme } = useStoreTheme();

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);

	const title = theme === "light" ? "Toggle dark mode" : "Toggle light mode";

	return (
		<button
			onClick={toogleTheme}
			type="button"
			title={title}
			className="
        p-1 border-2 border-gray-400 rounded-full w-17 h-8
        flex items-center justify-start
        hover:cursor-pointer hover:opacity-90
        transition-colors duration-300
      "
		>
			<div
				className={`
          absolute h-6 w-6 rounded-full border-2 border-gray-400 flex items-center justify-center
          transform transition-transform duration-300
          ${theme === "light" ? "translate-x-0" : "translate-x-8"}
        `}
			>
				{theme === "light" ? (
					<img src="./sun.svg" alt="An icon of a Sun" className="w-4 h-4" />
				) : (
					<img src="./moon.svg" alt="An icon of a Moon" className="w-4 h-4" />
				)}
			</div>
		</button>
	);
}

export { useStoreTheme, ToogleTheme };
