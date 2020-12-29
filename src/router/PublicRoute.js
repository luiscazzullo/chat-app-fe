import { Redirect, Route } from 'react-router-dom';
const PublicRoute = ({ isAuth, component: Component, ...rest }) => {
  return (
    <Route 
      {...rest} 
      component={ props => (
        (!isAuth) 
        ? <Component {...props} />
        : <Redirect to="/" />
      )}
    />
  );
}
 
export default PublicRoute;