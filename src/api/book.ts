import { Dispatch } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import { CancelTokenSource } from "axios";

import { BaseApi } from "./base";
import { appSlice } from "../store";
import { AuthRoutes } from "../router";
import { bookSlice } from "../store/slices/book";
import { NotifyError } from "../util";
import { BookRoutes } from "../router/routes/book";

class BookApi extends BaseApi {
  public GetBook = (
    id: number,
    dispatch: Dispatch<AnyAction>,
    cancelToken?: CancelTokenSource,
  ) => {
    const handleSuccess = (data: Payload<Book>) => {
      dispatch(bookSlice.actions.addNewBook(data.data));
    };
    const handlError = () => {
      NotifyError("Failed to get book.");
    };
    this.Get<Book>(
      `${BookRoutes.BASE}/${id}`,
      handleSuccess,
      handlError,
      cancelToken,
    );
  };

  public ListBooks = (
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

export const bookApi = new BookApi();
