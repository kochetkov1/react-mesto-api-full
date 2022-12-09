import React from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const { onRegister } = props;

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleChange(evt) {
    const input = evt.target;
    if (input.name === "email") {
      setEmail(input.value);
    }
    if (input.name === "password") {
      setPassword(input.value);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(email, password);
  }

  return (
    <div className="register__container">
      <h2 className="popup__title register__title">Регистрация</h2>
      <form
        className="popup__form register__form"
        name="register__form"
        noValidate
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          className="popup__input register__input"
          id="register-email"
          name="email"
          placeholder="Email"
          required
          minLength="2"
          maxLength="40"
          value={email}
          onChange={handleChange}
        />
        <input
          type="password"
          className="popup__input register__input"
          id="register-password"
          name="password"
          placeholder="Пароль"
          required
          minLength="2"
          maxLength="200"
          value={password}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="popup__save-button register__submit-button"
        >
          Зарегистрироваться
        </button>
      </form>
      <div className="register__signin-container">
        <p className="register__text">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="register__signin">
          Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;
