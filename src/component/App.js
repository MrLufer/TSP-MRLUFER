import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Tsp from "./Tsp.jsx";
const App = props => (
  <BrowserRouter>
    <div id="margen">
      <Route exact path="/" component={Tsp} />
    </div>
  </BrowserRouter>
);

export default App;
