import { applyMiddleware, createStore } from "redux";
import { Store } from "redux";
import thunk from "redux-thunk";
import { withRouter } from "react-router-dom";
import { InitialState } from "../store/initialState";
import { CalendarActions } from "../store/types";
import React from "react";
import { Provider } from "react-redux";
import { DispathType } from "../store/dispatch";
import reducer from "../store/reducer";
import { PageRoutes } from "../Routes/PageRoutes";

export const RootProvider: React.FC = () => {
  const store: Store<InitialState, CalendarActions> & {
    dispatch: DispathType;
  } = createStore(reducer, applyMiddleware(thunk));

  return (
    <Provider store={store}>
      <PageRoutes />
    </Provider>
  );
};

export default withRouter(RootProvider);
