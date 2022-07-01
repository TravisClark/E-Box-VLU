import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import AddUser from "./admin/pages/AddUser";
import Dashboard from "./admin/pages/Dashboard";
import QuestionManagement from "./admin/pages/QuestionManagement";
import Users from "./admin/pages/Users";
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
                  <Route path="/E-boxVLU/admin/dashboard">
                    <Dashboard/>
                  </Route>
                  <Route path="/E-boxVLU/admin/users" exact>
                    <Users/>
                  </Route>
                  <Route path="/E-boxVLU/admin/users/add">
                    <AddUser/>
                  </Route>
                  <Route path="/E-boxVLU/admin/questions">
                    <QuestionManagement/>
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
