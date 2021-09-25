import React from "react";
import "./Component/crearSala.css";
import "bootstrap/dist/css/bootstrap.min.css";

import crearEvento from './Component/crearSala';
import crearPelicula from './Component/crearPelicula';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import crearSala from "./Component/crearSala";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={crearSala} />
        <Route exact path="/pelicula" component={crearPelicula} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
