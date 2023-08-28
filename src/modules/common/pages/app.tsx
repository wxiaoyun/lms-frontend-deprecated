import React from "react";
import { Nav, AppLogic } from "../";

export const App: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Nav />
      <AppLogic />
    </div>
  );
};

export default App;
