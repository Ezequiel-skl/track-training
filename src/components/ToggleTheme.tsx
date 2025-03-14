import { create } from "zustand";

type Store = {
	theme: "light" | "dark";
	toogleTheme: () => void;
};

const useStoreTheme = create<Store>()((set) => ({
	theme: "light",
	toogleTheme: () =>
		set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
}));

function ToogleTheme({ classList }: { classList?: string }) {
	const { theme, toogleTheme } = useStoreTheme();

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
