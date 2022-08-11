import React, { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";

import { Chat } from "./admin/pages/Chat";
import Dashboard from "./admin/pages/Dashboard";
import QuestionManagement from "./admin/pages/QuestionManagement";
import Users from "./admin/pages/Users";
import Layout from "./shared/components/Layout/Layout";
import { LoadingDot } from "./shared/components/LoadingDot/LoadingDot";
import { Roles } from "./shared/roles/roles";
import ChangePassword from "./student/pages/ChangePassword";
import { QuestionDetail } from "./student/pages/QuestionDetail";

const Login = React.lazy(() => import("./student/pages/Login"));
const Ebox = React.lazy(() => import("./student/pages/Ebox"));
const PageNotFound = React.lazy(() => import("./student/pages/PageNotFound"));
const ViewQuestions = React.lazy(() => import("./student/pages/ViewQuestions"));
const AddUser = React.lazy(() => import("./admin/pages/AddUser"))


function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { account } = useSelector((state) => state.auth);
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  const accessConditions =
    account?.role_name === Roles.admin ||
    account?.role_name === Roles.supervisor ||
    account?.role_name === Roles.assistant;

  return (
    
    <Layout>
      <Suspense
        fallback={
          <div className="centered min-h-screen">
            <LoadingDot className='fixed z-50'/>
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
              <Route path="/E-boxVLU/Home/question/:questionId">
                <QuestionDetail />
              </Route>
              <Route path="/E-boxVLU/change-password" exact>
                <ChangePassword />
              </Route>

              {accessConditions && (
                <>
                  <Route path="/E-boxVLU/admin/dashboard">
                    <Dashboard />
                  </Route>
                  <Route path="/E-boxVLU/admin/users" exact>
                    <Users />
                  </Route>
                  <Route path="/E-boxVLU/admin/users/add">
                    <AddUser />
                  </Route>
                  <Route path="/E-boxVLU/admin/questions">
                    <QuestionManagement />
                  </Route>
                  <Route path="/E-boxVLU/admin/chat">
                    <Chat />
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
