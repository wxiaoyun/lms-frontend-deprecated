import { Dispatch } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import { CancelTokenSource } from "axios";

import { BaseApi } from "./base";
import { appSlice } from "../store";
import { AuthRoutes } from "../router";

class AuthApi extends BaseApi {
  public Signup = (
    user: UserCreateForm,
    dispatch: Dispatch<AnyAction>,
    navigate: NavigateFunction,
    cancelToken?: CancelTokenSource,
  ) => {
    const handleSuccess = (data: Payload<LoginPayload>) => {
      dispatch(appSlice.actions.login(data.data));
      navigate("/index");
    };
    const handlError = () => {
      dispatch(appSlice.actions.logout());
    };
    this.Post<UserCreateForm, LoginPayload>(
      `${AuthRoutes.BASE}/${AuthRoutes.SIGN_UP.ROUTE}`,
      user,
      handleSuccess,
      handlError,
      cancelToken,
    );
  };

  public SignIn = (
    user: UserLogin,
    dispatch: Dispatch<AnyAction>,
    navigate: NavigateFunction,
    cancelToken?: CancelTokenSource,
  ) => {
    const handleSuccess = (data: Payload<LoginPayload>) => {
      dispatch(appSlice.actions.login(data.data));
      navigate("/");
    };
    const handlError = () => {
      dispatch(appSlice.actions.logout());
    };

    this.Post<UserLogin, LoginPayload>(
      `${AuthRoutes.BASE}/${AuthRoutes.SIGN_IN.ROUTE}`,
      user,
      handleSuccess,
      handlError,
      cancelToken,
    );
  };

  public SignOut = (
    dispatch: Dispatch<AnyAction>,
    navigate: NavigateFunction,
    cancelToken?: CancelTokenSource,
  ) => {
    const handleResult = () => {
      dispatch(appSlice.actions.logout());
      navigate("/auth/signin");
    };

    this.Get(
      `${AuthRoutes.BASE}/${AuthRoutes.SIGN_OUT.ROUTE}`,
      handleResult,
      handleResult,
      cancelToken,
    );
  };
}

export const authApi = new AuthApi();
