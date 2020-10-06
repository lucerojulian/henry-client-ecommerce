import React, { useEffect, useState } from "react";
import s from "./UsersPanel.module.css";
import axios from "axios";
import ViewUser from "../../components/view_user/ViewUser.jsx";
import ViewReset from "../../components/view_reset/ViewReset.jsx";
//Material-ui
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function UsersPanel() {
  const [users, setUsers] = useState();
  const [renderViewUser, setRenderViewUser] = useState(false);
  const [viewId, setViewId] = useState(0);
  const [reset, setReset] = useState(0);
  const [renderReset, setRenderReset] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    getUsers("mounted");
  }, [users]);

  useEffect(() => {
    getUsers("update");
  }, [renderViewUser]);

  const getUsers = function (type) {
    if (type === "mounted") {
      axios.get("http://localhost:3000/users").then((res) => {
        if (!users) {
          setUsers(res.data);
        }
      });
    }
    if (type === "update") {
      axios.get("http://localhost:3000/users").then((res) => {
        setUsers(res.data);
      });
    }
  };

  const onViewUser = function (id) {
    setViewId(id);
    setRenderViewUser(true);
  };

  const onViewReset = function (id) {
    setReset(id);
    setRenderReset(true);
  };

  if (!users) {
    return <div className={s.container}></div>;
  }

  return (
    <div className={s.container}>
      {renderViewUser && <ViewUser id={viewId} onClose={setRenderViewUser} />}
      {renderReset && <ViewReset id={reset} onClose={setRenderReset} />}
      <table className={s.usersTable}>
        <caption>Administración de usuarios</caption>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
            <th>Resetear Password</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 &&
            users.map(function (user) {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <Button
                      id={user.id}
                      onClick={() => onViewUser(user.id)}
                      color="primary"
                    >
                      Ver Usuario
                    </Button>
                  </td>
                  <td>
                    <Button
                      size="small"
                      color="secondary"
                      className={classes.margin}
                      id={user.id}
                      onClick={() => onViewReset(user.id)}
                    >
                      Reset
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

// 1) El boton resetear agrega al usuario a una tabla nueva => reset por ejemplo,
// ---> post axios
// 2) Antes de que se logee, tenga que chekear si ese usuario esta en esa tabla de la base de datos que mande
// FindOne para ver si esta en esa tabla con un if
//
// un mensaje al front y que le redirija al usuario al login para que ponga una nueva password.
// el put se hace cuando quiera updetear la password
