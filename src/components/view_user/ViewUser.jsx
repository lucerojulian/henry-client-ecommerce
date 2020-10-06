import React, { useState, useEffect } from "react";
import axios from "axios";
import CloseBtn from "../close_btn/CloseBtn.jsx";
import s from "./ViewUser.module.css";

export default function ViewUser({ id, onClose }) {
  const [user, setUser] = useState();
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState({});

  useEffect(() => {
    if (!user) {
      axios.get(`http://localhost:3000/users/${id}`).then((res) => {
        setUser(res.data);
        setInput(res.data);
      });
    }
  }, [user]);

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
      lastname: input.lastname,
      role: input.role,
    };
    axios.put(`http://localhost:3000/users/${id}`, data).then((res) => {
      alert("Actualizado correctamente");
    });
  };

  const onDelete = function () {
    axios.delete(`http://localhost:3000/users/${id}`).then((res) => {
      alert("Eliminado correctamente");
    });
  };

  if (!user) {
    return (
      <div className={s.ViewUser}>
        <div className={s.content}>
          <CloseBtn close={onClose} />
          <h3>Administrar usuario</h3>
          <h4>Cargando usuario...</h4>
        </div>
      </div>
    );
  }

  return (
    <div className={s.ViewUser}>
      <div className={s.content}>
        <CloseBtn close={onClose} />
        <h3>Administrar usuario</h3>
        <div className={s.info}>
          <p>
            <span>ID: </span>
            {user.id}
          </p>
          <p>
            <span>Email: </span>
            {edit ? (
              <input
                type="text"
                name="email"
                onChange={handleInputChange}
                value={input.email}
                disabled={!edit}
              />
            ) : (
              user.email
            )}
          </p>
          <p>
            <span>Nombre: </span>
            {edit ? (
              <input
                type="text"
                name="name"
                onChange={handleInputChange}
                value={input.name}
                disabled={!edit}
              />
            ) : (
              user.name
            )}
          </p>
          <p>
            <span>Apellido: </span>
            {edit ? (
              <input
                type="text"
                name="lastname"
                onChange={handleInputChange}
                value={input.lastname}
                disabled={!edit}
              />
            ) : (
              user.lastname
            )}
          </p>
          <p>
            <span>Rol: </span>
            {edit ? (
              <select
                name="role"
                id="role"
                onChange={handleInputChange}
                disabled={!edit}
              >
                <option value="">Seleccione el nuevo rol</option>
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
            ) : (
              user.role
            )}
          </p>
          <p>
            <span>Creado el: </span>
            {user.createdAt.replace("T", " / ")}
          </p>
          <p>
            <span>Actualizado el: </span>
            {user.updatedAt.replace("T", " / ")}
          </p>
        </div>
        <div className={s.acciones}>
          <div className={s.editar}>
            <p>Editar</p>
            <label className={s.switch}>
              <input type="checkbox" onChange={() => setEdit(!edit)} />
              <span className={[s.slider, s.round].join(" ")}></span>
            </label>
          </div>
          <div>
            <button
              onClick={onSave}
              className={[s.btn].join(" ")}
              disabled={!edit}
            >
              Guardar Cambios
            </button>
          </div>
          <div>
            <button onClick={onDelete} className={[s.btn].join(" ")}>
              Eliminar usuario
            </button>
          </div>
          <div>
            <button
              onClick={() => onClose(false)}
              className={[s.btn].join(" ")}
            >
              Salir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
