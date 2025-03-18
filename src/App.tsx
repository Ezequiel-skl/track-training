import { useEffect } from "react";
import Layout from "./layout/Layout";
import Home from "./page/Home";
import TrainingDays from "./page/TrainingDays";
import Config from "./page/Config";

import { Route, Routes, BrowserRouter, useNavigate } from "react-router";
import dynamicFavicon from "./utils/dynamicFavicon";

function CheckTrackDay() {
	const navigate = useNavigate();

	useEffect(() => {
		const daysStorage = localStorage.getItem("day");
		if (daysStorage) {
			navigate("/home");
		}
	}, [navigate]);

	return <TrainingDays />;
}

function App() {
	dynamicFavicon();

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/" element={<CheckTrackDay />} />
					<Route path="/home" element={<Home />} />
					<Route path="/config" element={<Config />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
