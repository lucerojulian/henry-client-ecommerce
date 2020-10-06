import React, { useState, useEffect } from "react";
import axios from "axios";
import ViewReset from "../view_reset/ViewReset";

import s from "./ProfileCard.module.css";
//Material-ui
import RotateLeftOutlinedIcon from "@material-ui/icons/RotateLeftOutlined";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import { Typography, Container, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0.7),
  },
}));
export default function Profile({ id, onClose }) {
  const usuario = JSON.parse(localStorage.getItem("user"));
  const classes = useStyles();

  const [user, setUser] = useState();
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState({});
  const [reset, setReset] = useState(0);
  const [renderReset, setRenderReset] = useState(false);

  useEffect(() => {
    // if (usuario) {
    axios

      .get(`http://localhost:3000/me`, { withCredentials: true })

      .then((res) => {
        console.log(res);
        setUser(res.data);
        setInput(res.data);
      });
    // }
  }, []);

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const onSave = function () {
    const data = {
      email: input.email,
      name: input.name,
    };
    axios.put(`http://localhost:3000/users/${user.id}`, data).then((res) => {
      alert("Actualizado correctamente");
    });
  };

  const onViewReset = function (id) {
    setReset(id);
    setRenderReset(true);
  };
  return (
    <Container component="main" maxWidth="xs">
      <div className={s.container}>
        <Typography
          component="div"
          style={{
            padding: "30px",
            height: "70vh",
            backgroundColor: "rgb(245 245 245)",
          }}
        >
          <div className={s.form}>
            {renderReset && <ViewReset id={reset} onClose={setRenderReset} />}
            <h3 className={s.title}>Bienvenido {user && user.name}</h3>
            <div>
              <p>
                <i className={s.icon}>{<MailOutlineIcon />}</i>

                {edit ? (
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={handleInputChange}
                    value={input.email}
                    disabled={!edit}
                  />
                ) : (
                  user && user.email
                )}
              </p>
              <p>
                <i className={s.icon}>{<PersonIcon />}</i>

                {edit ? (
                  <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    onChange={handleInputChange}
                    value={input.name}
                    disabled={!edit}
                  />
                ) : (
                  user && user.name
                )}
              </p>
              <p>
                <i className={s.icon}>{<PermIdentityIcon />}</i>
                {edit ? (
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Apellido"
                    onChange={handleInputChange}
                    value={input.lastname}
                    disabled={!edit}
                  />
                ) : (
                  user && user.lastname
                )}
              </p>
            </div>
            <div>
              <div>
                <p>Editar</p>

                <label className={s.switch}>
                  <input type="checkbox" onChange={() => setEdit(!edit)} />
                  <span className={[s.slider, s.round].join(" ")}></span>
                </label>
              </div>
              <Box className={s.box}>
                <div className={s.button1}>
                  <Button
                    onClick={onSave}
                    disabled={!edit}
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<SaveOutlinedIcon />}
                  >
                    Guardar Cambios
                  </Button>
                </div>
                <div className={s.button2}>
                  <Button
                    id={user && user.id}
                    onClick={() => onViewReset(user.id)}
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    endIcon={<RotateLeftOutlinedIcon />}
                  >
                    Reset Password
                  </Button>
                </div>
              </Box>
              <div></div>
            </div>
          </div>
        </Typography>
      </div>
    </Container>
  );
}
