import { Redirect, Route, Switch } from "react-router-dom";
import { MainPage } from "../Pages/MainPage";
import PATHS from "./Navigation";

export const PageRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path={PATHS.HOME} render={() => <MainPage />} />
      <Redirect from="" to={PATHS.HOME} />
    </Switch>
  );
};
