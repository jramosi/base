import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './config/routes';
import AuthProvider from './providers/AuthProvider';

//sistema de rutas

import './App.scss';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
        {routes.map((route, index)=> (
          <RouterWithSubRoutes key ={index} {...route}/>
        ))}
        </Switch>
      </Router>
    </AuthProvider>
    
  );
}
//ruta padre pasa a hijos
function RouterWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => <route.component routes={route.routes} {...props}/>}
    />
  )
}

export default App;
