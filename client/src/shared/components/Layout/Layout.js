import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AdminLayout } from "../../../admin/components/AdminLayout/AdminLayout";
import { StudentLayout } from "../../../student/components/StudentLayout/StudentLayout";
import { authActions } from "../../store/auth-slice";
import { uiActions } from "../../store/ui-slice";

function Layout(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isInAdminMode } = useSelector((state) => state.ui);

  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    // dispatch(authActions.autoLoginHandler());
    dispatch(uiActions.runAdminMode({ type: "REFRESH_ADMIN_PAGE" }));
    // isInAdminMode && history.replace("/E-boxVLU/admin/dashboard");
  }, [dispatch, isLoggedIn, history, isInAdminMode]);

  return (
    <>
      {isInAdminMode ? (
        <AdminLayout>{props.children}</AdminLayout>
      ) : (
        <StudentLayout>{props.children}</StudentLayout>
      )}
    </>
  );
}

export default Layout;
