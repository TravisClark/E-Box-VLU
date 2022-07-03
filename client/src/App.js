import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./admin/pages/Home";
import Layout from "./shared/components/Layout/Layout";
import LoadingSpinner from "./shared/components/LoadingSpinner/LoadingSpinner";
import ChangePassword from "./student/pages/ChangePassword";

const Login = React.lazy(() => import("./student/pages/Login"));
const Ebox = React.lazy(() => import("./student/pages/Ebox"));
const PageNotFound = React.lazy(() => import("./student/pages/PageNotFound"));
const ViewQuestions = React.lazy(() => import("./student/pages/ViewQuestions"));

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { account } = useSelector((state) => state.auth);
  console.count();

  // const { role_name } = useSelector((state) => state.auth.account);
  // console.log(role_name);
  // console.count();
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
              {account.role_name === "Quản Trị Viên" && (
                <>
                  <Route path="/E-boxVLU/Admin/Home">
                    <Home />
                  </Route>
                </>
              )}
            </>
          )}
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
