import logo from "../images/header-logo.svg";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";

function Header(props) {
  const { email, onSignOut } = props;

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип проекта Mesto" />

      <Routes>
        <Route
          path="/"
          element={
            <div className="header__user-block">
              <p className="header__email">{email}</p>
              <button className="header__button" onClick={onSignOut}>
                Выйти
              </button>
            </div>
          }
        />

        <Route
          path="/sign-up"
          element={
            <Link to="/sign-in" className="header__link">
              Войти
            </Link>
          }
        />

        <Route
          path="/sign-in"
          element={
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
