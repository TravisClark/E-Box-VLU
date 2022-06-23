import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Ebox from "./pages/Ebox";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/E-boxVLU" />
        </Route>
        <Route path="/E-boxVLU" exact>
          <Ebox />
        </Route>
        <Route path="/E-boxVLU/login">
          <Login />
        </Route>
        <Route path="*">
          <PageNotFound/>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
