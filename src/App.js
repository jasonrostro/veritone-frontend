import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductsPage from "./pages/products";
import MainLayout from "./layouts/Main";

function App() {
  return (
    <Router>
      <MainLayout>
        <Switch>
          <Route exact path="/" component={ProductsPage} />
          <Route exact path="/products" component={ProductsPage} />
        </Switch>
      </MainLayout>
    </Router>
  );
}

export default App;
