import React, { useState } from "react";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import s from "./AddUser.module.css";
import CloseBtn from "../close_btn/CloseBtn.jsx";
import CancelBtn from "../cancel_btn/CancelBtn.jsx";
import SuccessBtn from "../success_btn/SuccessBtn.jsx";
import { connect } from "react-redux";
import { loginWithGoogleAction } from "../../store/userDuck";

function AddUser(props) {
  const [success, setSuccess] = useState(false);
  const [info, setInfo] = useState({
    show: false,
    type: "",
    msg: "",
  });

  const [input, setInput] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const checkMatch = function (e) {
    let password = document.getElementById("password");
    let confirmpassword = document.getElementById("confirmpassword");
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    if (
      e.target.value !== password.value ||
      e.target.value !== confirmpassword.value
    ) {
      return setInfo({
        show: true,
        type: "error",
        msg: "Las contraseñas no coinciden",
      });
    }
    setInfo({
      show: false,
      type: "",
      msg: "",
    });
  };

  const handleInputChange = function (e) {
    var error = "";
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandle = function (e) {
    e.preventDefault();
    const data = {
      name: input.name,
      lastname: input.lastname,
      email: input.email,
      password: input.password,
      role: "admin",
    };
    axios
      .post("http://localhost:3000/users", data)
      .then((res) => {
        if (res.status === 201) {
          setInfo({
            show: true,
            type: "success",
            msg: "Cuenta creada con exito",
          });
          setTimeout(function () {
            setInfo({ show: false, type: "", msg: "" });
          }, 1000);
        } else {
          var error = res.data.original.detail;
          error = error.replace("(email)=", "");
          error = error.replace("la llave", "el email");
          setInfo({ show: true, type: "error", msg: error });
        }
      })
      .catch((err) => {
        alert("Error del server");
      });
  };
  console.log(
    "props adduser: " + props.fetching + "action" + props.loginWithGoogleAction
  );
  function doLogin() {
    console.log(props.loginWithGoogleAction());
    props.loginWithGoogleAction();
  }
  if (props.fetching) return <h2>Cargando...</h2>;
  return (
    <form className={s.form} onSubmit={onSubmitHandle}>
      <div className={s.content}>
        <CloseBtn close={props.onClose} />
        <h3>
          {props.type === "Edit"
            ? "Modificar Cuenta/Usuario"
            : "Crear Cuenta/Usuario"}
        </h3>
        <button onClick={doLogin}>Iniciar Sesion con Google</button>

        {/* <SuccessBtn onClick={doLogin} text={"Inicia Sesion con Google"} /> */}
        <div className={s.inputs}>
          <fieldset>
            <legend>Nombre</legend>
            <input
              value={input.name}
              className={s.input}
              onChange={handleInputChange}
              type="text"
              name="name"
              required
            />
          </fieldset>
          <fieldset>
            <legend>Apellido</legend>
            <input
              value={input.lastname}
              className={s.input}
              onChange={handleInputChange}
              name="lastname"
              required
            ></input>
          </fieldset>
          <fieldset>
            <legend>Email</legend>
            <input
              value={input.email}
              className={s.input}
              onChange={handleInputChange}
              type="email"
              name="email"
              required
            />
          </fieldset>
          <fieldset>
            <legend>Password</legend>
            <input
              value={input.password}
              className={s.input}
              onChange={checkMatch}
              type="password"
              name="password"
              id="password"
              required
            ></input>
          </fieldset>
          <fieldset>
            <legend>Confirmar password</legend>
            <input
              value={input.confirmpassword}
              className={s.input}
              onChange={checkMatch}
              type="password"
              name="confirmpassword"
              id="confirmpassword"
              required
            ></input>
          </fieldset>
          {info.show && <Alert severity={info.type}>{info.msg}</Alert>}
          <SuccessBtn
            text={props.type === "Edit" ? "Modificar Cuenta" : "Crear Cuenta"}
          />
          <CancelBtn text="Cancelar" close={props.onClose} />
        </div>
      </div>
    </form>
  );
}

function mapState({ user: { fetching } }) {
  return { fetching };
}

export default connect(mapState, { loginWithGoogleAction })(AddUser);
