import React, {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AdminFooter from "../../../admin/components/AdminFooter/AdminFooter";
import AdminNav from "../../../admin/components/AdminNav/AdminNav";
import StudentFooter from "../../../student/components/Footer/Footer";
import StudentNavbar from "../../../student/components/StudentNav/StudentNav";
import { authActions } from "../../store/auth-slice";

function Layout(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const {isInAdminMode} = useSelector((state) => state.ui)

  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(authActions.autoLoginHandler());
    // !isLoggedIn && history.push("/");
  }, [dispatch, isLoggedIn, history]);

  return (
    <>
      {!isInAdminMode ? <StudentNavbar /> : <AdminNav/>}
      {props.children}
      {!isInAdminMode ? <StudentFooter /> : <AdminFooter />}
    </>
  );
}

export default Layout;
