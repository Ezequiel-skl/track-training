import { useStoreTheme } from "../components/ToggleTheme";
import { BG_DARK_THEME, BG_LIGHT_THEME } from "../const/bgTheme";
import { Outlet } from "react-router";
import Header from "@/components/Header";
import DevTools from "@/components/DevTools";

export default function Layout() {
	const theme = useStoreTheme((state) => state.theme);

	const bg = theme === "light" ? BG_DARK_THEME : BG_LIGHT_THEME;
	const colorText = theme === "light" ? "darkTheme" : "lightTheme";

	return (
		<>
			<section className={`${colorText} h-full [&_main]:h-full`}>
				<Header />
				<Outlet />
				<div className={`${bg}`} />
			</section>
			<DevTools />
		</>
	);
}
