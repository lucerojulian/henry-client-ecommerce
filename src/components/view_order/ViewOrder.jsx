import React, { useState, useEffect } from "react";
import s from "./ViewOrder.module.css";
import CloseBtn from "../close_btn/CloseBtn.jsx";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

//Helpers
import replaceChars from "../../helpers/replaceChars";
import { editOrder, fetchOrders } from "../../actions/orders";
import { emptyCart } from "../../actions/cart";

export default function EditOrder({ onClose }) {
  const { order } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState({
    state: "",
    address: "",
  });

  useEffect(() => {
    if (order) {
      setInput({ state: order.state, address: order.address });
    }
    setInput({
      state: order && order.state,
      address: order && order.address,
    });
  }, [order]);

  const sumTotal = function () {
    let total = 0;
    if (order.products) {
      order.products.forEach((product) => {
        total += product.productsorder.quantity * parseFloat(product.price);
      });
    }
    return "$ " + total;
  };

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const onSave = function () {
    const data = {
      state: input.state === "" ? order.state : input.state,
      address: input.address,
    };
    dispatch(editOrder(data, order.id));
    dispatch(fetchOrders());
  };

  const onClean = function () {
    dispatch(emptyCart(order.user.id));
    alert("Se eliminaron los productos de la orden");
  };

  if (!order) {
    return (
      <div className={s.viewOrder}>
        <div className={s.content}>
          <CloseBtn close={onClose} />
          <h3>Cargando datos...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className={s.viewOrder}>
      <div className={s.content}>
        <CloseBtn close={onClose} />
        <h3>Panel de ordenes</h3>
        <div className={[s.info, s.topShadow].join(" ")}>
          <p>
            <span>Email: </span>
            {order.user && order.user.email}
          </p>
          <p>
            <span>Rol: </span>
            {order.user && order.user.role}
          </p>
        </div>
        <div className={[s.info, s.botShadow].join(" ")}>
          <p>
            <span>ID: </span>
            {order && order.id}
          </p>
          <p>
            <span>Estado: </span>
            {edit === true ? (
              <select
                required
                onChange={handleInputChange}
                name="state"
                id="state"
              >
                <option value="">Seleccione el nuevo estado</option>
                <option value="cart">Carrito</option>
                <option value="create">Creada</option>
                <option value="process">Procesando</option>
                <option value="canceled">Cancelada</option>
                <option value="completed">Completada</option>
              </select>
            ) : (
              order.state
            )}
          </p>
          <p>
            <span>Direccion: </span>
            {edit === true ? (
              <input
                onChange={handleInputChange}
                name="address"
                value={input.address}
                type="text"
              />
            ) : (
              order.address
            )}
          </p>
        </div>
        <table className={s.itemsTable}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Precio Unit.</th>
            </tr>
          </thead>
          <tbody>
            {order.products &&
              order.products.map(function (product) {
                return (
                  <tr>
                    <td>{replaceChars(product.name)}</td>
                    <td>{product.productsorder.quantity}</td>
                    <td>{product.price}</td>
                  </tr>
                );
              })}
            <tr className={s.total}>
              <td></td>
              <td>Total:</td>
              <td>{sumTotal()}</td>
            </tr>
          </tbody>
        </table>
        <div className={s.actions}>
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
            {order.state === "cart" && order.products.length > 0 && (
              <button onClick={onClean} className={[s.btn].join(" ")}>
                Vaciar orden
              </button>
            )}
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
