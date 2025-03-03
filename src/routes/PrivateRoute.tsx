import { Component } from "react";
import { connect } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { RootState } from "@/store/index";

interface PrivateRouteProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  requiredRole?: string;
  userRole?: string;
}

class PrivateRoute extends Component<PrivateRouteProps> {
  render() {
    const { isAuthenticated, isLoading, requiredRole, userRole } = this.props;

    // If auth is still loading, show nothing (or could add a loading spinner)
    if (isLoading) {
      return null;
    }

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    // If role is required but user doesn't have it
    if (requiredRole && userRole !== requiredRole) {
      return <Navigate to="/unauthorized" />;
    }

    // If authenticated and has required role (or no role required), render children
    return <Outlet />;
  }
}

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
  userRole: state.auth.user?.role,
});

export default connect(mapStateToProps)(PrivateRoute);
