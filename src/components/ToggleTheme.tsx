import { useEffect } from "react";
import { useStoreTheme } from "../store/themeStore";

function ToogleTheme({ classList }: { classList?: string }) {
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
			className={classList}
		>
			{theme === "light" ? (
				<img src="./sun.svg" alt="An icon of a Sun" />
			) : (
				<img src="./moon.svg" alt="An icon of a Moon" />
			)}
		</button>
	);
}

export { useStoreTheme, ToogleTheme };
