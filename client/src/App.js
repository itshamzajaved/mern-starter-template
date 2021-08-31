import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Routes from './Routes/index';

function App() {
  return (
    <Router>
      <Switch>
          {Routes.map((data, index) => {
            if (data.path.replace("/","") === window.location.pathname.replace("/","")) {
              document.title = data.title;
            }
            return (
              <Route key={index} path={data.path}>{data.component}</Route>
            )
          })}
      </Switch>
    </Router>
  );
}

export default App;
