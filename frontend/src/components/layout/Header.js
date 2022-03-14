import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Link, Route } from 'react-router-dom';
import Search from './Search';
import { logout } from '../../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { user, loading } = useSelector((state) => state.auth);

  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logout());
    alert.success('Logged out successfully.');
  };

  return (
    <>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to="/">
              <img src="/images/logo.png" alt="Shopee" />
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Route render={({ history }) => <Search history={history} />} />
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <Link to="/cart" className="mr-2">
            <span id="cart" className="ml-3">
              Cart
            </span>
            <span className="ml-0" id="cart_count">
              {cartItems.length}
            </span>
          </Link>

          {user ? (
            <div className="ml-4 dropdown d-inline">
              <Link
                to="#!"
                className="btn dropdown-toggle text-white mr-4"
                type="button"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className="rounded-circle"
                  />
                </figure>
                <span>{user && user.name}</span>
              </Link>

              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                {user && user.role === 'admin' && (
                  <Link className="dropdown-item" to="/dashboard">
                    Dashboard
                  </Link>
                )}
                <Link className="dropdown-item" to="/me">
                  Profile
                </Link>
                <Link className="dropdown-item" to="/orders/me">
                  Orders
                </Link>
                <Link
                  className="dropdown-item text-danger"
                  to="/"
                  onClick={logoutHandler}
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link to="/login" className="btn ml-3" id="login_btn">
                Login
              </Link>
            )
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
