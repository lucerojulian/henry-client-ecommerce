import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// Material-UI
import {
  FormControl,
  InputLabel,
  FormHelperText,
  Box,
} from "@material-ui/core";
import Input from "@material-ui/core/Input";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import PersonIcon from "@material-ui/icons/Person";

//Actions
import { userActions } from "../../actions/user";
import { alertActions } from "../../actions/alert";
import { emptyCart } from "../../actions/cart";
//class
import s from "./ResetPw.module.css";
import icon from "../../img/Google__G__Logo.svg";
import style from "./LoginPage.module.css";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  reset: {
    spacing: 8,
  },
}));
function ResetPw(props) {
  const [input, setInput] = useState({
    password: "",
  });
  const resetpassword = function (e) {
    const data = {
      email: props.info,
      password: input.password,
      adminReset: true,
    };
    e.preventDefault();

    axios
      .put("http://localhost:3000/reset/passwordupdate", data)
      .then((res) => {
        alert("Contraseña actualizada Correctamente");
        props.onClose(false);
      });
  };
  const handleInputChange = function (e) {
    setInput({
      password: e.target.value,
    });
  };
  const classes = useStyles();
  return (
    <form className={s.resetPw} onSubmit={resetpassword}>
      <div className={s.content}>
        <h3 className={s.title}>Resetear contraseña</h3>
        <input
          id="resetpassword"
          type="password"
          value={input.password}
          placeholder="Nueva Contraseña"
          onChange={handleInputChange}
          required
        />
        <input
          id="confirmresetpassword"
          type="password"
          placeholder="Confirme la nueva contraseña"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={<SendIcon />}
        >
          Send
        </Button>
      </div>
    </form>
  );
}

function LoginPage(props) {
  const classes = useStyles();
  // Traigo el usuario del Local Storage
  const user = useSelector((state) => state.authentication.user);

  useEffect(() => {
    //Si venis de estar logueado borra lo que este en el carrito
    if (user) {
      //Borramos lo que este en el carrito de localst y redux
      localStorage.setItem("Cart", JSON.stringify([]));
      dispatch(emptyCart());
    }
    dispatch(userActions.logout());
  }, []);

  useEffect(() => {
    dispatch(alertActions.clear());
  }, []);

  const [success, setSuccess] = useState(false);
  const [clear, setClear] = useState(false);
  const [failure, setFailure] = useState(false);
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const { email, password } = inputs;
  const [renderReset, setRenderReset] = useState(false);

  //Selectores de estados en redux
  const loggingIn = useSelector((state) => state.authentication.loggingIn);
  const loggedIn = useSelector((state) => state.authentication.loggedIn);
  const alert = useSelector((state) => state.alert.message);

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  // reset login status

  // const preventDefault = (event) => event.preventDefault();
  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      axios.post("http://localhost:3000/reset/user", { email }).then((res) => {
        if (res.data) {
          //renderizar componente resetear
          setRenderReset(true);
          return console.log("tengo que resetear");
        }
        dispatch(userActions.login(email, password));
        dispatch(alertActions.clear());

        return console.log("safe fiuf");
      });
    }
    setSuccess(true);
  };

  return (
    <Container component="main" maxWidth="xs">
      {renderReset && <ResetPw info={email} onClose={setRenderReset} />}
      <div>
        <Typography
          component="div"
          style={{
            padding: "35px",
            height: "50vh",
            backgroundColor: "rgb(245 245 245)",
          }}
        >
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form name="form" onSubmit={handleSubmit}>
            <Grid>
              <Grid md={12}>
                <FormControl margin="dense" variant="filled">
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    aria-describedby="email-helper"
                    // aria-label=true
                    value={email}
                    onChange={handleChange}
                    required="true"
                  ></Input>
                  <FormHelperText id="email-helper">
                    Ingresa tu email
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid md={12}>
                <FormControl margin="dense" variant="filled">
                  <InputLabel htmlFor="pwd">Password</InputLabel>
                  <Input
                    id="pwd"
                    type="password"
                    name="password"
                    aria-describedby="password-helper"
                    value={password}
                    onChange={handleChange}
                    required="true"
                  ></Input>
                  <FormHelperText id="password-helper">
                    Ingresa tu contraseña
                  </FormHelperText>
                </FormControl>
              </Grid>
              {loggedIn &&
                setTimeout(function () {
                  setFailure(false);
                }, 1) &&
                success &&
                setTimeout(function () {
                  setSuccess(false);
                  props.history.push("/home");
                }, 1500) && (
                  <Alert severity="success">
                    Hola {user && user.name}!<p>Se ha logueado Correctamente</p>
                  </Alert>
                )}
              {alert &&
                setTimeout(function () {
                  setFailure(true);
                }, 5) && <></> && (
                  <Alert severity="error">
                    <p>Ingrese los datos correctamente</p>
                  </Alert>
                )}
              <Grid md={12}>
                <Button type="submit" variant="contained" color="primary">
                  {loggingIn && <CircularProgress size="40" disableShrink />}
                  LOGIN
                </Button>
                <Button variant="outlined" color="primary">
                  <Link to="/register">Register</Link>
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Box m={1}>
                      {/* <Link className={classes.reset} to="/me" variant="body2">
                        Olvido su contraseña?
                      </Link> */}
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
          <a className={style.google} href="http://localhost:3000/auth/google">
            {/* <svg className={style.icon}>{icon}</svg> */}
            <img className={style.icon} src={icon} />
            Inicia Sesion con Google
          </a>
        </Typography>
      </div>
    </Container>
  );
}

export { LoginPage };
