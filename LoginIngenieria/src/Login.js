import React, { useState } from "react";
import { auth } from "./firebase";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";

function Login() {
  const history = useHistory("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");
      })
      .catch((e) => {
        if (
          e.message ===
          "La contraseña es invalida o el usuario no ingresó la contraseña correcta."
        ) {
          alert("Por favor ingresa tus datos nuevamente.");
        } else if (
          e.message ===
          "No hay un usuario asociado a esta cuenta o la cuenta ha sido eliminada."
        ) {
          alert("Por favor ingresa tus datos nuevamente.");
        } else {
          alert(e.message);
        }
        alert(
          "La contraseña es invalida o el usuario no ingresó la contraseña correcta."
        );
      });
  };

  return (
    <div className="login">
      <img src="" className="login__logo" alt="" />
      <div className="login__container">
        <h3>We&Co</h3>
        <form>
          <center>
            <input
              required
              type="email"
              placeholder="correo electronico"
              required onChange={(e) => setEmail(e.target.value)}
            />
          </center>
          <center>
            <input
              type="password"
              placeholder="contraseña"
              required onChange={(e) => setPassword(e.target.value)}
            />
          </center>
          <center>
            <button onClick={login} type="submit" className="login__login">
              iniciar sesion
            </button>
          </center>
          <center>
            <div className="sideinfo">
              <h5>¿olvidaste tu contraseña?</h5>
              <h5 className="dot"></h5>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <h5 className="rtd">registrate</h5>
              </Link>
            </div>
          </center>
        </form>
      </div>
    </div>
  );
}

export default Login;
