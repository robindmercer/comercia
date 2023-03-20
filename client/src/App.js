// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> Robin Mercer.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

//export default App;

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
