import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import PollPage from "./pages/PollPage";
import ResultsPage from "./pages/ResultsPage";


export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route
					path="/:id"
					element={<PollPage />}
				/>
				<Route
					path="/:id/results"
					element={<ResultsPage />}
				/>
			</Routes>
		</Router>
		);
	}