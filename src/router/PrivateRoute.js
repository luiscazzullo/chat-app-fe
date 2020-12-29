import { Redirect, Route } from 'react-router-dom';
const PrivateRoute = ({ isAuth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={props => (
        (isAuth)
          ? <Component {...props} />
          : <Redirect to="/auth/login" />
      )}
    />
  );
}

export default PrivateRoute;