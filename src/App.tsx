import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { routes } from "./routes";
import { IRoute } from "./App.types";
import 'bootstrap/dist/css/bootstrap.min.css';
export default class App extends React.Component {

  private getComponent(route: IRoute, props: any) {
      return <route.component {...props} />;
    
  }

  render() {
    return (
      <Router>

        {/* Looping Through the Routes from routes.ts */}

        <Switch>
          {
            routes.map((route) => {
              return (
                <Route
                  exact={route.exact}
                  path={route.path}
                  render={(props: any) => {
                    return this.getComponent(route, props);
                  }}
                  key={route.path}
                />
              );
            })
          }
          <Redirect to="/" />
        </Switch>
      </Router>
    );
  }

}