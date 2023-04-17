import React from "react";
import { Route, Routes } from "react-router-dom";
import HandleRoutes from "./navigation/routes";

function App() {
  let routes = HandleRoutes();

  return (
    <div className="App">
      <Routes>
        {routes.length > 0 &&
          routes.map((route, index) => {
            return (
              <Route
                path={route.path}
                element={route.element}
                key={index}
                exact={route.exact}
              />
            );
          })}
      </Routes>
    </div>
  );
}

export default App;
