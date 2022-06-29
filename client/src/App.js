import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import LoadingSpinner from "./shared/components/LoadingSpinner/LoadingSpinner";
import Layout from "./student/components/Layout/Layout";
import ChangePassword from "./student/pages/ChangePassword";

const Login = React.lazy(() => import("./student/pages/Login"));
const Ebox = React.lazy(() => import("./student/pages/Ebox"));
const PageNotFound = React.lazy(() => import("./student/pages/PageNotFound"));
const ViewQuestions = React.lazy(() => import("./student/pages/ViewQuestions"));

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
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
          {isLoggedIn && (
            <>
              <Route path="/E-boxVLU/Home" exact>
                <ViewQuestions />
              </Route>
              <Route path="/E-boxVLU/change-password" exact>
                <ChangePassword />
              </Route>
              <Route path="*">
                <PageNotFound />
              </Route>
            </>
          )}
          {/* {!isLoggedIn && <Redirect to="/"/>} */}
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
