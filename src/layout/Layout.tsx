import { useStoreTheme, ToogleTheme } from "../components/ToggleTheme";
import { BG_DARK_THEME, BG_LIGHT_THEME } from "../const/bgTheme";
import { Outlet } from "react-router";

export default function Layout() {
	const theme = useStoreTheme((state) => state.theme);

	const bg = theme === "light" ? BG_DARK_THEME : BG_LIGHT_THEME;
	const colorText = theme === "light" ? "text-white" : "text-black";

	return (
		<section className={`${colorText} h-full [&_main]:h-full`}>
			<header>
				<ToogleTheme classList="absolute top-4 right-4" />
			</header>
			<Outlet />
			<div className={`${bg}`} />
		</section>
	);
}
