import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import s from "./RegisterPage.module.css";
import { userActions } from "../../actions/user";
import { alertActions } from "../../actions/alert";
//Material-ui
import CancelPresentationRoundedIcon from "@material-ui/icons/CancelPresentationRounded";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import InputIcon from "@material-ui/icons/Input";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import PersonIcon from "@material-ui/icons/Person";
import Alert from "@material-ui/lab/Alert";
import Container from "@material-ui/core/Container";
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0.7),
  },
}));

function RegisterPage(props) {
  const [user, setUser] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [info, setInfo] = useState({
    show: false,
    type: "",
    msg: "",
  });

  const classes = useStyles();
  const [submitted, setSubmitted] = useState(false);
  const registering = useSelector((state) => state.registration.registering);
  const message = useSelector((state) => state.alert.message);
  const dispatch = useDispatch();
 
  

  const checkMatch = function (e) {
    const password = document.getElementById("password");
    const confirmpassword = document.getElementById("confirmpassword");
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

  // reset login status
  // useEffect(() => {
  //   dispatch(userActions.logout());
  // }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    dispatch(userActions.register(user));
    // if (message === "Registration successful") {
    // setTimeout(function () {
    //     setInfo({
    //       show: true,
    //       type: "success",
    //       msg: "Cuenta creada con exito",
    //     });
    // }, 3000);
    //   setTimeout(function () {
    //     setInfo({ show: false, type: "", msg: "" });
    //   }, 1000);
    // } else {
    //   setTimeout(function () {
    //     setInfo({
    //       show: true,
    //       type: "error",
    //       msg: "Verifique los datos ingresados",
    //     });
    //   }, 100);
    //   setTimeout(function () {
    //     setInfo({ show: false, type: "", msg: "" });
    //   }, 1300);
    // }
  }
  useEffect(() => {
    dispatch(alertActions.clear());
  }, []);
  return (
    <Container component="main" maxWidth="xs">
      <div className={s.contenedor}>
        <Typography
          component="div"
          style={{
            padding: "30px",
            height: "70vh",
            backgroundColor: "rgb(245 245 245)",
          }}
        >
          <h2 className={s.title}>Register</h2>
          <form name="form" onSubmit={handleSubmit}>
            <div className={s.inputcontenedor}>
              <i className={s.icon}>{<PersonIcon />}</i>
              <input
                type="text"
                placeholder="First Name"
                name="name"
                value={user.name}
                onChange={handleChange}
              />
              {submitted && !user.name && (
                <div className={s.subtitle}>First Name is required</div>
              )}
            </div>
            <div className={s.inputcontenedor}>
              <i className={s.icon}>{<PermIdentityIcon />}</i>
              <input
                type="text"
                placeholder="Last Name"
                name="lastname"
                value={user.lastname}
                onChange={handleChange}
              />
              {submitted && !user.lastname && (
                <div className={s.subtitle}>Last Name is required</div>
              )}
            </div>
            <div className={s.inputcontenedor}>
              <i className={s.icon}>{<MailOutlineIcon />}</i>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
              {submitted && !user.email && (
                <div className={s.subtitle}>Email is required</div>
              )}
            </div>
            <div className={s.inputcontenedor}>
              <i className={s.icon}>{<VpnKeyIcon />}</i>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={user.password}
                id="password"
                onChange={handleChange}
              />
                
              {submitted && !user.password && (
                <div className={s.subtitle}>Password is required</div>
              )}
            </div>
            <div className={s.inputcontenedor}>
              <i className={s.icon}>
                <LockOpenIcon />
              </i>
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmpassword"
                id= "confirmpassword"
                onChange={checkMatch}    
              />
            </div>
            {info.show && <Alert severity={info.type}>{info.msg}</Alert>}
            {message &&
              message === "Registration successful" &&
              setTimeout(function () {
                setInfo({
                  show: true,
                  type: "success",
                  msg: "Cuenta creada con exito",
                  
                });
              },100) && <Alert severity={info.type}>{info.msg}</Alert> && (
                <></>
              )}
            {message &&
              message === "Error: Request failed with status code 400" &&
              setTimeout(function () {
                setInfo({
                  show: true,
                  type: "error",
                  msg: "Intente registrarse con un email valido",
                });
              }, 100) && <Alert severity={info.type}>{info.msg}</Alert> && (
                <></>
              )}
            <div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<InputIcon />}
              >
                {registering && <span></span>}
                Register
              </Button>
              <Link to="/loginpage">
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  endIcon={<CancelPresentationRoundedIcon />}
                >
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </Typography>
      </div>
    </Container>
  );
}

export { RegisterPage };
