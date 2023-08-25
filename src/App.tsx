import React from "react";
import { RouterProvider } from "react-router-dom";

import { Router } from "./router";

const App: React.FC = () => {
	return <RouterProvider router={Router} fallbackElement={<p>Loading...</p>} />;
};

export default App;
