import React from "react";
import {
	createBrowserRouter,
	Route,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Home from "./components/pages/Home";
import RootLayout from "./components/pages/RootLayout";
import Search from "./components/Search/Search";
import Error from "./components/Error/Error";
import ProteinItem from "./components/ProteinItem/ProteinItem";
import Publications from "./components/ProteinItem/publications/Publications";
import ProteinViewer from "./components/ProteinItem/protvista/proteinViewer";
import "./App.css";
import PrivateRoute from "./components/pages/PrivateRoute";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<RootLayout />}>
			<Route path="/" element={<Home />} />
			<Route path="/signup" element={<SignUp />} />
			<Route path="/signin" element={<SignIn />} />
			<Route path="*" element={<Error />} />
			<Route element={<PrivateRoute />}>
				<Route path="search" element={<Search />} />
				<Route path="protein/:id" element={<ProteinItem />}>
					<Route path="publications" element={<Publications />} />
					<Route path="feature" element={<ProteinViewer />} />
				</Route>
			</Route>
		</Route>
	)
);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
