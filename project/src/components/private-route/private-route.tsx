import { Route, Redirect, RouteProps } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { State } from '../../types/state';
import { AppRoute, AuthorizationStatus } from '../../const';
import { getAuthorizationStatus } from '../../store/user-reducer/selectors';

type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element;
  authorizationStatus: AuthorizationStatus;
}

const mapStateToProps = (state: State) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & PrivateRouteProps;

function PrivateRoute(props: ConnectedComponentProps): JSX.Element {
  const { exact, path, render, authorizationStatus } = props;

  return (
    <Route
      exact={exact}
      path={path}
      render={() => (
        authorizationStatus === AuthorizationStatus.Auth
          ? render()
          : <Redirect to={AppRoute.Login} />
      )}
    />
  );
}

export default connector(PrivateRoute);
