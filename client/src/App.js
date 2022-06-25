import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Layout from "./Student/components/Layout/Layout";
import Ebox from "./Student/pages/Ebox";
import Login from "./Student/pages/Login";
import PageNotFound from "./Student/pages/PageNotFound";
import ViewQuestions from "./Student/pages/ViewQuestions";


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
        <Route path="/E-boxVLU/Home">
          <ViewQuestions/>
        </Route>
        <Route path="*">
          <PageNotFound/>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
