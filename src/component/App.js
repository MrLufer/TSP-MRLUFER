import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./Home.jsx";
const App = (props) => (
  <BrowserRouter>
    <div id="margen">
      <Route exact path="/" component={Home} />
    </div>
  </BrowserRouter>
);

export default App;
