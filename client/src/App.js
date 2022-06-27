import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LoadingSpinner from "./shared/components/LoadingSpinner/LoadingSpinner";
import Layout from "./student/components/Layout/Layout";
import ChangePassword from "./student/pages/ChangePassword";
// import Ebox from "./Student/pages/Ebox";
// import Login from "./Student/pages/Login";
// import PageNotFound from "./Student/pages/PageNotFound";
// import ViewQuestions from "./Student/pages/ViewQuestions";

const Login = React.lazy(() => import("./student/pages/Login"));
const Ebox = React.lazy(() => import("./student/pages/Ebox"));
const PageNotFound = React.lazy(() => import("./student/pages/PageNotFound"));
const ViewQuestions = React.lazy(() => import("./student/pages/ViewQuestions"));

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered min-h-screen">
            <LoadingSpinner />
          </div>
        }
      >
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
            <ViewQuestions />
          </Route>
          <Route path="/E-boxVLU/change-password">
            <ChangePassword />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
