import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";

function Login() {
  const history = useHistory("");
  const [email, setEmail] = useState("test@email.com");
  const [password, setPassword] = useState("secret1");

  // Buscar los intentos del email en la colleccion "user_auth_fails"
  const getUserFails = async() => {
    const db = firestore.database();  // const db = database.database();
    const res = await db.collection("user_auth_fails").doc(email)
        .get()
    if(res){
      return res.data();
    }
    return null;
  }

  // Actualizar los intentos del email en la colleccion "user_auth_fails"
  const setUserFails = async(email,failsNumber) => {
    await db.collection("user_auth_fails").doc(email)
        .set({
          fails: failsNumber,
        })
  }
  
  const login = async(event) => {
    event.preventDefault();
    // Obtener numero intentos anteriores
    if(email.length > 0){
      alert('Ingrese un correo electrónico')
    }else{

      let userFails = await getUserFails();
      if(userFails == undefined || userFails.fails < 3){
        auth
          .signInWithEmailAndPassword(email, password)
          .then((auth) => {
            history.push("/");
          })
          .catch((e) => {
            // Aumentar el contador del correo electronico del campo fails
            setUserFails(email,userFails == undefined ? 1 : userFails.fails + 1);
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
        }else{
          alert("Cuenta inhabilitada.");
        }
      }
    }

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
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </center>
          <center>
            <input
              type="password"
              placeholder="contraseña"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
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
