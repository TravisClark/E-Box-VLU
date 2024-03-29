import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import AddUser from "./admin/pages/AddUser";
import { Chat } from "./admin/pages/Chat";
import Dashboard from "./admin/pages/Dashboard";
import QuestionManagement from "./admin/pages/QuestionManagement";
import Users from "./admin/pages/Users";
import Layout from "./shared/components/Layout/Layout";
import LoadingSpinner from "./shared/components/LoadingSpinner/LoadingSpinner";
// import { QuestionDetail } from ";
import ChangePassword from "./student/pages/ChangePassword";
import { QuestionDetail } from "./student/pages/QuestionDetail";
import jwt_decode from "jwt-decode";

const Login = React.lazy(() => import("./student/pages/Login"));
const Ebox = React.lazy(() => import("./student/pages/Ebox"));
const PageNotFound = React.lazy(() => import("./student/pages/PageNotFound"));
const ViewQuestions = React.lazy(() => import("./student/pages/ViewQuestions"));

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { account } = useSelector((state) => state.auth);
  // let decoded = jwt_decode(account.token);
  // console.log(decoded)
  console.count();

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
              <Route path="/E-boxVLU/Home/question/:questionId">
                <QuestionDetail />
              </Route>
              <Route path="/E-boxVLU/change-password" exact>
                <ChangePassword />
              </Route>

              {(account.role_name === "Quản Trị Viên" ||
                account.role_name === "Ban Chủ Nhiệm Khoa" ||
                account.role_name === "Trợ lý") && (
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
