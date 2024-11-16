import React, { useContext } from "react";

import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute(props) {
  const { user } = useSelector((state) => state.Auth);

  if (user == null) {
    return <Navigate to={props.redirectTo}></Navigate>;
  } else {
    return (
      <Route exact path={props.path}>
        {props.children}
      </Route>
    );
  }
}
