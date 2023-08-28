import { Dispatch } from "react";
import { NavigateFunction } from "react-router-dom";
import { AnyAction } from "@reduxjs/toolkit";
import { CancelTokenSource } from "axios";

import { BaseApi } from "./base";
import { appSlice } from "../store";
import { UserRoutes } from "../router";

class UserApi extends BaseApi {
  public GetCurrentUser = (
    dispatch: Dispatch<AnyAction>,
    navigate: NavigateFunction,
    cancelToken?: CancelTokenSource,
  ) => {
    const handleSuccess = (data: Payload<LoginPayload>) => {
      dispatch(appSlice.actions.login(data.data));
      navigate("/");
    };

    const handleError = () => {
      dispatch(appSlice.actions.logout());
      navigate("/auth/signin");
    };

    this.Get<LoginPayload>(
      `${UserRoutes.BASE}/${UserRoutes.GET_CURRENT_USER.ROUTE}`,
      handleSuccess,
      handleError,
      cancelToken,
    );
  };
}

export const userApi = new UserApi();
