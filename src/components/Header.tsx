import { NavLink } from "react-router";
import { ToogleTheme } from "./ToggleTheme";
import Streak from "./Streak";

export default function Header() {
	return (
		<header
			className="
        absolute top-4 flex items-center max-w-[95vw] w-full justify-between left-1/2
        -translate-x-1/2
        "
		>
			<Streak />
			<div className="flex items-center gap-4">
				<NavLink to="/config" title="Settings" className="">
					<svg
						width="24"
						height="24"
						fill="none"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						role="img"
						aria-label="config"
					>
						<path stroke="none" d="M0 0h24v24H0z" />
						<path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37 1 .608 2.296.07 2.572-1.065z" />
						<path d="M9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0" />
					</svg>
				</NavLink>
				<ToogleTheme />
			</div>
		</header>
	);
}
