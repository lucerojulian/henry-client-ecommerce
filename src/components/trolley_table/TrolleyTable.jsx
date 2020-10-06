import React, { useEffect, useState } from "react";
import s from "./TrolleyTable.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setQuantity,
  removeFromCart,
  getCart,
  emptyCart,
  fetchCartFromDb,
  addToCart,
} from "../../actions/cart";
import Alert from "@material-ui/lab/Alert";
import { Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Checkout from "../checkout/Checkout.jsx";

//HELPERS
import replaceChars from "../../helpers/replaceChars";
import getOrCreateLocalStorage from "../../helpers/getLocalStorage";

export default function TrolleyTable() {
  const dispatch = useDispatch();
  const [renderCheck, setRenderCheck] = useState(false);
  const [total, setTotal] = useState(0);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.authentication.user);
  const products = useSelector((state) => state.cart.products);

  // useEffect(() => {
  //   if (user) {
  //     dispatch(fetchCartFromDb(user.id));
  //   } else {
  //     dispatch(getCart(getOrCreateLocalStorage()));
  //   }
  // }, []);

  useEffect(() => {
    sumTotal();

    localStorage.setItem("Cart", JSON.stringify(cart.products));
  }, [cart]);

  const quantityChange = function (e) {
    let id = Number(e.target.id);
    let qty = Number(e.target.value);
    if (user) {
      dispatch(setQuantity(id, qty, user.id));
      return;
    }
    dispatch(setQuantity(id, qty));
  };

  const deleteItem = function (id) {
    console.log(`EL ID TIENE ${id}`);
    if (user) {
      dispatch(removeFromCart(id, user.id));
      return;
    }
    dispatch(removeFromCart(id));
  };

  const sumSubTotal = function (quantity, price) {
    return quantity * price;
  };

  const emptyCarrito = () => {
    if (user) {
      dispatch(emptyCart(user.id));
      return;
    }
    dispatch(emptyCart());
  };

  const sumTotal = function () {
    let suma = 0;
    cart.products.forEach((prod) => {
      var stotal = prod.quantity * prod.price;
      suma += stotal;
    });
    setTotal(suma);
  };

  const renderCheckout = function () {
    setRenderCheck(true);
  };

  return (
    <div className={s.table}>
      {renderCheck && <Checkout onClose={setRenderCheck} />}
      <table className={s.title}>
        <caption>Carrito</caption>
        <thead>
          <tr>
            <th>Borrar</th>
            <th className={s.header}>Nombre</th>
            <th className={s.header}>Cantidad</th>
            <th className={s.header}>Precio Unitario</th>
            <th className={s.header}>SubTotal</th>
          </tr>
        </thead>
        <tbody>
          {cart && cart.products.length > 0 ? (
            cart.products.map((producto) => {
              return (
                <tr key={producto.id}>
                  <td>
                    <IconButton
                      aria-label="delete"
                      onClick={() => deleteItem(producto.id)}
                      color="primary"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </td>
                  <td>
                    <Link to={`/product/${producto.id}`}>
                      {replaceChars(producto.name)}
                    </Link>
                  </td>

                  <td className={s.quantity}>
                    <input
                      step="1"
                      max={producto.stock}
                      min="1"
                      type="number"
                      id={producto.id}
                      onChange={quantityChange}
                      value={producto.quantity}
                    />
                  </td>
                  <td>{producto.price}</td>
                  <td>
                    {sumSubTotal(producto.quantity, producto.price).toFixed(2)}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td></td>
              <td></td>
              <td className={s.totalspan} colSpan="2">
                <Alert icon={false} color="default" severity="info">
                  <td className={s.alert}>Tu carrito está vacío</td>
                </Alert>
              </td>
              <td></td>
              <td></td>
            </tr>
          )}
          <tr>
            <td className={s.totalspan} colSpan="2">
              {products.length > 0 && (
                <Button
                  size="small"
                  variant="outlined"
                  color="secondary"
                  onClick={emptyCarrito}
                >
                  Vaciar Carrito
                </Button>
              )}
            </td>
            <td>
              <Link to="/checkout">
                {products.length > 0 && (
                  <Button size="small" variant="outlined" color="primary">
                    COMPRAR
                  </Button>
                )}
              </Link>
            </td>

            <td className={s.totalspan} colSpan="2">
              <span className={s.total}>Total:</span>
              {total.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
