import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, type NavigateFunction } from "react-router";

const commands = [
	{
		id: 1,
		name: "Clear all local data",
		action: () => {
			localStorage.clear();
		},
	},
	{
		id: 2,
		name: "Home",
		icon: "/link.svg",
		action: (navigate?: NavigateFunction) => {
			if (navigate) navigate("/home");
		},
	},
	{
		id: 3,
		name: "Config",
		icon: "/link.svg",
		action: (navigate?: NavigateFunction) => {
			if (navigate) navigate("/config");
		},
	},
	{
		id: 4,
		name: "Training days",
		icon: "/link.svg",
		desciption: "Clear local storage to navegate to this page",
		action: (navigate?: NavigateFunction) => {
			if (navigate) navigate("/");
		},
	},
	{
		id: 5,
		name: "reset web",
		action: () => {
			window.location.reload();
		},
	},
	{
		id: 6,
		name: "clear LocalStorage and navigate to Training days",
		icon: "/link.svg",
		desciption: "Clear local data, go to home and restart the website",
		action: (navigate?: NavigateFunction) => {
			if (navigate) {
				navigate("/");
				localStorage.clear();

				setTimeout(() => {
					window.location.reload();
				}, 100);
			}
		},
	},
];

function Menu({ HandleClose }: { HandleClose: (close: boolean) => void }) {
	const [search, setSearch] = useState("");
	const [filterCommand, setFilterCommand] = useState(commands);
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const [isOpen, setIsOpen] = useState(false);
	const focusRef = useRef<HTMLInputElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const searchTerm = event.target.value;
		setSearch(searchTerm);

		const filteredCommands = commands.filter((command) =>
			command.name.toLowerCase().includes(searchTerm.toLowerCase()),
		);

		setFilterCommand(filteredCommands);
		setSelectedIndex(-1);
	};

	const executeCommand = () => {
		const selectCommand = filterCommand[selectedIndex];

		if (!selectCommand) return;

		if (selectCommand.action.length === 0) {
			selectCommand.action();
		} else {
			selectCommand.action(navigate);
		}

		closeMenu();
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "ArrowDown") {
			setSelectedIndex((prev) =>
				prev < filterCommand.length - 1 ? prev + 1 : prev,
			);
		} else if (event.key === "ArrowUp") {
			setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
		} else if (event.key === "Enter" && selectedIndex >= 0) {
			event.preventDefault();
			executeCommand();
		} else if (event.key === "Escape") {
			closeMenu();
		}
	};

	const closeMenu = useCallback(() => {
		const close = !isOpen;
		setIsOpen(close);
		HandleClose(close);
	}, [isOpen, HandleClose]);

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (isOpen && !menuRef.current?.contains(event.target as Node)) {
				closeMenu();
			}
		};

		document.addEventListener("mousedown", handleOutsideClick);
		return () => document.removeEventListener("mousedown", handleOutsideClick);
	}, [isOpen, closeMenu]);

	useEffect(() => {
		focusRef.current?.focus();
	}, []);

	return (
		<div>
			<div
				className="z-99 fixed top-28 left-1/2 -translate-x-1/2 w-[415px] flex flex-col gap-8 text-white"
				ref={menuRef}
			>
				<form>
					<div className="flex items-center bg-gray-900 rounded-lg border-2 border-gray-400">
						<label htmlFor="search" className="sr-only">
							Search
						</label>
						<span className=" p-2 text-white">/</span>
						<input
							type="text"
							name="search"
							id="search"
							value={search}
							ref={focusRef}
							onChange={handleInputChange}
							onKeyDown={handleKeyDown}
							autocomplete="off"
							placeholder="Search for a command"
							className="p-2 border-gray-400 text-white w-full focus:outline-none"
						/>
					</div>
				</form>
				<ul className="flex gap-2 flex-col">
					{filterCommand
						.slice(0, 5)
						.map(({ name, desciption, icon }, index) => {
							return (
								<li
									key={name}
									onClick={() => {
										setSelectedIndex(index);
										executeCommand();
									}}
									onKeyDown={handleKeyDown}
								>
									<button
										className={`
                    bg-gray-900 border-2 border-gray-400 p-2 w-full text-start rounded-lg hover:cursor-pointer hover:brightness-90
                    ${index === selectedIndex ? "border-white" : ""}
                  `}
										type="button"
									>
										<h2 className="flex items-center gap-1">
											<span>• {name}</span>
											{icon && (
												<img src={icon} alt="icon" className="w-4 h-4" />
											)}
										</h2>
										{desciption && (
											<small className="ml-2 text-sm text-gray-400 border-l-2 border-gray-400 pl-2">
												{desciption}
											</small>
										)}
									</button>
								</li>
							);
						})}
				</ul>
			</div>
			<div className="w-screen h-screen bg-black z-50 absolute top-0 left-0 backdrop-filter backdrop-blur-lg opacity-40" />
		</div>
	);
}

export default function DevTools() {
	const [openMenu, setOpenMenu] = useState(false);

	useEffect(() => {
		const handleKey = (event: KeyboardEvent) => {
			if (event.ctrlKey && event.key.toLowerCase() === "p") {
				event.preventDefault();
				setOpenMenu(!openMenu);
			}
		};

		document.addEventListener("keydown", handleKey);
		return () => {
			document.removeEventListener("keydown", handleKey);
		};
	}, [openMenu]);

	const handleClosedMenu = () => {
		setOpenMenu(false);
	};

	return <>{openMenu && <Menu HandleClose={handleClosedMenu} />}</>;
}
